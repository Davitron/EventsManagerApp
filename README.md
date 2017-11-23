[![Build Status](https://travis-ci.org/Davitron/EventsManagerApp.svg?branch=develop)](https://travis-ci.org/Davitron/EventsManagerApp)
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
Npm install

```
To start server, run:
```
npm start

```
To test, run:
```
npm test

```
Possible API routes
<ol>
   <li>POST  `/events/` to create a new event </li>
   <li>GET  `/events/` to get all events.</li>
   <li>PUT  `/events/:eventId` to modify an event</li>
   <li>DELETE  `/events/:eventId` to delete an event</li>
   <li>GET `/events/:eventId` to get a single event</li>
   <li>POST  `/centers/` to create a new center </li>
   <li>GET  `/centers/` to get all centers.</li>
   <li>PUT  `/centers/:centerId` to modify a center</li>
   <li>DELETE  `/centers/:centerId` to delete a center</li>
   <li>GET `/centers/:centerId` to get a single center</li>
</ol>