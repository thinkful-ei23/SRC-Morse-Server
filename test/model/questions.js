'use strict';

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questions: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      question: String,
      answer: String,
      memoryStrength: Number,
      next: Number
    }
  ]
});

questionSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

module.exports = mongoose.model('Questions', questionSchema);
