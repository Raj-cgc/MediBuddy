import mongoose from 'mongoose';
import dns from 'dns';

let isConnected = false;

// Force IPv4 first for reliable DNS lookups on serverless containers
try {
    if (dns.setDefaultResultOrder) {
        dns.setDefaultResultOrder('ipv4first');
    }
} catch (e) {}

// Disable Mongoose command buffering globally so queries never hang for 10s
mongoose.set('strictQuery', false);
mongoose.set('bufferCommands', false);

const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState >= 1) {
        isConnected = true;
        return;
    }

    const directAtlasUri = 'mongodb://rajkumarbxr78_db_user:2hQIme7F7veEgwvh@ac-t6bpdxc-shard-00-00.5malcff.mongodb.net:27017,ac-t6bpdxc-shard-00-01.5malcff.mongodb.net:27017,ac-t6bpdxc-shard-00-02.5malcff.mongodb.net:27017/medibuddy?ssl=true&authSource=admin&retryWrites=true&w=majority';
    
    let envUri = process.env.MONGODB_URI || process.env['MONGODB_URI '] || process.env.MONGO_URI || directAtlasUri;
    let uri = String(envUri).trim().replace(/^['"]|['"]$/g, '');

    if (!uri.startsWith('mongodb')) {
        uri = directAtlasUri;
    }

    try {
        const db = await mongoose.connect(uri, {
            dbName: 'medibuddy',
            serverSelectionTimeoutMS: 5000,
            bufferCommands: false
        });

        isConnected = db.connections[0].readyState >= 1;
        console.log("Database Connected Successfully to Atlas");
    } catch (error) {
        console.error("Primary URI connection failed, switching to direct ReplicaSet URI:", error.message);
        try {
            const db = await mongoose.connect(directAtlasUri, {
                dbName: 'medibuddy',
                serverSelectionTimeoutMS: 5000,
                bufferCommands: false
            });
            isConnected = db.connections[0].readyState >= 1;
            console.log("Database Connected via Direct ReplicaSet URI");
        } catch (fallbackErr) {
            console.error("Direct Atlas connection failed:", fallbackErr.message);
        }
    }
}

export default connectDB;