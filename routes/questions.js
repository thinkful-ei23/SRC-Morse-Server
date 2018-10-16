'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

const Question = require('../test/model/questions');

// to protect endpoint remove is neccessary
// router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

router.get('/', (req, res, next) => {
  Question.find()
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});