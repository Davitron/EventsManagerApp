
module.exports = (sequelize, DataTypes) => {
  const PendingEvent = sequelize.define('PendingEvent', {
    centerId: {
      type: DataTypes.INTEGER,
    },
    total: {
      type: DataTypes.INTEGER,
    }
  }, {});
  PendingEvent.associate = (models) => {
    PendingEvent.belongsTo(models.Center, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE'
    });
  };
  return PendingEvent;
};
