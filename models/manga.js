const { Schema, model } = require('mongoose')

const MangaSchema = new Schema({
    read: {
        type: Boolean,
        required: true
    },
    mangaId: {
        type: String,
        required: true
    },
    editionId: {
        type: String,
        reqiured: true
    },
    user: {
        type: String,
        required: true
    }
})

const Manga = model('manga', MangaSchema)
module.exports = Manga