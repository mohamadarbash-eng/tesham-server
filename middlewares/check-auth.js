const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // TODO repair this Damn, you can send data with the request like req.dssddsds = dfffdfdf
    try {
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (e) {
        res.status(401).json({
            message: 'user is not authorized'
        });
        next()
    }
};
