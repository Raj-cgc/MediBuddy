import mongoose from 'mongoose';

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("Database Connected Successfully"));
    
    const uri = process.env.MONGODB_URI ? `${process.env.MONGODB_URI}/medibuddy` : 'mongodb://127.0.0.1:27017/medibuddy';
    
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.error("Failed to connect to primary MongoDB URI:", error.message);
        console.log("Attempting fallback to local MongoDB...");
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/medibuddy');
        } catch (fallbackError) {
            console.error("Local MongoDB connection also failed:", fallbackError.message);
        }
    }
}

export default connectDB;