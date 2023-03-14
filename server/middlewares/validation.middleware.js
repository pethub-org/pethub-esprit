const validationMiddleware = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body);
            next();
        } catch (error) {
            return res.status(400).json({ error: error?.errors });
        }

    }
}

module.exports = validationMiddleware;