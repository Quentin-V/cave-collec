const { Router } = require('express')
const Manga = require('../../models/manga')

const router = Router()

const verifyAuth = require('./auth.js')

router.put('/:mangaid', async (req, res) => {
    verifyAuth(req).then(async (username) => {
        try {
            const { read } = req.body
            const { mangaid } = req.params
            const manga = await Manga.findOneAndUpdate({mangaId: mangaid, user: username}, {$set: {read: read}})
            res.status(200).json(manga)
        }catch(error) {
            res.status(500).json({message: error.message})
        }
    }).catch(rejection => {
        return res.status(401).json({message: rejection})
    })
})

router.get('/:editionid/:mangaid', async (req, res) => {
    verifyAuth(req).then(async (username) => {
        try{
            const { editionid, mangaid } = req.params
            const manga = await Manga.findOne({mangaId: mangaid, user: username})
            // If not found then not read
            if(!manga) {
                const newManga = new Manga({
                    editionId: editionid,
                    mangaId: mangaid,
                    user: username,
                    read: false
                })
                await newManga.save()
                return res.status(200).json(newManga)
            }
            res.status(200).json(manga)
        }catch(error) {
            res.status(500).json({message: error.message})
        }
    }).catch(rejection => {
        return res.status(401).json({message: rejection})
    })
})

module.exports = router