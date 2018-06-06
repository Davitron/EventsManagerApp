import expect from 'expect';
import userActionType from '../../actions/actionTypes/userActionType';
import UserReducer from '../../reducers/UserReducer';
import initialState from '../../initial-state';


describe('User Reducer', () => {
  describe('User registraion', () => {
    it('should set change the state when signup is in progress', () => {
      const nextState = {
        status: 'creating',
        data: null
      };

      const action = {
        type: userActionType.SIGNUP_REQUEST,
        data: null
      };

      const newState = UserReducer.register(initialState.user, action);
      // expect(newState.status).toBeA('string');
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should set change the state when signup is successful', () => {
      const nextState = {
        status: 'created',
        data: 'User registration successfull. An email has been sent for verification'
      };

      const action = {
        type: userActionType.SIGNUP_SUCCESS,
        data: 'User registration successfull. An email has been sent for verification'
      };

      const newState = UserReducer.register(initialState.user, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should set change the state when signup fails', () => {
      const nextState = {
        status: 'failed',
        data: 'signUp failed'
      };

      const action = {
        type: userActionType.SIGNUP_FAILURE,
        data: 'signUp failed'
      };

      const newState = UserReducer.register(initialState.user, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should return initial state when no action type is passed', () => {
      const nextState = initialState.user;

      const action = {
        type: null,
        data: null
      };

      const newState = UserReducer.register(initialState.user, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });
  });

  describe('User Authentication', () => {
    it('should set change the state when signin is in progress', () => {
      const nextState = {
        isAuthenticated: false,
        status: 'authenticating',
        data: null
      };

      const action = {
        type: userActionType.SIGNIN_REQUEST,
        data: null
      };

      const newState = UserReducer.login(initialState.user, action);
      expect(newState.isAuthenticated).toEqual(nextState.isAuthenticated);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should set change the state when signin is successful', () => {
      const user = {
        username: 'proton',
        email: 'proton@email.com',
        isAdmin: true,
        isVerified: false
      };

      const nextState = {
        isAuthenticated: true,
        status: 'authenticated',
        data: user
      };

      const action = {
        type: userActionType.SIGNIN_SUCCESS,
        data: user
      };

      const newState = UserReducer.login(initialState.user, action);
      expect(newState.isAuthenticated).toEqual(nextState.isAuthenticated);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should set change the state if signin fails', () => {
      const nextState = {
        isAuthenticated: false,
        status: 'failed',
        data: 'Invalid Login Credentials'
      };

      const action = {
        type: userActionType.SIGNIN_FAILURE,
        data: 'Invalid Login Credentials'
      };

      const newState = UserReducer.login(initialState.user, action);
      expect(newState.isAuthenticated).toEqual(nextState.isAuthenticated);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should return initial state when no action type is passed', () => {
      const nextState = initialState.user;

      const action = {
        type: null,
        data: null
      };

      const newState = UserReducer.login(initialState.user, action);
      expect(newState.isAuthenticated).toEqual(nextState.isAuthenticated);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });
  });

  describe('Complete User Registration', () => {
    it('should set change the state when user verification is in progress', () => {
      const nextState = {
        status: 'ongoing',
        data: null
      };

      const action = {
        type: userActionType.VERIFY_REQUEST,
        data: null
      };

      const newState = UserReducer.completeRegistration(initialState.user, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should set change the state when user verificationis successful', () => {
      const nextState = {
        status: 'success',
        data: 'Verification Successful'
      };

      const action = {
        type: userActionType.VERIFY_SUCCESS,
        data: 'Verification Successful'
      };

      const newState = UserReducer.completeRegistration(initialState.user, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should set change the state if user verification fails', () => {
      const nextState = {
        status: 'failed',
        data: 'Verification Failed'
      };

      const action = {
        type: userActionType.VERIFY_FAILURE,
        data: 'Verification Failed'
      };

      const newState = UserReducer.completeRegistration(initialState.user, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should return initial state when no action type is passed', () => {
      const nextState = initialState.user;

      const action = {
        type: null,
        data: null
      };

      const newState = UserReducer.completeRegistration(initialState.user, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });
  });

  describe('User Forgot Password', () => {
    it('should set change the state when users request to reset password is in progress', () => {
      const nextState = {
        status: 'ongoing',
        data: null
      };

      const action = {
        type: userActionType.FORGOT_PASSWORD_REQUEST,
        data: null
      };

      const newState = UserReducer.forgotPassword(initialState.user, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should set change the state when user password reset is successful', () => {
      const nextState = {
        status: 'success',
        data: 'Password Reset Successful'
      };

      const action = {
        type: userActionType.FORGOT_PASSWORD_SUCCESS,
        data: 'Password Reset Successful'
      };

      const newState = UserReducer.forgotPassword(initialState.user, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should set change the state if password reset fails', () => {
      const nextState = {
        status: 'failed',
        data: 'Password Reset Failed'
      };

      const action = {
        type: userActionType.FORGET_PASSWORD_FAILURE,
        data: 'Password Reset Failed'
      };

      const newState = UserReducer.forgotPassword(initialState.user, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should return initial state when no action type is passed', () => {
      const nextState = initialState.user;

      const action = {
        type: null,
        data: null
      };

      const newState = UserReducer.forgotPassword(initialState.user, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });
  });

  describe('Reset User Password', () => {
    it('should set change the state when password reset is in progress', () => {
      const nextState = {
        status: 'ongoing',
        data: null
      };

      const action = {
        type: userActionType.RESET_REQUEST,
        data: null
      };

      const newState = UserReducer.resetPassword(initialState.user, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should set change the state when user password reset is successful', () => {
      const nextState = {
        status: 'success',
        data: 'Password Reset Successful'
      };

      const action = {
        type: userActionType.RESET_SUCCESS,
        data: 'Password Reset Successful'
      };

      const newState = UserReducer.resetPassword(initialState.user, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should set change the state if password reset fails', () => {
      const nextState = {
        status: 'failed',
        data: 'Password Reset Failed'
      };

      const action = {
        type: userActionType.RESET_FAILURE,
        data: 'Password Reset Failed'
      };

      const newState = UserReducer.resetPassword(initialState.user, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should return initial state when no action type is passed', () => {
      const nextState = initialState.user;

      const action = {
        type: null,
        data: null
      };

      const newState = UserReducer.resetPassword(initialState.user, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });
  });
});
