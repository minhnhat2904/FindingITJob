import nodemailer from 'nodemailer';
import { envVariables } from '../configs';
import { passwordResetTemplate } from '../resources/js/emailResetPassword';

const { usernameEmail, passwordEmail } = envVariables;

let transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: usernameEmail,
		pass: passwordEmail,
	},
	tls: {
		// do not fail on invalid certs
		rejectUnauthorized: false
	},
});

export const sendEmail = async (code, email) => {
	await transporter.sendMail({
		from: usernameEmail,
		to: email,
		subject: 'CODE RESET PASSWORD',
		html: passwordResetTemplate(code),
	});
};