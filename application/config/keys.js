const secret =require('../helpers/secret')

module.exports = {
	googleClientID: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	mysql_host : secret.get(process.env.MYSQL_HOST),
	mysql_port : secret.get(process.env.MYSQL_PORT),
	mysql_user : secret.get(process.env.MYSQL_USER),
	mysql_password : secret.get(process.env.MYSQL_PASSWORD),
	mysql_database : secret.get(process.env.MYSQL_DB),
	token_secret: process.env.TOKEN_SECRET
}
