import mongoose from 'mongoose';

let connPromise = null;

const connectDB = async () => {
    mongoose.set('strictQuery', false);

    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    if (!connPromise) {
        let uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/medibuddy';
        uri = String(uri).trim().replace(/^['"]|['"]$/g, '');

        connPromise = mongoose.connect(uri, {
            dbName: 'medibuddy'
        });
    }

    return await connPromise;
}

export default connectDB;