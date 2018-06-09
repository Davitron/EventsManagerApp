const userMockData = {

  siginUp: {

    request: {
      email: 'username@email.com',
      username: 'king_henry',
      password: 'qwerty',
      confirmPassword: 'qwerty'
    },

    response: {
      message: 'User registration successfull. An email has been sent for verification',
      userDetails: {
        username: 'king_henry',
        email: 'username@email.com',
        isAdmin: false,
        isVerified: false
      },
      Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaXNBZG1pbiI6ZmFsc2UsInVzZXJuYW1lIjo' +
              'iZ2F6YSIsImVtYWlsIjoiZ2F6YUBtYWlsaW5hdG9yLmNvbSIsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTUy' +
              'NDA1ODk1MCwiZXhwIjoxNTI0MTQ1MzUwfQ.BNiTWUZNSIthaF_pbnCTzmfUgsuv0TrSHVOmiCRyJXE',
      statusCode: 201
    },
    error: { message: 'email or username already taken', statusCode: 409 }
  },

  signIn: {
    request: {
      email: 'username@email.com',
      password: 'qwerty',
    },

    response: {
      message: 'Authentication Is Successful!',
      userDetails: {
        username: 'king_henry',
        email: 'username@email.com',
        isAdmin: false,
        isVerified: false
      },
      Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaXNBZG1pbiI6ZmFsc2UsInVzZXJuYW1lIjo' +
              'iZ2F6YSIsImVtYWlsIjoiZ2F6YUBtYWlsaW5hdG9yLmNvbSIsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTUy' +
              'NDA1ODk1MCwiZXhwIjoxNTI0MTQ1MzUwfQ.BNiTWUZNSIthaF_pbnCTzmfUgsuv0TrSHVOmiCRyJXE',
      statusCode: 200
    },
    error: { message: 'Invalid Login Credentials', statusCode: 401 }
  },

  completeReg: {

    request: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaXNBZG1pbiI6ZmFsc2UsInVzZXJuYW1lIjo' +
             'iZ2F6YSIsImVtYWlsIjoiZ2F6YUBtYWlsaW5hdG9yLmNvbSIsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTUy' +
             'NDA1ODk1MCwiZXhwIjoxNTI0MTQ1MzUwfQ.BNiTWUZNSIthaF_pbnCTzmfUgsuv0TrSHVOmiCRyJXE',
    },

    response: {
      message: 'Welcome to Event Manager',
      user: 'proton',
      Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaXNBZG1pbiI6ZmFsc2UsInVzZXJuYW1lIjo' +
             'iZ2F6YSIsImVtYWlsIjoiZ2F6YUBtYWlsaW5hdG9yLmNvbSIsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTUy' +
             'NDA1ODk1MCwiZXhwIjoxNTI0MTQ1MzUwfQ.BNiTWUZNSIthaF_pbnCTzmfUgsuv0TrSHVOmiCRyJXE',
      statusCode: 200
    },

    tokenError: { message: 'Token Expired', statusCode: 403 },
    error: { message: 'User is already verified', statusCode: 409 }
  },

  resetRequest: {
    request: {
      email: 'segunmatthews@outlook.com'
    },
    response: { message: 'Password reset link is sent', statusCode: 200 },
    error: { message: 'User does not exist', statusCode: 404 }
  },

  resetPassword: {
    request: {
      password: 'minerva',
      confirmPassword: 'minerva'
    },
    response: { message: 'Password reset successful. You can proceed to Login', statusCode: 200 },
    error: { message: 'Passwords do not match', statusCode: 400 }
  }
};

export default userMockData;
