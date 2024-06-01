const removeEmptyValue = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

module.exports = removeEmptyValue;
