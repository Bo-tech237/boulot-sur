import dbConnect from '@/lib/dbConfig';
import { Recruiter } from '../../../../models/Recruiter';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { recruiterTypes } from '@/lib/recruiterSchema';
import { recruiterType } from '@/lib/userSchema';
import { revalidatePath } from 'next/cache';

export async function GET() {
    await dbConnect();

    try {
        const recruiters = await Recruiter.find().select('-password').lean();
        if (!recruiters?.length) {
            return NextResponse.json({
                success: false,
                status: 401,
                statusText: 'No recruiters found',
            });
        }

        return NextResponse.json({ recruiters });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function POST(request: Request) {
    const {
        name,
        email,
        password,
        phone,
        country,
        city,
        description,
        postal,
    }: recruiterTypes = await request.json();
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
            return NextResponse.json({
                success: false,
                status: 400,
                statusText: 'All fields are required',
            });
        }

        const duplicate = await Recruiter.findOne({ email }).exec();
        if (duplicate) {
            return NextResponse.json({
                success: false,
                status: 409,
                statusText: 'Duplicate email',
            });
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
            revalidatePath('/dashboard/recruiter/profile', 'page');
            return NextResponse.json({
                success: true,
                status: 201,
                statusText: `New recruiter ${name} created successfully`,
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
    const {
        id,
        name,
        email,
        password,
        phone,
        country,
        city,
        description,
        postal,
    }: recruiterType = await request.json();
    await dbConnect();
    console.log('testnow', id, name);

    try {
        if (
            !id ||
            !name ||
            !email ||
            !phone ||
            !country ||
            !city ||
            !description
        ) {
            return NextResponse.json({
                success: false,
                status: 400,
                statusText: 'All fields are required',
            });
        }

        const recruiter = await Recruiter.findById(id).exec();

        if (!recruiter) {
            return NextResponse.json({
                success: false,
                status: 401,
                statusText: 'Recruiter not found',
            });
        }

        const duplicate = await Recruiter.findOne({ email }).exec();
        if (duplicate && duplicate._id.toString() !== id) {
            return NextResponse.json({
                success: false,
                status: 409,
                statusText: 'Duplicate email',
            });
        }

        recruiter.name = name;
        recruiter.phone = phone;
        recruiter.country = country;
        recruiter.city = city;
        recruiter.postal = postal;
        recruiter.description = description;

        if (password) {
            recruiter.password = await bcrypt.hash(password, 10);
        }

        const updatedRecruiter = await recruiter.save();

        if (!updatedRecruiter) {
            return NextResponse.json({
                success: false,
                status: 400,
                statusText: 'Invalid recruiter data received',
            });
        }

        revalidatePath('/dashboard/recruiter/profile', 'page');
        return NextResponse.json({
            success: true,
            status: 200,
            statusText: `Recruiter ${updatedRecruiter?.name} updated successfully.`,
        });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
