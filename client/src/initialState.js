const initialState = {
  userCreation: {
    creating: false,
    created: false,
    failed: false,
    user: null,
    error: null
  },
  userAuthentication: {
    authenticating: false,
    authenticated: false,
    failed: false,
    user: null,
    error: null
  }
};

export default initialState;
