import dbConnect from '@/lib/dbConfig';
import { Applicant } from '../../models/Applicant';
import bcrypt from 'bcrypt';
import { handleError } from '@/utils/handleError';
import { auth } from '@/auth';
import { applicantTypes } from '@/lib/applicantSchema';
import { revalidatePath } from 'next/cache';

export async function getAllApplicants() {
    await dbConnect();
    const session = await auth();
    const user = session?.user;
    let filter = {};

    try {
        if (user?.role === 'applicant') {
            filter = { email: user.email };
        }

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
        if (user?.role !== 'admin') {
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

        const applicant = await Applicant.findById(applicantId).exec();
        if (!applicant) {
            return {
                success: false,
                message: 'Recruiter not found',
            };
        }

        const deletedRecruiter = await applicant.deleteOne();

        if (!deletedRecruiter) {
            return {
                success: false,
                message: 'Error when deleting',
            };
        }

        return {
            success: true,
            message: `Recruiter '${applicant.name}' deleted`,
        };
    } catch (error) {
        handleError(error);
    }
}
