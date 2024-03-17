import { Schema, model, models } from 'mongoose';

const ratingSchema = new Schema(
    {
        category: {
            type: String,
            required: true,
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        senderId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        recruiterId: {
            type: Schema.Types.ObjectId,
        },
        ratings: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

ratingSchema.index(
    { category: 1, receiverId: 1, senderId: 1, recruiterId: 1 },
    { unique: true }
);

export const Rating = models?.Rating || model('Rating', ratingSchema);
