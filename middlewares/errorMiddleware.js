// middlewares/errorMiddleware.js
const handleErrors = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
};

module.exports = { handleErrors };
