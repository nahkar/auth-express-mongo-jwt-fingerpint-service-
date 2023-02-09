import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectToDatabase = async () => {
	try {
		mongoose.set('strictQuery', true);

		await mongoose.connect(process.env.MONGODB_URI || '');

		console.log('Connected to MongoDB');
	} catch (error) {
		console.log(error);
	}
};
