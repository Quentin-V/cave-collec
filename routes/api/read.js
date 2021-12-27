const { Router } = require('express')
const Manga = require('../../models/manga.js')

const router = Router()

router.put('/', async (req, res) => {
    try {
        const { mangaIds, user } = req.body
        const mangas = await Manga.find({mangaId: {$in: mangaIds}, user: user})
        if(!mangas) {
            formatted = mangaIds.map(mid => new Object({mangaId: mid, read: false}))
            return res.status(200).json(formatted)
        }
        res.status(200).json(mangas)
    }catch(error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/:mangaid', async (req, res) => {
    try{
        const { mangaid } = req.params
        const { user } = req.body
        const manga = await Manga.findOne({mangaId: mangaid, user: user})
        // If not found then not read
        if(!manga) return res.status(200).json({
            mangaId: mangaid,
            read: false,
        })
        res.status(200).json(manga)
    }catch(error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router