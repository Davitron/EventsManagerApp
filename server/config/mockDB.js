/**
 *
 */

const store = {
  events: [
    {
      id: 1,
      centerId: 3,
      eventName: 'The Wedding Party',
      eventDate: '21-09-1991',
      creatorId: 5
    },
    {
      id: 2,
      centerId: 3,
      eventName: 'Date Night',
      eventDate: '21-09-1991',
      creatorId: 5
    },
    {
      id: 3,
      centerId: 1,
      eventName: 'Bachelor Eve',
      eventDate: '21-09-1991',
      creatorId: 5
    },
    {
      id: 4,
      centerId: 2,
      eventName: 'Birthday Party',
      eventDate: '21-09-1991',
      creatorId: 5
    },
    {
      id: 5,
      centerId: 2,
      eventName: 'Conference',
      eventDate: '21-09-1991',
      creatorId: 5
    },
  ],
  centers: [
    {
      id: 1,
      name: 'The Events Place',
      state: 'Logos',
      address: '7, xyz avenue, ikaja',
      hasProjectors: true,
      hallCapacity: 600,
      carPackCapacity: 200
    },
    {
      id: 2,
      name: 'The Power House',
      state: 'Logos',
      address: '8, alama road, ikaja',
      hasProjectors: true,
      hallCapacity: 500,
      carPackCapacity: 500
    },
    {
      id: 3,
      name: 'The Apex',
      state: 'polody',
      address: '8, pamlm road, ikaja',
      hasProjectors: true,
      hallCapacity: 400,
      carPackCapacity: 700
    }
  ]
};

export default store;

