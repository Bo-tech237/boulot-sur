import dbConnect from '@/lib/dbConfig';
import { Rating } from '../../../../../models/Rating';
import { NextRequest, NextResponse } from 'next/server';
import getSession from '@/lib/getSession';

// @desc Delete a rating
// @route DELETE /ratings
// @access Private
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    const session = await getSession();
    const user = session?.user;
    const id = params.id;

    try {
        console.log('rating user:', user);
        if (user?.role !== 'recruiter') {
            return NextResponse.json(
                'You have no permissions to delete ratings',
                {
                    status: 401,
                }
            );
        }

        if (!id) {
            return NextResponse.json('Rating ID Required', {
                status: 400,
            });
        }

        const rating = await Rating.findById(id).exec();
        if (!rating) {
            return NextResponse.json('Rating not found', { status: 400 });
        }

        const deletedJob = await rating.deleteOne();

        if (!deletedJob) {
            return NextResponse.json('Error when deleting', { status: 400 });
        }

        const reply = `Rating '${rating.title}' with ID ${rating._id} deleted`;

        return NextResponse.json({ reply });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

// @desc Get a rating
// @route GET /ratings
// @access Private
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    const id = params.id;

    try {
        if (!id) {
            return NextResponse.json('Rating ID Required', {
                status: 400,
            });
        }

        const rating = await Rating.findById(id).lean().exec();
        if (!rating) {
            return NextResponse.json('Rating not found', { status: 400 });
        }
        return NextResponse.json({ rating });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
