const jwt = require('jsonwebtoken');


function checkToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No authorization header provided' });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        
        const decoded = jwt.verify(token, "OurSecret");
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

module.exports = checkToken;
