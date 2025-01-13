import {mongoose} from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb Connected:${conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;