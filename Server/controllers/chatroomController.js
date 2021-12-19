const mongoose = require('mongoose')

const Chatroom = mongoose.model("Chatroom")

exports.createChatroom = async (req, res) => {
    const {name} = req.body;
    const nameRegex = /^[A-Za-z\s]+$/;

    if(!nameRegex.test(name)) throw new Error("Chatroom name can contain only alphabets.")

    const chatroomExist = await Chatroom.findOne({name});
    if (chatroomExist) throw new Error("Chatroom with this name already exist")

    const chatroom = new Chatroom({
        name,
    })
    await chatroom.save();
    const chatrooms = await Chatroom.find({})

    res.json({
        message: "Chatroom created!",
        chatrooms
    })

    if(!name) throw new Error()
}

exports.getAllChatrooms = async  (req, res) => {
    const chatrooms = await Chatroom.find({});

    res.json(chatrooms);
}