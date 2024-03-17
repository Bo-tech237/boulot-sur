import dbConnect from '@/lib/dbConfig';
import { Recruiter } from '../../../../../models/Recruiter';
import { NextResponse } from 'next/server';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    await dbConnect();

    const id = params.id;
    try {
        if (!id) {
            return NextResponse.json('Recruiter ID Required', { status: 400 });
        }

        const recruiter = await Recruiter.findById(id).exec();
        if (!recruiter) {
            return NextResponse.json('Recruiter not found', { status: 400 });
        }

        const deletedRecruiter = await recruiter.deleteOne();

        if (!deletedRecruiter) {
            return NextResponse.json('Error when deleting', { status: 400 });
        }

        const reply = `Recruiter '${recruiter.username}' with ID ${recruiter._id} deleted`;

        return NextResponse.json({ reply });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
