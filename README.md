[![Build Status](https://travis-ci.org/Davitron/EventsManagerApp.svg?branch=ft-validation)](https://travis-ci.org/Davitron/EventsManagerApp)
[![Coverage Status](https://coveralls.io/repos/github/Davitron/EventsManagerApp/badge.svg?branch=develop)](https://coveralls.io/github/Davitron/EventsManagerApp?branch=develop)
[![codecov](https://codecov.io/gh/Davitron/EventsManagerApp/branch/develop/graph/badge.svg)](https://codecov.io/gh/Davitron/EventsManagerApp)
[![Maintainability](https://api.codeclimate.com/v1/badges/7845bcb6e9e002aef52b/maintainability)](https://codeclimate.com/github/Davitron/EventsManagerApp/maintainability)
[![](https://img.shields.io/badge/Protected_by-Hound-a873d1.svg)](https://houndci.com)
# Events Manager
Events Manager is a full stack application, that creates a platform event center management and event booking. Event venue owners can expose their venues through this medium, allowing users to have a poll of venues when seeking for suitable venues for their events.

## Hosted Application
http://event-manager-andela.herokuapp.com/

## API Documentation
http://event-manager-andela.herokuapp.com/docs


## Installation guide

STEP 1: Install `node` version 6 or higher

STEP 2: Install `posgresql` database

Step 3: Clone this repo and cd into it

```
$ git clone https://github.com/Davitron/EventsManagerApp.git
$ cd EventsManagerApp
```

STEP 4: Install all dependencies

```
$ npm install
```

STEP 5: Set up postress for the application

```
check ./config/config.json to add nesseccary database credential
I advise storing such credentials as environment variables for security purposes

```

STEP 6: Run migration and seed the database with nesseccary data

```
$ sequelize db:migrate && sequelize db:seed:all
```

STEP 7: Start the application

```
$ npm run start:dev
```

STEP 8: Navigate to application on your browser

```
localhost:8000
```

## Key Features

* User can an create account with email, username and password
* Users are then authenticated with email and password
* Admin can create, modify or delete centers
* Users can create, modify or delete event bookings
* Admin can accept or reject such events
* Mail notifications are sent to users when
  * User creates new event
  * Admin approves or rejects event
* Users can search for center by name or address, state, facilities and hall capacity

## Testing

`chai` and `chai-http` are used for backend testing.
`enzyme` and `jest` where used to test components, actions and reducers.

* For backend testing run:
```
$ npm run test:server
```
* For frontend testing run:
```
$ npm run test:client
```
* For end-to-end test run:
`$ npm run server:e2e` and then `npm run test:e2e` on seperate terminal

## Limitations

* Only authenticated users can access key fuetures such as event booking
* User cannot deactivate their account
* Authorization tokens are only valid for 24 hours

## Technologies
* [Node](https://www.nodejs.org) - A JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

* [Express](https://www.expressjs.com) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

* [Sequelize](http://www.docs.sequelizejs.com) - Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL and features solid transaction support, relations, read replication and more

* [PosgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database system.

* [React](https://www.reactjs.com) - A JavaScript library for building user interfaces

* [Redux](https://redux.js.org/) - Redux is a predictable state container for JavaScript apps.

* [Semantic-UI-react](https://react.semantic-ui.com/introduction) - Semantic UI React is the official React integration for Semantic UI

## License
This project is licensed under MIT.

## Contribution
When contributing to this repository, please reach out to me or other contributors via email, issue or any other means to discuss the changes you wish to make. Do checkout the style guide and conventions of this project in the wiki section.


## Author
* Oluwasegun Matthews (Davitron) - A weirdo

## Acknowledgment

* Semantic-ui-react

* Reactjs

* Reduxjs

* Cloudinary

* Expressjs

* Nodejs
