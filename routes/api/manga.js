const { Router } = require('express')
const Manga = require('../../models/manga.js')

const router = Router()

router.get('/', async(req, res) => {
    try{
        const mangas = await Manga.find()
        if(!mangas) throw Error('No mangas')
        res.status(200).json(mangas)
    }catch(error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    const newManga = new Manga(req.body)
    try {
        const manga = await newManga.save()
        if(!manga) throw Error('Something went wrong saving the manga')
        res.status(200).json(manga)
    }catch(error) {
        res.status(500).json({message: error.message})
    }
})

router.put('/:mangaid', async (req, res) => {
    const {mangaid} = req.params
    try {
        const response = await Manga.findOne({mangaId: mangaid})
        if(!response) throw Error('Something went wrong')
        const updated = {...response._doc, ...req.body}
        res.status(200).json(updated)
    }catch(error) {
        res.status(500).json({message: error.message})
    }
})

router.delete('/:mangaid', async (req, res) => {
    const {mangaid} = req.params
    try {
        const response = await Manga.deleteOne({mangaId: mangaid})
        if(!response) throw Error('Unable to find the specified manga')
        res.status(200).json(response)
    }catch(error) {
        res.status(500).json({message: error.message})
    }
})

router.delete('/_id/:id', async (req, res) => {
    const {id} = req.params
    try {
        const response = await Manga.findByIdAndDelete(id)
        if(!response) throw Error('Unable to find the specified manga')
        res.status(200).json(response)
    }catch(error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router