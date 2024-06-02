const httpStatus = require('http-status');
const ApplicationModel = require('../models/application.model');
const JobModel = require('../models/job.model');
const ApiError = require('../utils/ApiError');

const addNewApplication = async (applicationInfo, user) => {
  if (user.role !== 'employee') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'only employee can apply for a job');
  }
  const job = await JobModel.findById(applicationInfo.jobId).exec();
  if (!job || job.status !== 'Opening') {
    throw new ApiError(httpStatus.BAD_REQUEST, `job ${job.title} is not accepting applicants`);
  }
  const appModel = new ApplicationModel({ ...applicationInfo, employeeId: user._id, status: 'Pending' });
  const ret = await appModel.save();
  return ret._id;
};

const acceptApplication = async (applicationId, user) => {
  if (user.role !== 'employer') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'only employer can manage application');
  }
  const app = await ApplicationModel.findById(applicationId);
  app.status = 'Accepted';
  await app.save();
  // reject all others applies
  ApplicationModel.updateMany({ jobId: app.jobId }, { status: 'Rejected' });
  return app._id;
};

const rejectApplication = async (applicationId, user) => {
  if (user.role !== 'employer') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'only employer can manage application');
  }

  const app = await ApplicationModel.findById(applicationId);
  app.status = 'Rejected';
  await app.save();
  return app._id;
};

const getApplicationsByJobId = async (jobId) => {
  // TODO: employee name
  // employee rating
  // employee history
  return ApplicationModel.find({ jobId }).exec();
};

const findApplications = async (searchInfo = {}, options = { page: 1, limit: 10 }) => {
  const { employeeId, jobId, search, status, updatedStart, updatedEnd } = searchInfo;
  const filter = {};
  if (employeeId) {
    filter.employeeId = employeeId;
  }
  if (jobId) {
    filter.jobId = jobId;
  }
  if (search) {
    filter.$text = search;
  }
  if (status) {
    filter.status = status;
  }
  const dateFilter = {};
  if (updatedStart) {
    dateFilter.$gte = new Date(updatedStart).toISOString();
  }
  if (updatedEnd) {
    dateFilter.$lte = new Date(updatedEnd).toISOString();
  }
  Object.assign(filter, dateFilter);
  const ret = await ApplicationModel.paginate(filter, options);
  return ret;
};

module.exports = {
  addNewApplication,
  acceptApplication,
  rejectApplication,
  findApplications,
  getApplicationsByJobId,
};
