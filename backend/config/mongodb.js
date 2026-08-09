import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', false);
    
    if (isConnected || mongoose.connection.readyState >= 1) {
        isConnected = true;
        return;
    }

    // Check process.env keys in case of trailing spaces or case differences
    const envUri = process.env.MONGODB_URI || process.env['MONGODB_URI '] || process.env.MONGO_URI;

    if (!envUri) {
        console.warn("MONGODB_URI environment variable is missing on Vercel!");
    }

    let uri = envUri || 'mongodb://127.0.0.1:27017/medibuddy';
    uri = uri.trim().replace(/^['"]|['"]$/g, '');

    try {
        const db = await mongoose.connect(uri, {
            dbName: 'medibuddy',
            serverSelectionTimeoutMS: 5000
        });

        isConnected = db.connections[0].readyState >= 1;
        console.log("Database Connected Successfully to Atlas");
    } catch (error) {
        console.error("Failed to connect to MongoDB Atlas:", error.message);
        if (process.env.NODE_ENV !== 'production') {
            try {
                await mongoose.connect('mongodb://127.0.0.1:27017/medibuddy');
                isConnected = true;
            } catch (fallbackErr) {
                console.error("Local fallback failed:", fallbackErr.message);
            }
        }
    }
}

export default connectDB;