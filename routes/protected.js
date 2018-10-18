const express = require('express');

const passport = require('passport');
const router = express.Router();

router.use(
	'/',
	passport.authenticate('jwt', { session: false, failWithError: true })
);

router.get('/', (req, res, next) => {
	res.send({ message: 'protected' }).catch(err => next(err));
	//find question.head based on user
});

module.exports = router;
