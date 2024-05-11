const httpStatus = require('http-status');
const JobModel = require('../models/job.model');
const ApiError = require('../utils/ApiError');

const findJobById = async (jobId) => {
  return JobModel.findById(jobId);
};

const addNewJob = async (jobInfo, userId) => {
  const job = new JobModel({
    ownerId: userId,
    status: 'Opening',
    ...jobInfo,
  });
  const savedJob = await job.save();
  return savedJob._id;
};

const updateJobById = async (jobId, updateFields, user) => {
  const job = await findJobById(jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, `job: ${jobId} not found`);
  }
  if (user.role !== 'admin' && !user._id.equals(job.ownerId)) {
    throw new ApiError(httpStatus.FORBIDDEN, `you can only edit jobs created by yourself`);
  }
  Object.assign(job, updateFields);
  const savedJob = await job.save();
  return savedJob._id;
};

const deleteJobById = async (jobId, user) => {
  const job = await JobModel.findById(jobId);
  if (user.role !== 'admin' && !job.ownerId.equals(user._id)) {
    throw new ApiError(httpStatus.FORBIDDEN, 'you can only delete jobs created by yourself');
  }
  await JobModel.findByIdAndDelete(jobId);
};

const findJobs = async (userId, searchInfo = {}, options = { page: 1, limit: 10 }) => {
  const { search, tag, status, salary, location, updatedStart, updatedEnd } = searchInfo;
  const filter = {};
  if (search) {
    filter.$text = { $search: search };
  }
  if (tag) {
    filter.tags = tag;
  }
  if (status) {
    filter.status = status;
  }
  if (salary) {
    filter.salaryStart = { $lte: salary };
    filter.salaryEnd = { $gte: salary };
  }
  if (location) {
    filter.location = location;
  }
  if (userId) {
    filter.ownerId = userId;
  }
  const dateFilter = {};
  if (updatedStart) {
    dateFilter.$gte = new Date(updatedStart).toISOString();
  }
  if (updatedEnd) {
    dateFilter.$lte = new Date(updatedEnd).toISOString();
  }
  Object.assign(filter, dateFilter);

  const jobList = await JobModel.paginate(filter, options);
  return jobList;
};

module.exports = {
  findJobById,
  addNewJob,
  updateJobById,
  deleteJobById,
  findJobs,
};
