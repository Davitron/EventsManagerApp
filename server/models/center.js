module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hallCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    carParkCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    facilities: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Center.associate = (models) => {
    Center.hasMany(models.Event, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE'
    });
    Center.belongsTo(models.User, {
      foreignKey: 'createdBy',
      onDelete: 'CASCADE'
    });
    Center.belongsTo(models.State, {
      foreignKey: 'stateId'
    });
  };
  return Center;
};
