const express = require('express');
const Joi = require('joi');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { objectId } = require('../../validations/custom.validation');
const catchAsync = require('../../utils/catchAsync');
const { getApplicationsByJobId, addNewApplication, acceptApplication } = require('../../services/application.service');

const router = express.Router();

router.get(
  '/byJob',
  auth(),
  validate({
    query: Joi.object().keys({
      jobId: Joi.string().custom(objectId).required(),
    }),
  }),
  catchAsync(async (req, res) => {
    const { jobId } = req.query;
    const ret = await getApplicationsByJobId(jobId);
    res.send(ret);
  })
);

router.post(
  '/submit',
  auth('applyJobs'),
  validate({
    body: Joi.object().keys({
      jobId: Joi.string().custom(objectId).required(),
      note: Joi.string().allow(null, ''),
    }),
  }),
  catchAsync(async (req, res) => {
    const newApp = await addNewApplication(req.body, req.user);
    res.send(newApp);
  })
);

router.post(
  '/accept',
  auth('manageJobs'),
  validate({
    body: Joi.object().keys({
      applicationId: Joi.string().custom(objectId).required(),
    }),
  }),
  catchAsync(async (req, res) => {
    const { applicationId } = req.body;
    const ret = await acceptApplication(applicationId, req.user);
    res.send(ret);
  })
);

module.exports = router;
