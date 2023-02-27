const multer = require('multer');

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Please upload only images.', false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/assets/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-kid-${file.originalname}`);
  },
});

var uploadFile = multer({
  storage: storage,
  limits: { fileSize: 1048576 }, //10 mb
});
module.exports = uploadFile;
