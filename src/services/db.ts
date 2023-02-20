import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectToDatabase = async () => {
	mongoose.set('strictQuery', false);
	await mongoose
		.connect(process.env.MONGODB_URI || '')
		.then(() => {
			console.log('Connected to MongoDB');
		})
		.catch((err) => console.log(err));
};
