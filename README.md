# Amazing-co Test

Events that are currently offering are stored inside `events.csv` file. Event-Checkout application returns the discounted cost after applying the promotion rules.

# How code works

Get event details from csv file, store data to Postgres Db.
Apply promotion rules based on the userselected events and return discounted cost.

# Running locally

Make sure that Postgres Db has set up and running locally.
Run `yarn install` to install all required libraries 
Run `node app.js` from the root directory to start the NodeJS CLI application, type EventIds as per prompt.

# Testing
Run `yarn test` to run all the test cases done by using Mocha and Chai unit testing framework
