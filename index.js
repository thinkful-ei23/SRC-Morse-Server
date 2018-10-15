'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');

const { PORT, CLIENT_ORIGIN, MONGODB_URI } = require('./config');
// const { dbConnect } = require('./db-mongoose');

mongoose.Promise = global.Promise;
const app = express();

app.use(
	morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
		skip: (req, res) => process.env.NODE_ENV === 'test'
	})
);

app.use(
	cors({
		origin: CLIENT_ORIGIN
	})
);

app.use(express.json());

app.use('/api/users', usersRouter);

if (process.env.NODE_ENV !== 'test') {
	mongoose
		.connect(MONGODB_URI)
		.then(instance => {
			const conn = instance.connections[0];
			console.info(
				`Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`
			);
		})
		.catch(err => {
			console.error(`ERROR: ${err.message}`);
			console.error('\n === Did you remember to start `mongod`? === \n');
			console.error(err);
		});
	app
		.listen(PORT, function () {
			console.info(`Server listening on ${this.address().port}`);
		})
		.on('error', err => {
			console.error(err);
		});
}

module.exports = app;
