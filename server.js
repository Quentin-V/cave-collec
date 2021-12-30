const fs = require('fs')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { HTTP_PORT, HTTPS_PORT, mongoUri } = require('./config.js')
const cors = require('cors')
const morgan = require('morgan')

var http = require('http');
var https = require('https');

const mangaRoutes = require('./routes/api/manga.js')
const readRoutes = require('./routes/api/read.js')
const editionRoutes = require('./routes/api/edition.js')

const certificate = fs.readFileSync('./sslcert/cert.pem')
const privateKey = fs.readFileSync('./sslcert/privkey.pem')
const credentials = {key: privateKey, cert: certificate};

app.disable('etag');
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB database connected...')).catch(err => console.log(err))

app.use('/api/manga', mangaRoutes)
app.use('/api/read', readRoutes)
app.use('/api/edition', editionRoutes)

app.get('/', (req, res) => res.send('hello world'))

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpServer.listen(HTTP_PORT, () => console.log(`App listening at http://localhost:${HTTP_PORT}`));
httpsServer.listen(HTTPS_PORT, () => console.log(`App listening at https://localhost:${HTTPS_PORT}`));
//app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))