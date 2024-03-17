import dbConnect from '@/lib/dbConfig';
import { Applicant } from '../../../../../models/Applicant';
import { NextResponse } from 'next/server';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    const id = params.id;
    try {
        if (!id) {
            return NextResponse.json({
                success: false,
                status: 400,
                statusText: 'Applicant ID Required',
            });
        }

        const applicant = await Applicant.findById(id).exec();
        if (!applicant) {
            return NextResponse.json({
                success: false,
                status: 400,
                statusText: 'Applicant not found',
            });
        }

        const deletedApplicant = await applicant.deleteOne();

        if (!deletedApplicant) {
            return NextResponse.json({
                success: false,
                status: 400,
                statusText: 'Error when deleting',
            });
        }

        return NextResponse.json({
            success: true,
            statusText: `Applicant '${applicant.name}' deleted`,
        });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
