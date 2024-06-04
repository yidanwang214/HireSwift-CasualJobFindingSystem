const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const ExtInfoModel = require('../models/extInfo.model');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const ret = await User.create(userBody);
  const extInfo = new ExtInfoModel({
    userId: ret._id,
    location: 'Adelaide, Australia',
    localTime: 'GMT+9:30',
    introduction:
      userBody.role === 'employer'
        ? 'We are a leading company in web development, providing top-notch services for over 10 years. Our team is dedicated to delivering high-quality projects on time and within budget.'
        : 'An experienced web designer with a passion for creating visually appealing and user-friendly websites. Skilled in Ajax, React, and various other web technologies. Dedicated to delivering high-quality work and ensuring client satisfaction.',
    title: 'Expert Web Designer with Ajax experience',
    hourlyRate: 70,
    hoursPerWeek: 'More than 30 hrs/week',
    education: 'Master of Computing and Innovation, University of Adelaide',
    licenses: 'Certified Web Developer',
    skills: 'Web Design, React, JavaScript, CSS, HTML, Ajax',
    languages: 'English (Fluent)',
    companySize: '50 - 100 employees',
    industry: 'Information Technology',
  });
  await extInfo.save();

  return ret;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
