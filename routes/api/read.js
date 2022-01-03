const { Router } = require('express')
const Manga = require('../../models/manga')

const router = Router()

const verifyAuth = require('./auth.js')

router.put('/:mangaid/:user', async (req, res) => {
    await verifyAuth(req).catch(rejection => {
        return res.status(401).json({message: rejection})
    })
    try {
        const { read } = req.body
        const { mangaid, user } = req.params
        const manga = await Manga.findOneAndUpdate({mangaId: mangaid, user: user}, {$set: {read: read}})
        res.status(200).json(manga)
    }catch(error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/:editionid/:mangaid/:user', async (req, res) => {
    await verifyAuth(req).catch(rejection => {
        return res.status(401).json({message: rejection})
    })
    try{
        const { editionid, mangaid, user } = req.params
        const manga = await Manga.findOne({mangaId: mangaid, user: user})
        // If not found then not read
        if(!manga) {
            const newManga = new Manga({
                editionId: editionid,
                mangaId: mangaid,
                user: user,
                read: false
            })
            await newManga.save()
            return res.status(200).json(newManga)
        }
        res.status(200).json(manga)
    }catch(error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router