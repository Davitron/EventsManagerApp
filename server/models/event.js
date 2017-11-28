module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    eventName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    days: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'canceled', 'approved'],
    }
  });
  Event.associate = (models) => {
    Event.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Event.belongsTo(models.User, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE'
    });
  };
  return Event;
};
