const hasRoleMiddleware = (role) => {
    return (req, res, next) => {
        if (req?.user?.role !== role) {
            return res.status(401).json({ message: 'Unauthorized Role Not Maching' });
        }
        next();
    }
}

module.exports = hasRoleMiddleware;