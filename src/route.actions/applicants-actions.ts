'use server';

import dbConnect from '@/lib/dbConfig';
import { Applicant } from '../../models/Applicant';
import bcrypt from 'bcrypt';
import { handleError } from '@/utils/handleError';
import { auth } from '@/auth';
import { applicantTypes } from '@/lib/applicantSchema';
import { revalidatePath } from 'next/cache';
import { Application } from '../../models/Application';
import { Rating } from '../../models/Rating';
import { emailer } from '@/email/sendEmail';

export async function getAllApplicants() {
    await dbConnect();
    const session = await auth();
    const user = session?.user;
    const filter = user?.role === 'applicant' ? { email: user.email } : {};

    try {
        const applicants = await Applicant.find(filter)
            .select('-password')
            .lean()
            .exec();
        if (!applicants?.length) {
            return { success: false, message: 'No applicant found' };
        }

        return JSON.parse(JSON.stringify(applicants));
    } catch (error) {
        handleError(error);
    }
}

export async function getApplicantById(applicantId: string) {
    await dbConnect();

    try {
        const applicant = await Applicant.findById(applicantId).exec();

        if (!applicant) {
            return { success: false, message: 'No applicant found' };
        }

        revalidatePath('/dashboard/recruiter/profile', 'page');
        revalidatePath('/dashboard/applicant/profile', 'page');

        return JSON.parse(JSON.stringify(applicant));
    } catch (error) {
        handleError(error);
    }
}

export async function createApplicant(data: applicantTypes) {
    const { name, email, password, education, skills, resume, profile } = data;
    await dbConnect();

    try {
        if (
            !name ||
            !email ||
            !password ||
            !Array.isArray(education) ||
            !education.length
        ) {
            return { success: false, message: 'All fields are required' };
        }

        const duplicate = await Applicant.findOne({ email }).exec();
        if (duplicate) {
            return { success: false, message: 'Duplicate email' };
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const newApplicant = await Applicant.create({
            name,
            email,
            password: hashedPwd,
            education,
            skills,
            resume,
            profile,
        });
        if (newApplicant) {
            return { success: true, message: `New applicant ${name} created` };
        } else {
            return {
                success: false,
                message: 'Invalid applicant data received',
            };
        }
    } catch (error) {
        handleError(error);
    }
}

export async function updateApplicant(
    applicantId: string,
    data: applicantTypes
) {
    const { name, email, password, education, skills, resume, profile } = data;
    await dbConnect();
    const session = await auth();
    const user = session?.user;

    try {
        if (user?.role !== 'applicant') {
            return {
                success: false,
                message: 'You have no permissions to update this profile',
            };
        }

        if (!name || !email || !Array.isArray(education) || !education.length) {
            return {
                success: false,
                message: 'All fields are required',
            };
        }

        const applicant = await Applicant.findById(applicantId).exec();

        if (!applicant) {
            return {
                success: false,
                message: 'Applicant not found',
            };
        }

        const duplicate = await Applicant.findOne({ email }).exec();
        if (duplicate && duplicate._id.toString() !== applicantId) {
            return {
                success: false,
                message: 'Duplicate email',
            };
        }

        applicant.name = name;
        applicant.email = email;
        applicant.education = education;
        applicant.skills = skills;
        applicant.resume = resume;
        applicant.profile = profile;

        if (password) {
            applicant.password = await bcrypt.hash(password, 10);
        }

        const updatedApplicant = await applicant.save();
        if (updatedApplicant) {
            return {
                success: false,
                message: 'Error when updating',
            };
        }

        return {
            success: true,
            message: `Applicant '${name}' updated`,
        };
    } catch (error) {
        handleError(error);
    }
}

export async function deleteApplicant(applicantId: string) {
    await dbConnect();
    const session = await auth();
    const user = session?.user;

    try {
        if (user?.role !== 'applicant') {
            return {
                success: false,
                message: 'You have no permissions to delete a applicant',
            };
        }
        if (!applicantId) {
            return {
                success: false,
                message: 'Recruiter ID Required',
            };
        }

        // Check any active application
        const acceptedApplications = await Application.countDocuments({
            applicantId,
            status: 'accepted',
        });

        console.log('acceptedApplication for delete', acceptedApplications);

        if (acceptedApplications > 0) {
            return {
                success: false,
                message: `${user.name} you can't delete your account now because your job is still on going.`,
            };
        }

        const applicant = await Applicant.findById(applicantId).exec();
        if (!applicant) {
            return {
                success: false,
                message: 'Recruiter not found',
            };
        }

        const applications = await Application.find({ applicantId })
            .lean()
            .exec();

        const ratings = await Rating.find({
            receiverId: applicantId,
            category: 'applicant',
        })
            .lean()
            .exec();

        const deletedRecruiter = await applicant.deleteOne();

        if (!deletedRecruiter) {
            return {
                success: false,
                message: 'Error when deleting',
            };
        }

        // delete all applicant applications
        const deletedApplications = applications.map(
            async (application) => await application.deleteOne()
        );

        const deletedRatings = ratings.map(
            async (rating) => await rating.deleteOne()
        );

        console.log(
            'Application deleted after applicant deletion',
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
            message: `Applicant '${applicant.name}' deleted`,
        };
    } catch (error) {
        handleError(error);
    }
}
