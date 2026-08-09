import mongoose from 'mongoose';

const directAtlasUri = 'mongodb://rajkumarbxr78_db_user:2hQIme7F7veEgwvh@ac-t6bpdxc-shard-00-00.5malcff.mongodb.net:27017,ac-t6bpdxc-shard-00-01.5malcff.mongodb.net:27017,ac-t6bpdxc-shard-00-02.5malcff.mongodb.net:27017/medibuddy?ssl=true&authSource=admin&retryWrites=true&w=majority';

let connPromise = null;

const connectDB = async () => {
    mongoose.set('strictQuery', false);

    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    if (!connPromise) {
        let uri = process.env.MONGODB_URI;
        if (uri) {
            uri = uri.trim().replace(/^['"]|['"]$/g, '');
        }
        if (!uri || !uri.startsWith('mongodb')) {
            uri = directAtlasUri;
        }

        connPromise = mongoose.connect(uri, {
            dbName: 'medibuddy'
        });
    }

    return await connPromise;
}

export default connectDB;