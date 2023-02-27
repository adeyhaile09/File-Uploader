module.exports = (app) => {
  const uploads = require('../controllers/upload.controller.js');
  const upload = require('../middleware/upload');

  let router = require('express').Router();

  //upload an image
  router.post('/', upload.single('file'), uploads.upload);

  // Retrieve all images
  router.get('/', uploads.getAll);

  // Delete a Image with id
  router.delete('/:id', uploads.delete);

  app.use('/api/uploads', router);
};
