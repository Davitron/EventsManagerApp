module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('States', [{
    statName: 'Abia',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Adamawa',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Akwa Ibom',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Anambra',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Bauchi',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Bayelsa',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Benue',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Borno',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Cross River',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Delta',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Ebonyi',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Edo',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Ekiti',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Enugu',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'FCT',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Gombe',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Imo',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Jigawa',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Kaduna',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Kano',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Katsina',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Kebbi',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Kogi',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Kwara',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Lagos',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Nasarawa',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Niger',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Ogun',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Ondo',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Osun',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Oyo',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Plateau',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Rivers',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Sokoto',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Taraba',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Yobe',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    statName: 'Zamfara',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('stats', null, {})
};
