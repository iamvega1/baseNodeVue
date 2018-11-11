'use strict';

const nodemailer = require('nodemailer'),
	secret = require('./secret')
let	conf = {
		host : 'smtp.gmail.com',
		port : 465,
		user : '',
		from : '',
		pass : '',
		url : '',
		subject : 'Restauración del password'
	}

class SendMail {

	constructor (){
		conf.user = secret.get(process.env.SMTP_USERNAME)
		conf.pass = secret.get(process.env.SMTP_PASSWORD)
		conf.from = process.env.SMTP_FROM
		conf.url = process.env.BASE_URL
	}

	restpassword (user) {
		nodemailer.createTestAccount((err, account) => {

			let transporter = nodemailer.createTransport({
				host: conf.host,
				port: conf.port,
				secure: true,
				auth: {
				    user: conf.user, 
				    pass: conf.pass
				}
			});

			let currentDate = new Date()

			let mailOptions = {
				from: `"${conf.from}" <${conf.user}>`,
				to: user.mail, // list of receivers
				subject: `${conf.subject}`,
				html: `<h3>Se solicito un nuevo password en la Plataforma de Edulink</h3>
					<b>Este password es valido hasta: ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate() + 1} ${currentDate.getHours()}:${currentDate.getMinutes()} min</b>
					<p>De click en el siguiente enlace para continuar con la restauracion de password.</p>
					<a href="${conf.url}/resetPassword/key/${user.keypass}">Restaurar Password</a> 
				`
			};

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
				    return console.log(error);
				}
				console.log('Message sent: %s', info.messageId);
				console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
			});
		});
	}
}

module.exports = new SendMail();