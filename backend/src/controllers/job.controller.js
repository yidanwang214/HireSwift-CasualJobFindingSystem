const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { findJobById, deleteJobById, addNewJob, findJobs, updateJobById } = require('../services/job.service');
const { getUserById } = require('../services/user.service');
const categories = require('../models/categories.mock');
const { calcRatingById, getRatingsByJobId } = require('../services/rating.service');
const { getApplicationsByJobId } = require('../services/application.service');

const listJob = catchAsync(async (req, res) => {
  const { query, page, limit } = req.body;
  const { user } = req;

  const ret = await findJobs(user, query, { page, limit });
  if (ret && ret.results && ret.results.length > 0) {
    for (const item of ret.results) {
      // publisher information
      item.ownerInfo = await getUserById(item.ownerId);
      // rating information
      item.ownerRating = await calcRatingById(item.ownerId);
      // applications information
      item.applicants = await getApplicationsByJobId(item.id);
      item.category = categories.get(item.categoryId ?? 0);
      item.ratings = await getRatingsByJobId(item.id);
    }
  }
  res.send(ret);
});

const searchJob = catchAsync(async (req, res) => {
  const { query } = req.body;
  const ret = await findJobs(null, { ...query, status: 'Opening' }, { limit: 999, page: 1 });
  if (ret && ret.results && ret.results.length > 0) {
    for (const item of ret.results) {
      // publisher information
      item.ownerInfo = await getUserById(item.ownerId);
      // rating information
      item.ownerRating = await calcRatingById(item.ownerId);
      // applications information
      item.applicants = await getApplicationsByJobId(item.id);
      item.category = categories.get(item.categoryId ?? 0);
      item.ratings = await getRatingsByJobId(item.id);
    }
  }
  res.send(ret.results);
});

const getJobById = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  const job = await findJobById(jobId);
  if (!job) {
    res.status(404).send('Not found');
  } else {
    job.category = categories.get(job.categoryId ?? 0);
    job.ownerInfo = await getUserById(job.ownerId);
    job.ownerRating = await calcRatingById(job.ownerId);
    job.applicants = await getApplicationsByJobId(job.id);
    job.ratings = await getRatingsByJobId(job.id);
    res.send(job);
  }
});

const deleteJob = catchAsync(async (req, res) => {
  const { jobId } = req.body;
  await deleteJobById(jobId, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

const createJob = catchAsync(async (req, res) => {
  const jobFields = {
    ...req.body,
  };
  delete jobFields.salaryPerHour;
  if (req.body.salaryPerHour.includes('-')) {
    const salaries = req.body.salaryPerHour.split('-');
    jobFields.salaryStart = parseInt(salaries[0], 10);
    jobFields.salaryEnd = parseInt(salaries[1], 10);
  } else {
    jobFields.salaryStart = parseInt(req.body.salaryPerHour, 10);
    jobFields.salaryEnd = jobFields.salaryStart;
  }

  const jobId = await addNewJob(jobFields, req.user._id);
  res.send(jobId);
});

const updateJob = catchAsync(async (req, res) => {
  const jobFields = {
    ...req.body,
  };
  delete jobFields.salaryPerHour;
  if (req.body.salaryPerHour.includes('-')) {
    const salaries = req.body.salaryPerHour.split('-');
    jobFields.salaryStart = parseInt(salaries[0], 10);
    jobFields.salaryEnd = parseInt(salaries[1], 10);
  } else {
    jobFields.salaryStart = parseInt(req.body.salaryPerHour, 10);
    jobFields.salaryEnd = jobFields.salaryStart;
  }

  const jobId = await updateJobById(req.body.id, jobFields, req.user);
  res.send(jobId);
});

module.exports = {
  getJobById,
  deleteJob,
  createJob,
  listJob,
  updateJob,
  searchJob,
};
