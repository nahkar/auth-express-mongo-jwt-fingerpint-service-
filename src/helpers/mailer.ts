import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const getTransport = () => {
	return nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT),
		secure: false,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		},
	});
};

export const sendActivationCodeByEmail = async (to: string, code: string) => {
	const transport = getTransport();
	const link = `${process.env.API_URL ?? ''}/api/v1/auth/activate/${code}`

	await transport.sendMail({
		to,
		from: process.env.SMTP_USER?.toString(),
		subject: 'Activate your account',
		text: '',
		html: `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8">
				<title>Activate your account</title>
				<style>
					/* Global styles */
					body {
						background-color: #F2F2F2;
						font-family: Arial, sans-serif;
						font-size: 14px;
						line-height: 1.5;
						color: #333333;
						margin: 0;
						padding: 0;
					}
					
					/* Container */
					.container {
						max-width: 600px;
						margin: 0 auto;
						padding: 20px;
						background-color: #FFFFFF;
						border-radius: 10px;
						box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
					}
					
					/* Heading */
					h1 {
						font-size: 24px;
						margin: 0;
						padding: 0;
						color: #333333;
					}
					
					/* Button */
					.button {
						display: inline-block;
						padding: 10px 20px;
						background-color: #1E90FF;
						color: #FFFFFF;
						text-decoration: none;
						border-radius: 5px;
						font-size: 16px;
					}
					.button:hover {
						background-color: #0047AB;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<h1>Activate your account</h1>
					<p>Dear frined,</p>
					<p>Thank you for registering with [Your App Name]! Before you can start using our service, you need to activate your account. Please click the button below to complete the activation process:</p>
					<p><a href="${link}" class="button">Activate my account</a></p>
					<p>If you did not register with [Your App Name], or if you received this email in error, please disregard this message.</p>
					<p>Thank you for choosing [Your App Name]!</p>
					<p>Best regards,<br>[Your Name]<br>[Your App Name] Team</p>
				</div>
			</body>
		</html>
		`,
	});
};
