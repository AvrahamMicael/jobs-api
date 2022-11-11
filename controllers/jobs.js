const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

module.exports = {
  getAllJobs: async ({ user: { userId } }, res) => {
    const jobs = await Job.find({ createdBy: userId }).sort('createdAt');
    return res.json(jobs);
  },

  createJob: async ({ body, user: { userId } }, res) => {
    body.createdBy = userId;
    const job = await Job.create(body);
    return res.status(StatusCodes.CREATED).json(job);
  },
  
  getJob: async ({ params: { id }, user: { userId } }, res) => {
    const job = await Job.findOne({ _id: id, createdBy: userId });
    if(!job) throw new NotFoundError(`No job with id ${id}`);
    return res.json(job);
  },

  updateJob: async ({ params: { id }, body, user: { userId } }, res) => {
    const job = await Job.findOneAndUpdate({ _id: id, createdBy: userId }, body, { new: true, runValidators: true });
    if(!job) throw new NotFoundError(`No job with id ${id}`);
    return res.json(job);
  },

  deleteJob: async ({ params: { id }, user: { userId } }, res) => {
    const job = await Job.findOneAndRemove({ _id: id, createdBy: userId });
    if(!job) throw new NotFoundError(`No job with id ${id}`);
    return res.status(StatusCodes.NO_CONTENT).send();
  },
};
