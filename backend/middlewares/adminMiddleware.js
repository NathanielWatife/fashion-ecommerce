const adminMiddleware = (req, res, next) => {
    if (!req.user?.isAdmin) {
        return res.status(403).json({message: 'Access denied, admin only'});
    }
    next();
};

module.exports = adminMiddleware;