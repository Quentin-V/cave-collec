const jwt = require('jsonwebtoken')
const { jwtKey } = require('../../config')
const User = require('../../models/user')

function verifyAuth(req) {
    return new Promise((resolve, reject) => {
        let token = req.header('Authorization')?.split(' ')?.[1]
        if(!token) reject('No token')
        jwt.verify(token, jwtKey, async (err, decoded) => {
            if(err) reject('Invalid token')
            let missing = []
            if(!decoded.username) missing.push('username')
            if(!decoded.userid) missing.push('id')
            if(!decoded.date) missing.push('date')
            if(missing.length > 0) reject(`Missing parameters in token: ${missing.join(',')}`)
            let user = await User.findById(decoded.userid)
            if(!user) reject('user not found')
            if(user.invalidTokenDate > decoded.date) reject('Token expired')
            resolve(user.username)
        })
    })
}

module.exports = verifyAuth