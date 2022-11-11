module.exports = (app, express) => {
  app.use(express.json());
  
  require('./jobs')(app);
  require('./auth')(app);
};
