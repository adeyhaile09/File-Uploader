const fs = require('fs');

const db = require('../models');
const Upload = db.upload;
const Op = db.Sequelize.Op;

exports.upload = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    const data = fs.readFileSync(
      __basedir + '/assets/uploads/' + req.file.filename
    );

    Upload.create({
      name: req.file.originalname,
      uploadName: req.file.filename,
      size: niceBytes(req.file.size),
      //   data: fs.readFileSync(__basedir + "/assets/uploads/" + req.file.filename),
    }).then((file) => {
      console.log('file created', file);
      fs.writeFileSync(__basedir + '/assets/tmp/' + file.name, data);

      // return res.send({ message: `File has been uploaded.`, data: file });
      return res.send(file);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: err.message || 'Error when trying upload files.',
    });
  }
};

// Retrieve all Files from the database.
exports.getAll = (req, res) => {
  Upload.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving files.',
      });
    });
};

// Delete a File with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  Upload.findByPk(id)
    .then((file) => {
      if (file) {
        Upload.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              fs.unlinkSync(__basedir + '/assets/tmp/' + file.name);
              fs.unlinkSync(__basedir + '/assets/uploads/' + file.uploadName);
              res.send({
                message: 'File was deleted successfully!',
              });
            } else {
              res.send({
                message: `Cannot delete File with id=${id}. Maybe File was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: 'Could not delete File with id=' + id,
            });
          });
      } else {
        res.status(404).send({
          message: `Cannot find File with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete File with id=' + id,
      });
    });
};

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

function niceBytes(x) {
  let l = 0,
    n = parseInt(x, 10) || 0;

  while (n >= 1024 && ++l) {
    n = n / 1024;
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
}
