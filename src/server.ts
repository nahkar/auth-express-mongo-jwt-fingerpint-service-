import express from 'express';
import dotenv from 'dotenv';

import { connectToDatabase } from 'services/db';
import { router } from './routes';
import { apiErrorMiddleware } from '@middlewares/error.middleware';

dotenv.config();

const PORT = process.env.PORT || 3060;

const app = express();
app.use(express.json());

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
