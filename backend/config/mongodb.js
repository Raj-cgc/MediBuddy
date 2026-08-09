import mongoose from 'mongoose';

const directAtlasUri = 'mongodb://rajkumarbxr78_db_user:2hQIme7F7veEgwvh@ac-t6bpdxc-shard-00-00.5malcff.mongodb.net:27017,ac-t6bpdxc-shard-00-01.5malcff.mongodb.net:27017,ac-t6bpdxc-shard-00-02.5malcff.mongodb.net:27017/medibuddy?ssl=true&authSource=admin&retryWrites=true&w=majority';

let connPromise = null;

const connectDB = async () => {
    mongoose.set('strictQuery', false);

    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    if (!connPromise) {
        let envUri = process.env.MONGODB_URI || process.env['MONGODB_URI '] || process.env.MONGO_URI || directAtlasUri;
        let uri = String(envUri).trim().replace(/^['"]|['"]$/g, '');

        if (!uri.startsWith('mongodb')) {
            uri = directAtlasUri;
        }

        connPromise = mongoose.connect(uri, {
            dbName: 'medibuddy',
            serverSelectionTimeoutMS: 10000
        }).catch(err => {
            console.error("Primary URI connection failed, connecting via direct ReplicaSet URI:", err.message);
            connPromise = null;
            return mongoose.connect(directAtlasUri, {
                dbName: 'medibuddy',
                serverSelectionTimeoutMS: 10000
            });
        });
    }

    return await connPromise;
}

export default connectDB;