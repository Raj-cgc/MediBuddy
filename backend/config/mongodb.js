import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', false);
    
    if (isConnected || mongoose.connection.readyState >= 1) {
        isConnected = true;
        return;
    }

    try {
        const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/medibuddy';
        
        const db = await mongoose.connect(uri, {
            dbName: 'medibuddy'
        });

        isConnected = db.connections[0].readyState >= 1;
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB Atlas:", error.message);
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/medibuddy');
            isConnected = true;
        } catch (fallbackErr) {
            console.error("Fallback failed:", fallbackErr.message);
        }
    }
}

export default connectDB;