const { Router } = require('express')
const Manga = require('../../models/manga.js')

const router = Router()

router.get('/:editionid', async(req, res) => {
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
	try{
		const { user, editionid } = req.params;
		const mangas = await Manga.find({user: user, editionId: editionid})
		if(!mangas) return res.status(500).json({message: 'No mangas'})
		res.status(200).json(mangas)
	}catch(error) {
		res.status(500).json({message: error.message})
	}
})

router.put('/:editionid', async(req, res) => {
	try{
		const { mangaid } = req.body;
		const { editionid } = req.params;
		const manga = await Manga.findOneAndUpdate({mangaId: mangaid}, {$set: {editionId: editionid}})
		if(!manga) return res.status(500).json({message: 'No manga to update'})
		res.status(200).json(manga)
	}catch(error) {
		res.status(500).json({message: error.message})
	}
})

router.delete('/:editionid', async (req, res) => {
	const {editionid} = req.params
	try {
		const response = await Manga.delete({editionId: editionid})
		if(!response) return res.status(500).json({message: 'Unable to find the specified manga'})
		res.status(200).json(response)
	}catch(error) {
		res.status(500).json({message: error.message})
	}
})

module.exports = router