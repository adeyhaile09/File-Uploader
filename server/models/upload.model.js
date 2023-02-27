module.exports = (sequelize, DataTypes) => {
  const Upload = sequelize.define('uploads', {
    name: {
      type: DataTypes.STRING,
    },
    uploadName: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.STRING,
    },
  });

  return Upload;
};
