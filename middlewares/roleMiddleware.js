const authorization = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied, insufficient permissions' });
        }

        next();
    };
}

module.exports = authorization;
// This middleware checks if the user's role is included in the allowed roles.
// If not, it sends a 403 Forbidden response.
// If the role is valid, it calls `next()` to proceed to the next middleware or route handler.