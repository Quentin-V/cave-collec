const jwtKey = 'key'
const mongoUser = 'username'
const mongoPassword = 'password'
module.exports = {
	mongoUri: `mongodb+srv://${mongoUser}:${encodeURIComponent(mongoPassword)}@database`,
	HTTP_PORT: 3000,
	HTTPS_PORT: 3443
}