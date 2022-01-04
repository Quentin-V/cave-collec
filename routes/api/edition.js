const { Router } = require('express')
const Manga = require('../../models/manga.js')

const router = Router()

const verifyAuth = require('./auth.js')

router.get('/:editionid', async(req, res) => {
	verifyAuth(req).then(async (username) => {
		try{
			const { editionid } = req.params;
			const mangas = await Manga.find({editionId: editionid, user: username})
			if(!mangas) return res.status(500).json({message: 'No mangas'})
			res.status(200).json(mangas)
		}catch(error) {
			res.status(500).json({message: error.message})
		}
	}).catch(rejection => {
		return res.status(401).json({message: rejection})
	})
})

module.exports = router