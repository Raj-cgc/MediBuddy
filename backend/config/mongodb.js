import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', false);
    
    if (isConnected || mongoose.connection.readyState >= 1) {
        isConnected = true;
        return;
    }

    const fallbackAtlasUri = 'mongodb+srv://rajkumarbxr78_db_user:2hQIme7F7veEgwvh@cluster0.5malcff.mongodb.net/?appName=Cluster0';
    let envUri = process.env.MONGODB_URI || process.env['MONGODB_URI '] || process.env.MONGO_URI || fallbackAtlasUri;

    // Clean up URI string completely (remove quotes and spaces)
    let uri = String(envUri).trim().replace(/^['"]|['"]$/g, '');

    // If for any reason uri doesn't start with mongodb, use fallback Atlas URI
    if (!uri.startsWith('mongodb')) {
        uri = fallbackAtlasUri;
    }

    try {
        const db = await mongoose.connect(uri, {
            dbName: 'medibuddy',
            serverSelectionTimeoutMS: 10000
        });

        isConnected = db.connections[0].readyState >= 1;
        console.log("Database Connected Successfully to Atlas");
    } catch (error) {
        console.error("Failed to connect to MongoDB Atlas with primary URI:", error.message);
        try {
            const db = await mongoose.connect(fallbackAtlasUri, {
                dbName: 'medibuddy',
                serverSelectionTimeoutMS: 10000
            });
            isConnected = db.connections[0].readyState >= 1;
            console.log("Database Connected via fallback Atlas URI");
        } catch (fallbackErr) {
            console.error("Fallback connection failed:", fallbackErr.message);
        }
    }
}

export default connectDB;