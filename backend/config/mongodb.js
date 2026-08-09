import mongoose from 'mongoose';

const atlasUri = 'mongodb+srv://rajkumarbxr78_db_user:2hQIme7F7veEgwvh@cluster0.5malcff.mongodb.net/medibuddy?retryWrites=true&w=majority';

let connPromise = null;

const connectDB = async () => {
    mongoose.set('strictQuery', false);

    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    if (!connPromise) {
        let uri = atlasUri;
        if (process.env.MONGODB_URI) {
            let envUri = process.env.MONGODB_URI.trim().replace(/^['"]|['"]$/g, '');
            if (envUri.includes('5malcff')) {
                uri = envUri;
            }
        }

        connPromise = mongoose.connect(uri, {
            dbName: 'medibuddy'
        });
    }

    return await connPromise;
}

export default connectDB;