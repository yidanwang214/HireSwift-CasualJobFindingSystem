const express = require('express');
const Joi = require('joi');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { objectId } = require('../../validations/custom.validation');
const catchAsync = require('../../utils/catchAsync');
const { calcRatingById, addNewRating, getAllRatings } = require('../../services/rating.service');

const router = express.Router();

router.get(
  '/getRating',
  validate({
    query: Joi.object().keys({
      userId: Joi.string().custom(objectId).required(),
    }),
  }),
  catchAsync(async (req, res) => {
    const { userId } = req.query;
    const ret = await calcRatingById(userId);
    res.send(ret);
  })
);

router.post(
  '/rate',
  auth(),
  validate({
    body: Joi.object().keys({
      recipientId: Joi.string().custom(objectId).required(),
      applicationId: Joi.string().custom(objectId).required(),
      jobId: Joi.string().custom(objectId).required(),
      rate: Joi.number().precision(1).required().min(0.5).max(5.0),
      comment: Joi.string().required(),
    }),
  }),
  catchAsync(async (req, res) => {
    const ret = await addNewRating(req.body, req.user);
    res.send(ret);
  })
);

router.get(
  '/getAllRatings',
  validate({
    query: Joi.object().keys({
      userId: Joi.string().custom(objectId).required(),
    }),
  }),
  catchAsync(async (req, res) => {
    const { userId } = req.query;
    const ret = await getAllRatings(userId);
    res.send(ret);
  })
);

module.exports = router;
