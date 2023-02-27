import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiErrorMiddleware } from '@middlewares/error.middleware';
import { connectToDatabase } from '@helpers/db';
import { router } from '@routes/v1';
import { SERVER_PORT } from '@config/constants';
import { initAWS } from '@helpers/aws';

dotenv.config();

const PORT:number = Number(process.env.PORT ) || SERVER_PORT;

const app = express();

app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
	res.json({ message: 'Auth API, please go to /api/v1/auth' });
});

app.use('/api/v1', router);

app.use(apiErrorMiddleware);

const main = () => {
	app.listen(
		PORT,
		void (async () => {
			try {
				initAWS();
				await connectToDatabase();
			} catch (error) {
				console.log(error);
			}
			console.log(`Server started on port ${PORT}`);
		})()
	);
};

main();
