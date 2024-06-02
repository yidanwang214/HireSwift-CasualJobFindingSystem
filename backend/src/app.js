const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const getHashName = (file) => {
  const shasum = crypto.createHash('sha1');
  const ext = path.extname(file.originalname);
  const ret = shasum.update(file.originalname);
  return ret.digest('hex') + ext;
};
const uploadFolder = 'uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, getHashName(file));
  },
});
const uploadMiddleware = multer({ storage });

const app = express();

if (config.env !== 'test') {
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// keep safety
app.use(xss());
app.use(mongoSanitize());

app.use(compression());
app.use(cors());
app.options('*', cors());

app.use('/files', express.static(uploadFolder, { dotfiles: 'deny', index: false }));

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// v1 api routes
app.use('/v1', routes);

// file upload
app.post('/v1/upload', uploadMiddleware.single('file'), (req, res) => {
  const filename = getHashName(req.file);
  res.status(200).send(filename);
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
