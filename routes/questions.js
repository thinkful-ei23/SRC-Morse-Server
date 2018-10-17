'use strict';

const express = require('express');
// const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

const Question = require('../test/model/questions');
const User = require('../test/model/users');


// to protect endpoint remove if needed
router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

// router.get('/', (req, res, next) => {
//   // get first item
//   // const item = first Item in linked list
//   // then will put maybe post to somewhere in list
//   Question.find()
//     .then(results => {
//       res.json(results);
//     })
//     .catch(err => next(err));
// });

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  // console.log(userId);
  User.findById(userId)
    .then(user => {
      // might need to populate questions
      // console.log(user);
      const question = user.questions;
      // console.log('question', question);
      res.json(question);
    })
    .catch(err => next(err));
});

// post


module.exports = router;