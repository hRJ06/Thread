import mongoose from 'mongoose';
let isConnected = false;

export const connectToDB = async () => {
    if(!process.env.MONGODB_URL) return console.log('MONGODB_URL is required');
    if(isConnected) return console.log('Already connected');
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        isConnected = true;
    }
    catch(e) {
        console.log('Error');
    }
}