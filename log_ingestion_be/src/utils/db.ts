import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ahmadabdulrahman6:JgBLeDYQo2AYAgtg@expense.snmjfj1.mongodb.net/logdb?retryWrites=true&w=majority&appName=expense');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;