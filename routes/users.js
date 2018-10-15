const express = require('express');
const router = express.Router();
const User = require('..db/models/users');

router.post('/users', (req, res, next) => {
	console.log('posted');
});
