'use strict';

module.exports = {
	PORT: process.env.PORT || 8080,
	CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:morse',
	DATABASE_URL: process.env.MONGODB_URI || 'mongodb://localhost/morse-backend',
	TEST_DATABASE_URL:
		process.env.TEST_MONGODB_URL || 'mongodb://localhost/morse-backend-test'
};
