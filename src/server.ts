import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { connectToDatabase } from 'services/db';
import { router } from './routes';

dotenv.config();

const PORT = process.env.PORT || 3060;

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Please  use /api/v1/ route');
});

app.use('/api/v1', router);

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
