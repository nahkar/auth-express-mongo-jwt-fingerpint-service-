import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { apiErrorMiddleware } from '@middlewares/error.middleware';
import { connectToDatabase } from '@services/db';
import { router } from '@routes/v1';

dotenv.config();

const PORT = process.env.PORT || 3060;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
	res.json({ message: 'Auth API, please go to /api/v1/auth' });
});

app.use('/api/v1', router);

app.use(apiErrorMiddleware);

const main = () => {
	app.listen(PORT, async () => {
		try {
			await connectToDatabase();
		} catch (error) {
			console.log(error);
		}
		console.log(`Server started on port ${PORT}`);
	});
};

main();
