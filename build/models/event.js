'use strict';

module.exports = function (sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    eventName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    days: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    centerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('pending', 'accepted', 'cancelled', 'rejected'),
      defaultValue: 'pending'
    }
  });
  Event.associate = function (models) {
    Event.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'user'
    });
    Event.belongsTo(models.Center, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE',
      as: 'center'
    });
  };
  return Event;
};
//# sourceMappingURL=event.js.map