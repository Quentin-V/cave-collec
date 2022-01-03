const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Router } = require('express')
const User = require('../../models/user.js')
const { jwtKey } = require('../../config')
const router = Router()

router.get('/exists/:username', async (req, res) => {
	try {
		const { username } = req.params
		const existingUser = await User.findOne({username: username})
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
			userid: user._id,
			date: new Date()
		}, jwtKey)
		res.status(201).json({message: 'User created', token: token, username: username})
	}catch(err) {
		return res.status(500).json({message: err.message})
	}
})

router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body
		const user = await User.findOne({username: username})
		if(!user) return res.status(404).json({message: 'User not found'})
		const storedHash = user.password
		const goodPassword = await bcrypt.compare(password, storedHash)
		if(!goodPassword) return res.status(401).json({message: 'Wrong password'})
		const token = jwt.sign({
			username: username,
			userid: user._id,
			date: new Date()
		}, jwtKey)
		return res.status(200).json({message: 'Successfully connected', username: username, token: token})
	}catch(err) {
		return res.status(500).json({message: err.message})
	}
})

router.delete('/:username', async (req, res) => {
	try {
		const { username } = req.params
		const user = await User.findOneAndDelete({username: username});
		if(!user) return res.status(404).json({message: 'No user with this username'})
		res.status(200).json({message: 'User deleted successfuly'})
	}catch(err) {
		return res.status(500).json({message: err.message})
	}
})

router.get('/:username', async (req, res) => {
	try {
		const { username } = req.params
		const user = await User.findOne({username: username});
		if(!user) return res.status(404).json({message: 'No user with this username'})
		res.status(200).json(user)
	}catch(err) {
		return res.status(500).json({message: err.message})
	}
})

module.exports = router