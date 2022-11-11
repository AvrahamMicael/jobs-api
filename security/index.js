module.exports = app => {
  app.use(require('express-rate-limit')({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }));
  app.use(require('helmet')());
  app.use(require('cors')());
  app.use(require('xss-clean')());
};
