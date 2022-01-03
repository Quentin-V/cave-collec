const { Router } = require('express')
const Manga = require('../../models/manga.js')

const router = Router()

const verifyAuth = require('auth')

router.get('/:editionid', async(req, res) => {
	await verifyAuth(req).catch(rejection => {
		return res.status(401).json({message: rejection})
	})
	try{
		const { editionid } = req.params;
		const mangas = await Manga.find({editionId: editionid})
		if(!mangas) return res.status(500).json({message: 'No mangas'})
		res.status(200).json(mangas)
	}catch(error) {
		res.status(500).json({message: error.message})
	}
})

router.get('/:editionid/:user', async(req, res) => {
	await verifyAuth(req).catch(rejection => {
		return res.status(401).json({message: rejection})
	})
	try{
		const { user, editionid } = req.params;
		const mangas = await Manga.find({user: user, editionId: editionid})
		if(!mangas) return res.status(500).json({message: 'No mangas'})
		res.status(200).json(mangas)
	}catch(error) {
		res.status(500).json({message: error.message})
	}
})

module.exports = router