'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  class User extends Model {}
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { sequelize });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};