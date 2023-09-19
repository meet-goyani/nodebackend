const errorHandler = (err, res, req, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
};

module.exports = errorHandler;
