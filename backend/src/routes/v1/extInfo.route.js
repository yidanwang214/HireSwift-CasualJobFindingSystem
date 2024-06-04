const express = require('express');
const Joi = require('joi');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { objectId } = require('../../validations/custom.validation');
const catchAsync = require('../../utils/catchAsync');
const { getExtInfoByUserId, updateExtInfo } = require('../../services/extInfo.service');

const router = express.Router();

router.get(
  '/:userId',
  validate({
    params: Joi.object().keys({
      userId: Joi.string().custom(objectId).required(),
    }),
  }),
  catchAsync(async (req, res) => {
    const { userId } = req.params;
    const ret = await getExtInfoByUserId(userId);
    res.send(ret);
  })
);
router.get(
  '/',
  auth(),
  catchAsync(async (req, res) => {
    const ret = await getExtInfoByUserId(req.user._id);
    res.send(ret);
  })
);

router.post(
  '/update',
  auth(),
  validate({ body: Joi.object().keys({}) }),
  catchAsync(async (req, res) => {
    const ret = await updateExtInfo(req.user, req.body);
    res.send(ret);
  })
);

module.exports = router;
