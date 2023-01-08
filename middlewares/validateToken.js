const { errorHandler } = require('@sentry/node/types/handlers')
const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {

    const token = req.header('Authorization')
    
    if (!token) return res.status(401).json({ error: 'Access denied' })
    try {
        jwt.verify(token, process.env.SECRET, function(err,decoded){
            if (err) {
                return res.sendStatus(403).json({"error":"esto es un error"});
            }

            req.user = decoded;
            next();
        })   
        
    } 
    catch (error) {
        res.status(400).json({error: 'invalid token'})
}
}
module.exports = validateToken;