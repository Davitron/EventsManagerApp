const eventData = {

  getAll: {
    request: {
      limit: 9,
      page: 1,
      search: 'test'
    },
    requestForPendingEvent: 1,

    requestWithoutLimit: {
      search: 'test'
    },
    response: {
      message: 'Events Retrieved',
      data: [
        {
          id: 12,
          eventName: 'Test Party 44',
          startDate: '2222-10-10T00:00:00.000Z',
          image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg',
          endDate: '2222-10-14T00:00:00.000Z',
          days: 5,
          centerId: 1,
          userId: 1,
          status: 'accepted',
          createdAt: '2018-05-22T17:28:50.017Z',
          updatedAt: '2018-05-23T21:36:40.236Z',
          Center: {
            name: 'Test Pavilion'
          }
        },
        {
          id: 14,
          eventName: 'Test Party 44',
          startDate: '2222-10-20T00:00:00.000Z',
          image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg',
          endDate: '2222-10-24T00:00:00.000Z',
          days: 5,
          centerId: 1,
          userId: 1,
          status: 'accepted',
          createdAt: '2018-05-22T17:29:37.376Z',
          updatedAt: '2018-05-23T21:36:45.248Z',
          Center: {
            name: 'Test Pavilion'
          }
        },
        {
          id: 10,
          eventName: 'Test Party',
          startDate: '2222-10-01T00:00:00.000Z',
          image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg',
          endDate: '2222-10-05T00:00:00.000Z',
          days: 5,
          centerId: 1,
          userId: 1,
          status: 'cancelled',
          createdAt: '2018-05-22T17:19:42.332Z',
          updatedAt: '2018-05-23T21:36:58.832Z',
          Center: {
            name: 'Test Pavilion'
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

    pendingEventResponse: {
      message: 'Events Retrieved',
      pendingEvents: [
        {
          id: 12,
          eventName: 'Test Party 44',
          startDate: '2222-10-10T00:00:00.000Z',
          image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg',
          endDate: '2222-10-14T00:00:00.000Z',
          days: 5,
          centerId: 1,
          userId: 1,
          status: 'pending',
          createdAt: '2018-05-22T17:28:50.017Z',
          updatedAt: '2018-05-23T21:36:40.236Z',
          Center: {
            name: 'Test Pavilion'
          }
        },
        {
          id: 14,
          eventName: 'Test Party 44',
          startDate: '2222-10-20T00:00:00.000Z',
          image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg',
          endDate: '2222-10-24T00:00:00.000Z',
          days: 5,
          centerId: 1,
          userId: 1,
          status: 'pending',
          createdAt: '2018-05-22T17:29:37.376Z',
          updatedAt: '2018-05-23T21:36:45.248Z',
          Center: {
            name: 'Test Pavilion'
          }
        },
        {
          id: 10,
          eventName: 'Test Party',
          startDate: '2222-10-01T00:00:00.000Z',
          image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg',
          endDate: '2222-10-05T00:00:00.000Z',
          days: 5,
          centerId: 1,
          userId: 1,
          status: 'pending',
          createdAt: '2018-05-22T17:19:42.332Z',
          updatedAt: '2018-05-23T21:36:58.832Z',
          Center: {
            name: 'Test Pavilion'
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
    error: { message: 'No Token Was Provided', statusCode: 403 }
  },

  getSingle: {
    request: 1,
    response: {

    },
    error: {
      message: 'Events Not Found',
      statusCode: 404
    }
  },

  createEvent: {
    request: {
      eventName: 'New Event',
      startDate: '2020-12-12',
      days: 2,
      centerId: 1,
      image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg'
    },

    response: {
      message: 'New Events Created',
      createdEvent: {
        id: 14,
        eventName: 'New Event',
        startDate: '2020-12-12T00:00:00.000Z',
        image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg',
        endDate: '2020-12-14T00:00:00.000Z',
        days: 5,
        centerId: 1,
        userId: 1,
        status: 'pending',
        createdAt: '2018-05-22T17:29:37.376Z',
        updatedAt: '2018-05-23T21:36:45.248Z',
        Center: {
          name: 'Test Pavilion'
        }
      },
      statusCode: 201
    },

    error: { message: 'No Token Was Provided', statusCode: 403 }
  },

  updateEvents: {
    request: {
      eventName: 'New Event',
      startDate: '2020-12-12',
      days: 2,
      centerId: 1,
      image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg'
    },

    response: {
      message: 'Events update successful',
      updatedEvents: {
        id: 12,
        eventName: 'New Event',
        startDate: '2020-12-12T00:00:00.000Z',
        image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg',
        endDate: '2020-12-14T00:00:00.000Z',
        days: 2,
        centerId: 1,
        userId: 1,
        status: 'pending',
        createdAt: '2018-05-22T17:28:50.017Z',
        updatedAt: '2018-05-23T21:36:40.236Z',
        Center: {
          name: 'Test Pavilion'
        }
      },
      statusCode: 200
    },

    error: { message: 'Selected date is booked', statusCode: 409 }
  },

  delete: {
    request: 1,
    response: {
      message: 'Events Deleted Successfully',
      statusCode: 200
    },
    error: {
      message: 'Events Not Found',
      statusCode: 404
    }
  },

  other: {
    request: {
      id: 4,
      status: 'accepted'
    },
    response: {
      message: 'Event Approved',
      createdEvent: {
        id: 4,
        eventName: 'New Event',
        startDate: '2020-12-12T00:00:00.000Z',
        image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg',
        endDate: '2020-12-14T00:00:00.000Z',
        days: 5,
        centerId: 1,
        userId: 1,
        status: 'accepted',
        createdAt: '2018-05-22T17:29:37.376Z',
        updatedAt: '2018-05-23T21:36:45.248Z',
        Center: {
          name: 'Test Pavilion'
        }
      },
      statusCode: 200
    },
    error: {
      message: 'Events Not Found',
      statusCode: 404
    }
  }
};

export default eventData;
