const express = require('express');
const Joi = require('joi');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { objectId } = require('../../validations/custom.validation');
const JobController = require('../../controllers/job.controller');

const router = express.Router();

const jobIdVad = {
  params: Joi.object().keys({
    jobId: Joi.string().custom(objectId),
  }),
};

const jobDetails = {
  title: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  description: Joi.string().required(),
  categoryId: Joi.number().default(0),
  // status: Joi.string().valid('Opening', 'Closed', 'In progress', 'Finished').required(),
  salaryPerHour: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!value.match(/^\d{1,5}(-\d{1,5})?$/)) {
        return helpers.message('salary should be a number or a range of number');
      }
      return value;
    }),
  location: Joi.string().required(),
  contact: Joi.string().required(),
  image: Joi.string(),
};

const jobCreateVad = {
  body: Joi.object().keys(jobDetails),
};

const jobUpdateVad = {
  body: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
    ...jobDetails,
  }),
};

const jobSearchVad = {
  body: Joi.object().keys({
    query: Joi.object().keys({
      search: Joi.string().allow('', null),
      tag: Joi.string().allow('', null),
      status: Joi.string().valid('Opening', 'Closed', 'In progress', 'Finished'),
      salaryStart: Joi.number(),
      salaryEnd: Joi.number(),
      location: Joi.string().allow('', null),
      updatedStart: Joi.number(),
      updatedEnd: Joi.number(),
      categoryId: Joi.number(),
    }),
    page: Joi.number().positive(),
    limit: Joi.number().positive().max(100),
  }),
};

router.post('/create', auth('manageJobs'), validate(jobCreateVad), JobController.createJob);
router.put('/create', auth('manageJobs'), validate(jobCreateVad), JobController.createJob);
router.post('/update', auth('manageJobs'), validate(jobUpdateVad), JobController.updateJob);
router.post('/list', auth(), validate(jobSearchVad), JobController.listJob);

router
  .route('/:jobId')
  .get(auth(), validate(jobIdVad), JobController.getJobById)
  .patch(auth('manageJobs'), validate(jobUpdateVad), JobController.updateJob)
  .delete(auth('manageJobs'), validate(jobIdVad), JobController.deleteJob);

// router.post('/update', auth('manageJobs'), validate(jobIdVad));
router.post('/delete', auth('manageJobs'), validate(jobIdVad), JobController.deleteJob);
module.exports = router;
