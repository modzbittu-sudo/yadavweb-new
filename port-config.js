function resolvePort(env = process.env) {
  const configured = Number(env.PORT);
  if (Number.isInteger(configured) && configured > 0) {
    return configured;
  }

  if (env.NODE_ENV === 'production' || env.RENDER === 'true') {
    return 10000;
  }

  return 3000;
}

module.exports = {
  resolvePort,
};
