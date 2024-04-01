import dbConnect from '@/lib/dbConfig';
import { Applicant } from '../../../../models/Applicant';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { emailer } from '@/email/sendEmail';

export async function GET() {
    await dbConnect();

    try {
        const applicants = await Applicant.find().select('-password').lean();
        if (!applicants?.length) {
            return NextResponse.json({
                success: false,
                status: 400,
                statusText: 'No applicants found',
            });
        }

        return NextResponse.json({ applicants });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function POST(request: Request) {
    const { name, email, password, education, skills, resume, profile } =
        await request.json();
    await dbConnect();

    try {
        if (!name || !email || !password || !education) {
            return NextResponse.json({
                success: false,
                status: 400,
                statusText: 'All fields are required',
            });
        }

        const duplicate = await Applicant.findOne({ email }).exec();
        if (duplicate) {
            return NextResponse.json({
                success: false,
                status: 409,
                statusText: 'Duplicate email',
            });
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
            emailer.notifyUserForSignup(email, name);

            revalidatePath('/dashboard/applicant/profile', 'page');

            return NextResponse.json({
                success: true,
                status: 201,
                statusText: `New applicant ${name} created successfully`,
            });
        } else {
            return NextResponse.json({
                success: false,
                status: 400,
                statusText: 'Invalid recruiter data received',
            });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const { id, name, email, password, education, skills, resume, profile } =
        await request.json();
    await dbConnect();

    try {
        if (!id || !name || !email) {
            return NextResponse.json({
                success: false,
                status: 400,
                statusText: 'All fields are required',
            });
        }

        const applicant = await Applicant.findById(id).exec();

        if (!applicant) {
            return NextResponse.json({
                success: false,
                status: 400,
                statusText: 'Recruiter not found',
            });
        }

        const duplicate = await Applicant.findOne({ email }).exec();
        if (duplicate && duplicate._id.toString() !== id) {
            return NextResponse.json({
                success: false,
                status: 409,
                statusText: 'Duplicate email',
            });
        }
        console.log('not-good1', applicant);

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
        console.log('not-good', updatedApplicant, applicant);
        if (!updatedApplicant) {
            return NextResponse.json({
                success: false,
                status: 400,
                statusText: 'Invalid applicant data received',
            });
        }

        revalidatePath('/dashboard/applicant/profile', 'page');
        return NextResponse.json({
            success: true,
            status: 200,
            statusText: `Applicant ${updatedApplicant?.name} updated successfully.`,
        });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
