const zodMiddleware = (schema) => {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(400).json({
        message: error.errors.map(e => e.message).join(', ')
      });
    }
  };
};

module.exports = zodMiddleware;