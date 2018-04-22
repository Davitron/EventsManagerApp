module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    stateName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  State.associate = (models) => {
    State.hasMany(models.Center, {
      foreignKey: 'stateId',
      as: 'stateId',
    });
  };
  return State;
};

