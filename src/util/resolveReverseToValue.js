const resolveReverseToValue = (prefix, reverse) => {
  return reverse ? `${prefix}-reverse` : prefix;
};

export default resolveReverseToValue;
