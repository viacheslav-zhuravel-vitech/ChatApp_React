const mongoose = require('mongoose')

const Conversation = mongoose.model("Conversation")

exports.createConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: req.body.members
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch(err) {
    res.status(500).json(err);
  }
}

exports.getActiveConversation = async  (req, res) => {
  try{
    const conversations = await Conversation.find({
      members: { $in:[req.params.id] },
    })
    res.status(200).json(conversations)
  }catch (err) {
    res.status(500).json(err);
  }
}