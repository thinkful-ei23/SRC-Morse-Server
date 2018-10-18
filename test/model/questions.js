'use strict';

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
	question: { type: String },
	answer: { type: String },
	memoryStrength: { type: Number },
	next: {type: Number}
});

questionSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

module.exports = mongoose.model('Questions', questionSchema);
