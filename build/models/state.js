'use strict';

module.exports = function (sequelize, DataTypes) {
  var State = sequelize.define('State', {
    stateName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  State.associate = function (models) {
    State.hasMany(models.Center, {
      foreignKey: 'stateId',
      as: 'stateId'
    });
  };
  return State;
};
//# sourceMappingURL=state.js.map