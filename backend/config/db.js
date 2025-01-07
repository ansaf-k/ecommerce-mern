import {mongoose} from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://ansaf23742:12345@cluster0.uy17h.mongodb.net/data");
        console.log(`Mongodb Connected:${conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;