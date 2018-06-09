module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Centers', [{
    name: 'The Grand Pavilion',
    stateId: 27,
    address: 'Plot 6, Babafemi Osoba Crescent Lekki',
    fullAddress: 'Plot 6, Babafemi Osoba Crescent Lekki Niger',
    price: '1000000',
    hallCapacity: 2000,
    carParkCapacity: 100,
    facilities: [
      'media support',
      'cctv'
    ],
    image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1528022511/5_vl2p4f.jpg',
    createdBy: 1,
    updatedBy: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'The Power House',
    stateId: 1,
    address: '34, Ajayi Aina Street',
    fullAddress: '34, Ajayi Aina Street Abia',
    price: '500000',
    hallCapacity: 1000,
    carParkCapacity: 300,
    facilities: [
      'projector',
      'security'
    ],
    image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1528022548/4_pcespu.jpg',
    createdBy: 1,
    updatedBy: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Liberty Hall',
    stateId: 2,
    address: '4, Ladi Aminu Street Yola',
    fullAddress: '4, Ladi Aminu Street Yola Adamawa',
    price: '4000000',
    hallCapacity: 5000,
    carParkCapacity: 300,
    facilities: [
      'projector',
      'security'
    ],
    image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1528022562/Crystal-Ball-1000x500_ajaklt.jpg',
    createdBy: 1,
    updatedBy: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('stats', null, {})
};
