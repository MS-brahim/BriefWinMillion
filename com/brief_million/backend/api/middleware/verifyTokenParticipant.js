const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if(!token) return res.status(401).send('You have to login first');
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.participant = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid !')
    }
}