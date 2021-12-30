const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})

const Manga = model('manga', UserSchema)
module.exports = Manga