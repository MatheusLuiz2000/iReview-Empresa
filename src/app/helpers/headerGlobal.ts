export default (req, res, next) => {
  process.env.HEADERS_GLOBAIS = req;
  return next();
};
