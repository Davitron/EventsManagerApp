[![Build Status](https://travis-ci.org/Davitron/EventsManagerApp.svg?branch=ft-validation)](https://travis-ci.org/Davitron/EventsManagerApp)
[![Coverage Status](https://coveralls.io/repos/github/Davitron/EventsManagerApp/badge.svg?branch=bg-handleException)](https://coveralls.io/github/Davitron/EventsManagerApp?branch=bg-handleException)
# EventsManagerApp
An Event Management Application for event centers and  event booking.

# Technologies used;
<ol>
   <li>NodeJS</li>
   <li>ExpressJs</li>
</ol>

# Getting Started

## Setup guide
Clone this repository

To install all dependencies, run;
```
npm install

```
To start server, run:
```
npm start

```
To test, run:
```
npm test

```
For api documentation
```
`/docs`
```
Possible API routes
<ol>
   <li>POST  `/api/v1/events/` to create a new event </li>
   <li>GET  `/api/v1/events/` to get all events.</li>
   <li>PUT  `/api/v1/events/:eventId` to modify an event</li>
   <li>DELETE  `/api/v1/events/:eventId` to delete an event</li>
   <li>GET `/api/v1/events/:eventId` to get a single event</li>
   <li>POST  `/api/v1/centers/` to create a new center </li>
   <li>GET  `/api/v1/centers/` to get all centers.</li>
   <li>PUT  `/api/v1/centers/:centerId` to modify a center</li>
   <li>DELETE  `/api/v1/centers/:centerId` to delete a center</li>
   <li>GET `/api/v1/centers/:centerId` to get a single center</li>
</ol>