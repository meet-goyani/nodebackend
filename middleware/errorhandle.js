const getError = (status, message, data, ...rest) => {
  return {
    status: status,
    message: message,
    data: data,
    ...rest,
  };
};

module.exports = getError;
