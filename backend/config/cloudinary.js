import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
    const cloud_name = (process.env.CLOUDINARY_NAME || 'dnqdmscpl').trim().replace(/^['"]|['"]$/g, '');
    const api_key = (process.env.CLOUDINARY_API_KEY || '946353223162467').trim().replace(/^['"]|['"]$/g, '');
    const api_secret = (process.env.CLOUDINARY_SECRET_KEY || 'FnBeynUGhLZQWrD-Vil1hSnXL6Y').trim().replace(/^['"]|['"]$/g, '');

    cloudinary.config({
        cloud_name,
        api_key,
        api_secret
    });
}

export default connectCloudinary;