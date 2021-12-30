const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Router } = require('express')
const User = require('../../models/user.js')
const { jwtKey } = require('../../config')
const router = Router()

router.get('/exists/:username', async (req, res) => {
	try {
		const { username } = req.params
		const existingUser = await User.findOne({username: username()})
		if(existingUser) return res.status(200).json({exists: true})
		return res.status(200).json({exists: false})
	}catch(err) {
		return res.status(500).json({message: err.message})
	}
})

router.post('/register', async (req, res) => {
	try {
		const { username, password } = req.body
		if(!(username && password)) return res.status(400).json({message: 'All inputs are required to register (username and password)'})
		const existingUser = await User.findOne({username: username})
		if(existingUser) return res.status(409).json({message: 'User with that username already exists'})
		const hashedPass = await bcrypt.hash(password, 10)
		const user = new User({
			username: username,
			password: hashedPass
		})
		await user.save()
		const token = jwt.sign({
			username: username,
			id: user._id
		}, jwtKey)
		res.status(201).json({message: 'User created', token: token})
	}catch(err) {
		return res.status(500).json({message: err.message})
	}
})

module.exports = router