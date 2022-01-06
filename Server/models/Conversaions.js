const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  members: {
    type: Array,
    required: 'Members array is required!'
  }
});

module.exports = mongoose.model('Conversation', conversationSchema);