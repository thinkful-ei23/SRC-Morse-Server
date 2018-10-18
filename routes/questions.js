'use strict';

const express = require('express');
// const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

const Question = require('../test/model/questions');
const User = require('../test/model/users');


// to protect endpoint remove if needed
router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  console.log(req.user);
  User.findById(userId)
    .then(user => {
      console.log(user);
      console.log('question', user.questions);
      res.json(user.questions);
    })
    .catch(err => next(err));
});

// post
router.post('/',(req,res ,next) => {
  // console.log(req);
  // console.log('req body', req.body);
  const { userAnswer } = req.body;
  console.log('userAnswer', userAnswer);
  const userId = req.user.id;

  User.findById(userId)
    .then(user => {
      const currIndex = user.head;
      // console.log('currInd', currIndex);  // logs curr index 0
      const question = user.questions[currIndex];
      // console.log('question', question); // logs question at index 0
      const answer = user.questions[currIndex].answer;
      // console.log('answer', answer); // returns SOS
      user.questions[currIndex].points++;
      console.log('user.questions[currIndex].points++;', user.questions[currIndex].points);
      
      let correct = true;
      console.log('user.head', question.next);
      if(answer === userAnswer.toLowerCase()) {
        correct = true;
        user.questions[currIndex].memoryStrength *= 2;
        console.log('memoryStrength', user.questions[currIndex].memoryStrength);
      } else {
        correct = false;
        user.questions[currIndex].memoryStrength = 1;
      }
      
      if(user.head === null) {
        user.head = 0;
      } else {
        user.head = question.next;
      }
      let currNode = question;
      console.log('question', question);
      let count = 0;

      while(count !== question.memoryStrength) {
        if(currNode.memoryStrength > user.questions.length) {
          currNode.memoryStrength = user.questions.length - 1;
        }
        if(currNode !== null) {
          currNode = user.questions[currNode.next];
          console.log('currNode', currNode);
        } else {
          currNode = user.questions[user.head];
          console.log('currNode', currNode);
        }
        count++;
      }
      question.next = currNode.next;
      currNode.next = currIndex;

      user.save(() => {
        if(!answer) {
          let wrong = {
            answer,
            points: user.questions[currIndex].attempts
          };
          res.json(wrong);
        } else {
          let right = {
            answer: '',
            points: user.questions[currIndex].attempts
          };
          res.json(right);
        }
      });

    });


});

module.exports = router;