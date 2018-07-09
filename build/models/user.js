'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Event, {
      foreignKey: 'userId',
      as: 'events'
    });
    User.hasMany(models.Center, {
      foreignKey: 'createdBy',
      as: 'centers'
    });
  };
  return User;
};
//# sourceMappingURL=user.js.map