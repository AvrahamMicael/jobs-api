const { login, register } = require('../controllers/auth');
const requiredFields = require('../middlewares/requiredFields');

module.exports = app => {
  const router = require('express').Router();

  router.post('/login', requiredFields('email', 'password'), login)
    .post('/register', requiredFields('name', 'email', 'password'), register);

  app.use('/api/v1/auth', router);
};
