'use strict';

module.exports = {
      PORT: process.env.PORT || 8080,
      CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
      MONGODB_URI:
            process.env.MONGODB_URI || 'mongodb://localhost/morse-code',
      TEST_MONGODB_URI:
            process.env.TEST_MONGODB_URI ||
            'mongodb://localhost/morse-code-test'
};
