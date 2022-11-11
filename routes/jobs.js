const { getAllJobs, createJob, getJob, updateJob, deleteJob } = require('../controllers/jobs');
const auth = require('../middlewares/auth');
const validId = require('../middlewares/validId');

module.exports = app => {
  const router = require('express').Router();

  router.route('/')
    .get(getAllJobs)
    .post(createJob);

  router.use('/:id', validId);
  router.route('/:id')
    .get(getJob)
    .patch(updateJob)
    .delete(deleteJob);

  app.use('/api/v1/jobs', auth, router);
};
