const jwt = require('jsonwebtoken');

// Middleware to check if user has the required role (optional)
const authMiddleware = (requiredRole = null) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;

            // If a role is required, check it
            if (requiredRole && verified.role !== requiredRole) {
                return res.status(403).json({ message: "Access Denied! Insufficient permissions." });
            }

            next();
        } catch (error) {
            res.status(401).json({ message: "Invalid or expired token!" });
        }
    };
};

module.exports = authMiddleware;
