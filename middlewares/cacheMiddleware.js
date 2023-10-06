// middlewares/cacheMiddleware.js
const cache = {};

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl || req.url;
  if (cache[key]) {
    return res.json({ success: true, data: cache[key] });
  }
  res.sendResponse = res.json;
  res.json = (body) => {
    cache[key] = body;
    res.sendResponse(body);
  };
  next();
};

module.exports = { cacheMiddleware };
