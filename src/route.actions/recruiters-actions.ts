'use server';

import dbConnect from '@/lib/dbConfig';
import { Recruiter } from '../../models/Recruiter';
import bcrypt from 'bcrypt';
import { recruiterTypes } from '@/lib/recruiterSchema';
import { handleError } from '@/utils/handleError';
import { auth, signOut } from '@/auth';
import { revalidatePath } from 'next/cache';
import { Job } from '../../models/Job';
import { Application } from '../../models/Application';
import { Rating } from '../../models/Rating';
import { emailer } from '@/email/sendEmail';

export async function getAllRecruiters() {
    await dbConnect();
    const session = await auth();
    const user = session?.user;
    const filter = user?.role === 'recruiter' ? { email: user.email } : {};

    try {
        const recruiters = await Recruiter.find(filter)
            .select('-password')
            .lean()
            .exec();
        if (!recruiters?.length) {
            return { success: false, message: 'No recruiters found' };
        }

        return JSON.parse(JSON.stringify(recruiters));
    } catch (error) {
        handleError(error);
    }
}

export async function getRecruiterById(recruiterId: string) {
    await dbConnect();

    try {
        const recruiter = await Recruiter.findById(recruiterId).exec();

        if (!recruiter) {
            return { success: false, message: 'No recruiter found' };
        }

        revalidatePath('/dashboard/recruiter/profile', 'page');
        revalidatePath('/dashboard/applicant/profile', 'page');

        return JSON.parse(JSON.stringify(recruiter));
    } catch (error) {
        handleError(error);
    }
}

export async function createRecruiter(data: any) {
    const { name, email, password, phone, country, city, description, postal } =
        data;

    await dbConnect();

    try {
        if (
            !name ||
            !email ||
            !password ||
            !phone ||
            !country ||
            !city ||
            !description
        ) {
            return { success: false, message: 'All fields are required' };
        }

        const duplicate = await Recruiter.findOne({ email }).exec();
        if (duplicate) {
            return { success: false, message: 'Duplicate email' };
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const newRecruiter = await Recruiter.create({
            name,
            email,
            password: hashedPwd,
            phone,
            country,
            city,
            description,
            postal,
        });
        if (newRecruiter) {
            emailer.notifyUserForSignup(email, name);

            revalidatePath('/dashboard/recruiter/profile', 'page');
            return { success: true, message: `New recruiter ${name} created` };
        } else {
            return {
                success: false,
                message: 'Invalid recruiter data received',
            };
        }
    } catch (error) {
        handleError(error);
    }
}

export async function updateRecruiter(recruiterId: string, data: any) {
    const session = await auth();
    const user = session?.user;
    await dbConnect();

    const { name, email, password, phone, country, city, description, postal } =
        data;

    try {
        if (user?.role !== 'recruiter') {
            return {
                success: false,
                message: 'You have no permissions to update this profile',
            };
        }

        if (!name || !phone || !country || !city || !description) {
            return { success: false, message: 'All fields are required' };
        }

        const recruiter = await Recruiter.findById(recruiterId).exec();

        if (!recruiter) {
            return { success: false, message: 'No recruiter found' };
        }

        const duplicate = await Recruiter.findOne({ email }).exec();
        if (duplicate && duplicate._id.toString() !== recruiterId) {
            return { success: false, message: 'Duplicate email' };
        }

        recruiter.name = name;
        recruiter.phone = phone;
        recruiter.country = country;
        recruiter.postal = postal;

        if (password) {
            recruiter.password = await bcrypt.hash(password, 10);
        }

        const updatedRecruiter = await recruiter.save();
        if (!updatedRecruiter) {
            return {
                success: false,
                message: 'Error when updating',
            };
        }

        revalidatePath('/dashboard/recruiter/profile', 'page');

        return {
            success: true,
            message: `Recruiter ${name} updated successfully`,
        };
    } catch (error) {
        handleError(error);
    }
}

export async function deleteRecruiter(recruiterId: string) {
    await dbConnect();
    const session = await auth();
    const user = session?.user;

    try {
        if (user?.role !== 'recruiter') {
            return {
                success: false,
                message: 'You have no permissions to delete a recruiter',
            };
        }
        if (!recruiterId) {
            return {
                success: false,
                message: 'Recruiter ID Required',
            };
        }

        const acceptedApplications = await Application.countDocuments({
            recruiterId,
            status: 'accepted',
        });

        console.log('acceptedApplication for delete', acceptedApplications);

        if (acceptedApplications > 0) {
            return {
                success: false,
                message: `${user.name} you can't delete your account now because jobs are still on going.`,
            };
        }

        const recruiter = await Recruiter.findById(recruiterId).exec();
        if (!recruiter) {
            return {
                success: false,
                message: 'Recruiter not found',
            };
        }

        const myJobs = await Job.find({ recruiterId }).lean().exec();

        const applications = await Application.find({ recruiterId })
            .lean()
            .exec();

        const ratings = await Rating.find({ recruiterId, category: 'job' })
            .lean()
            .exec();

        const deletedRecruiter = await recruiter.deleteOne();

        if (!deletedRecruiter) {
            return {
                success: false,
                message: 'Error when deleting',
            };
        }

        await signOut({ redirectTo: '/register' });

        const deletedJobs = myJobs.map(
            async (myJob) => await myJob.deleteOne()
        );

        const deletedApplications = applications.map(
            async (application) => await application.deleteOne()
        );

        const deletedRatings = ratings.map(
            async (rating) => await rating.deleteOne()
        );

        console.log('Job deleted after recruiter deletion', deletedJobs);

        console.log(
            'Applications deleted after recruiter deletion',
            deletedApplications
        );

        console.log('Ratings deleted after recruiter deletion', deletedRatings);

        emailer.notifyUserForDeletedAccount(user?.email, user?.name);

        revalidatePath('/jobs');
        revalidatePath('/dashboard/recruiter/jobs', 'page');
        revalidatePath('/dashboard/recruiter/applications', 'page');
        revalidatePath('/dashboard/applicant/applications', 'page');

        return {
            success: true,
            message: `Recruiter '${recruiter.name}' deleted successfully`,
        };
    } catch (error) {
        handleError(error);
    }
}
