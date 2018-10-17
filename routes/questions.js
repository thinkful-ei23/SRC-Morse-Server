'use strict';

const express = require('express');
// const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

const Question = require('../test/model/questions');

// to protect endpoint remove if needed
router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

router.get('/', (req, res, next) => {
  // get first item
  // const item = first Item in linked list
  // then will put maybe post to somewhere in list
  Question.find()
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

// post


module.exports = router;