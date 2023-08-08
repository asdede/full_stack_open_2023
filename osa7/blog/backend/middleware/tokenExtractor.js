
const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.substring(7);
      req.token = token;
    } else {
        req.token = null
    }
    next();
  };


module.exports = tokenExtractor