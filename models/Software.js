const mongoose = require('mongoose');

const softwareSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  details: {
    type: String
  },
  version: {
    type: String,
    trim: true
  },
  medicalUseCases: {
    type: String
   
  },
  contactPerson: {
    type: String,
    trim: true
  },
  emailAddress: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  status: {
    type: String,
    enum: ['pending', 'approved',"reject"],
    default: 'pending'
  },
  repository_url: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
softwareSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Software', softwareSchema); 