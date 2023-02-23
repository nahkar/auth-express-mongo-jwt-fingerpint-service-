import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

export const initAWS = () => {
	AWS.config.update({
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.AWS_REGION,
	});
};

export const getSNSService = () => {
	return new AWS.SNS({ region: process.env.AWS_REGION });
};

export const sendActivationCodeBySMS = async ({ code, phone }: { code: string; phone: string }) => {
	try {
		const result = await getSNSService()
			.publish({
				Message: `Your activation ${code}`,
				PhoneNumber: phone,
			})
			.promise();
		return result;
	} catch (err) {
		console.error(err);
	}
};
