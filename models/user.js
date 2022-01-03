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
	},
	invalidTokenDate: {
		type: Date,
		default: '2000-01-01',
		required: true
	}
})

const Manga = model('manga', UserSchema)
module.exports = Manga