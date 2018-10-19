'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  questions: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      question: String,
      answer: String,
      memoryStrength: {type: Number, default: 1},
      next: Number,
    }
  ],
  head: {
    type: Number,
    default: 0
	},
	points: {type: Number, default: 0}
});

userSchema.set('toObject', {
	virtuals: true,
	versionKey: false,
	transform: (doc, ret) => {
		delete ret._id;
		delete ret.password;
	}
});

userSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('User', userSchema);
