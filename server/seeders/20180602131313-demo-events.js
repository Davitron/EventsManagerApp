module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Events', [{
    eventName: 'Grad day',
    startDate: '2018-12-12T00:00:00.000Z',
    image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1527930310/kht8ufw7zxlqo9tt04t4.png',
    endDate: '2018-12-15T00:00:00.000Z',
    days: 4,
    centerId: 2,
    userId: 1,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventName: 'Office Pow Wow',
    startDate: '2019-12-12T00:00:00.000Z',
    image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1527930310/kht8ufw7zxlqo9tt04t4.png',
    endDate: '2019-12-15T00:00:00.000Z',
    days: 4,
    centerId: 2,
    userId: 1,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    eventName: `Belinda's homecoming`, //eslint-disable-line
    startDate: '2020-12-12T00:00:00.000Z',
    image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1527930310/kht8ufw7zxlqo9tt04t4.png',
    endDate: '2020-12-15T00:00:00.000Z',
    days: 4,
    centerId: 2,
    userId: 1,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('stats', null, {})
};
