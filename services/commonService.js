const checkAllParams = params => {
  for (const [key, value] of Object.entries(params)) {
    if (value == false || value == undefined) {
      const error = new Error(`${key} value not entered!`);
      error.status = 400;
      throw error;
    }
  }
};

module.exports = { checkAllParams };
