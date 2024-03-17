import mongoose from 'mongoose';

export default async function dbConnect() {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB error:', error);
    }
}
