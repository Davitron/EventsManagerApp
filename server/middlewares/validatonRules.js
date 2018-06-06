
const validatonRules = {
  newCenter: {
    name: 'required|string|min:3|max:30',
    stateId: 'required|integer',
    address: 'required|string|min:10',
    hallCapacity: 'required|numeric',
    carParkCapacity: 'required|numeric',
    facilities: 'required|array',
    price: 'required|numeric',
    image: 'required|string'
  },
  updateCenter: {
    name: 'string|min:3|max:30',
    stateId: 'integer',
    address: 'string|min:10',
    hallCapacity: 'numeric',
    carParkCapacity: 'numeric',
    facilities: 'array',
    price: 'numeric',
  },
  newEvent: {
    eventName: 'required|string|min:3|max:30',
    startDate: 'required|date',
    days: 'required|numeric',
    centerId: 'required|integer'
  },
  updateEvent: {
    eventId: 'integer',
    eventName: 'string|min:3|max:20',
    startDate: 'date',
    days: 'numeric',
    centerId: 'integer'
  },
  eventNewStatus: {
    id: 'integer',
    status: 'string'
  },
  newUser: {
    email: 'required|email',
    username: 'required|string|min:3|max:16',
    password: 'required|min:6',
    confirmPassword: 'required|min:6',
    isAdmin: 'boolean'
  },
  authUser: {
    email: 'required|email',
    password: 'required'
  },
  resetPasswordRequest: {
    email: 'required|email',
  },
  passwordReset: {
    password: 'required|min:6',
    confirmPassword: 'required|min:6'
  }
};

export default validatonRules;

