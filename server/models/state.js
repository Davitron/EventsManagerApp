module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    statName: {
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

