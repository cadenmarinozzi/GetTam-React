const nodemailer = require('nodemailer');

function sendEmail({ toEmail, subject, body }) {
	const mailOptions = {
		from: process.env.MAILER_EMAIL,
		to: toEmail,
		subject: 'GetTam Legacy Request',
		text: `Legacy Request successfully submitted! Once we have reviewed your request we will send you an email with your credentials.`,
	};
	console.log(process.env.MAILER_EMAIL, process.env.MAILER_PASSWORD);
	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.MAILER_EMAIL,
			pass: process.env.MAILER_PASSWORD,
		},
	});

	let success = true;

	transport.sendMail(mailOptions, (error, info) => {
		console.log(error);
		if (!error) return;

		success = false;
	});

	return success;
}

module.exports = sendEmail;
