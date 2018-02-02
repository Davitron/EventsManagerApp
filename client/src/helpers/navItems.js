import AuthChecker from './authChecker';

const linkByRoles = {
  unAuthUser: [
    {
      linkName: 'SignIn',
      linkRef: '/SignIn'
    },
    {
      linkName: 'SignUp',
      linkRef: '/SignUp'
    }
  ],
  user: [
    {
      linkName: 'Book a center',
      linkRef: '/centersearch'
    },
    {
      linkName: 'My Events',
      linkRef: '/events'
    },
    {
      linkName: 'Logout',
      linkRef: '/SignOut'
    }
  ],
  admin: [
    {
      linkName: 'Admin',
      linkRef: ''
    },
    {
      linkName: 'Centers',
      linkRef: '/Centers'
    },
    {
      linkName: 'My Events',
      linkRef: '/events'
    },
    {
      linkName: 'Pending Events',
      linkRef: '/pendingEvents'
    },
    {
      linkName: 'SignOut',
      linkRef: '/SignOut'
    }
  ]
};


const getUserRole = () => {
  const authUser = AuthChecker.getUserDetails();
  if (typeof authUser === 'object') return authUser.isAdmin;
  return null;
};

