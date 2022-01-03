const jwt = require('jsonwebtoken')
const { jwtKey } = require('../../config')
const User = require('../../models/user')

function verifyAuth(req) {
    return new Promise((resolve, reject) => {
        let token = req.header('Authorization')?.split(' ')?.[1]
        if(!token) reject('No token')
        jwt.verify(token, jwtKey, null, async isValid => {
            if(!isValid) reject('Invalid token')
            let decoded = await jwt.decode(token)
            let missing = []
            if(!decoded.username) missing.push('username')
            if(!decoded.id) missing.push('id')
            if(!decoded.date) missing.push('date')
            if(missing.length > 0) reject(`Missing parameters in token: ${missing.join(',')}`)
            let user = await User.findById(decoded.id)
            if(user.invalidTokenDate > decoded.date) reject('Token expired')
            resolve(true)
        })
    })
}

module.exports = verifyAuth