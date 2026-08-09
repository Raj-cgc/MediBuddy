import mongoose from 'mongoose';

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("Database Connected Successfully"));

    let rawUri = process.env.MONGODB_URI;
    let uri = 'mongodb://127.0.0.1:27017/medibuddy';

    if (rawUri) {
        if (rawUri.includes('/medibuddy')) {
            uri = rawUri;
        } else if (rawUri.includes('?')) {
            uri = rawUri.replace('?', 'medibuddy?');
        } else {
            uri = rawUri.endsWith('/') ? `${rawUri}medibuddy` : `${rawUri}/medibuddy`;
        }
    }

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