const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const AuthMiddleware = (roles = []) => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const payload = jwt.verify(token, SECRET_KEY);
        console.log("Payload:", payload); // Debugging: Log payload
        console.log("Roles required:", roles); // Debugging: Log roles required

        if (roles.length && !roles.includes(payload.role)) {
            console.log("User role:", payload.role, "is not allowed."); // Debugging: Log invalid role
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = payload;
        next();
    } catch (error) {
        console.error("JWT Error:", error.message); // Debugging: Log JWT error
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = AuthMiddleware;
