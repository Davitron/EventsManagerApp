module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Centers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    stateId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'States',
        key: 'id',
        as: 'stateId'
      }
    },
    address: {
      allowNull: false,
      type: Sequelize.STRING
    },
    image: {
      allowNull: true,
      type: Sequelize.STRING
    },
    hallCapacity: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    carParkCapacity: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    facilities: {
      allowNull: false,
      type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    price: {
      allowNull: false,
      type: Sequelize.DECIMAL
    },
    createdBy: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    updatedBy: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Centers')
};
