const centerData = {

  getAll: {
    request: {
      limit: 9,
      page: 1,
      search: 'test'
    },
    requestWithoutLimit: {
      search: 'test'
    },
    response: {
      message: 'Centers Retrieved',
      data: [
        {
          id: 1,
          name: 'Test Pavilion',
          stateId: 1,
          address: 'This is a test address for this event center',
          image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg',
          hallCapacity: 500,
          carParkCapacity: 200,
          facilities: [
            'cctv',
            'media support',
            'projector'
          ],
          price: '3000000',
          createdBy: 1,
          updatedBy: 1,
          createdAt: '2018-05-12T20:53:06.182Z',
          updatedAt: '2018-05-17T02:05:23.257Z',
          State: {
            stateName: 'Abia'
          },
          User: {
            username: 'davitron'
          }
        },
        {
          id: 4,
          name: 'Test Venue',
          stateId: 1,
          address: 'This is a test address for this event center',
          image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg',
          hallCapacity: 500,
          carParkCapacity: 200,
          facilities: [
            'cctv',
            'media support',
            'projector'
          ],
          price: '100000',
          createdBy: 1,
          updatedBy: 1,
          createdAt: '2018-05-15T22:23:00.797Z',
          updatedAt: '2018-05-16T15:13:27.652Z',
          State: {
            stateName: 'Abia'
          },
          User: {
            username: 'davitron'
          }
        },
        {
          id: 6,
          name: 'Test Center',
          stateId: 1,
          address: 'This is a test address for this event center',
          image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg',
          hallCapacity: 500,
          carParkCapacity: 200,
          facilities: [
            'cctv',
            'media support',
            'projector'
          ],
          price: '100000',
          createdBy: 1,
          updatedBy: 1,
          createdAt: '2018-05-16T23:12:29.968Z',
          updatedAt: '2018-05-16T23:12:29.968Z',
          State: {
            stateName: 'Abia'
          },
          User: {
            username: 'davitron'
          }
        }
      ],
      metadata: {
        pagination: {
          limit: 9,
          offset: 0,
          page: 1,
          pages: 1,
          count: 3,
          currentPageSize: 3
        }
      },
      statusCode: 200
    },
    error: {
      message: 'No centers found',
      statusCode: 404,
      data: [],
      metadata: null,
    }
  },

  getSingle: {
    request: 1,
    response: {
      message: 'Center Retrieved',
      center: {
        id: 1,
        name: 'Test Pavilion',
        stateId: 1,
        address: 'This is a test address for this event center',
        image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg',
        hallCapacity: 500,
        carParkCapacity: 200,
        facilities: [
          'cctv',
          'media support',
          'projector'
        ],
        price: '3000000',
        createdBy: 1,
        updatedBy: 1,
        State: {
          stateName: 'Abia'
        },
        User: {
          username: 'davitron'
        }
      },
      metadata: {
        pendingEventCount: 0,
        events: 'http://localhost:8000/api/v1/events?centerId=1'
      },
      statusCode: 200
    },
    error: {
      message: 'Center Not Found',
      statusCode: 404
    }
  },

  getStates: {
    request: undefined,
    response: {
      states: [
        {
          id: 1,
          stateName: 'ABIA'
        },
        {
          id: 2,
          stateName: 'ADAMAWA'
        },
        {
          id: 3,
          stateName: 'AKWA-IBOM'
        },
      ]
    },
    error: {
      message: 'States Not Found',
      statusCode: 404
    }
  },

  createCenter: {
    request: {
      name: 'Test Arena',
      stateId: 2,
      address: 'This is a test address for this event center',
      image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg',
      hallCapacity: 500,
      carParkCapacity: 200,
      facilities: [
        'cctv',
        'media support',
        'projector'
      ],
    },

    response: { message: 'New Center Created', centerId: 5, statusCode: 201 },

    error: { message: 'Center already exists', statusCode: 409 }
  },

  updateCenter: {
    request: {
      id: 2,
      name: 'Test Arena',
      stateId: 2,
      address: 'This is a test address for this event center',
      image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg',
      hallCapacity: 500,
      carParkCapacity: 200,
      facilities: [
        'cctv',
        'media support',
        'projector'
      ],
    },

    response: {
      message: 'Center update successful',
      updatedCenter: {
        id: 2,
        name: 'Test Arena',
        stateId: 2,
        address: 'This is a test address for this event center',
        image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg',
        hallCapacity: 500,
        carParkCapacity: 200,
        facilities: [
          'cctv',
          'media support',
          'projector'
        ],
      },
      statusCode: 200
    },

    error: { message: 'Center already exists', statusCode: 409 }
  },

  delete: {
    request: 1,
    response: {
      message: 'Center Deleted Successfully',
      statusCode: 200
    },
    error: {
      message: 'Center Not Found',
      statusCode: 404
    }
  },
};

export default centerData;
