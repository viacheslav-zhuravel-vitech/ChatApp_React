require('dotenv').config();
const jwt = require('jwt-then')
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection.on('error', (err) => {
    console.log("Mongoose Connection ERROR: " + err.message)
})

mongoose.connection.once('open', () => {
    console.log("MongoDB Connected!")
})

require('./models/Message');
require('./models/Chatroom');
require('./models/User');
require('./models/Conversaions')

const app = require('./app');

const server = app.listen(8000, function(){
    console.log('server at port 8000');
})

const socket = require('socket.io');
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const Message = mongoose.model("Message");
const User = mongoose.model('User');
const Chatroom = mongoose.model('Chatroom');

io.use( async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET);
        socket.userId = payload.id;
        next();
    } catch(e) {
    }
});

io.on('connection', async (socket) => {
    const currentUser = await User.findOne({_id: socket.userId});
    io.to(socket.userId).emit('loginData', {
        name: currentUser.name
    })
    console.log("connected" + socket.userId);

    socket.on('disconnect', () => {
        console.log("Disconnected" + socket.userId);
    })

    socket.on('joinRoom', async ({id}) => {
        socket.join(id);
        const messages = await Message.find({chatroom: id});
        const preparedMessages = await Promise.all(messages.map(async (item) => {
            const user = await User.findOne({_id: item.user});
            return(
              {message: item.message, userId: item.user, name: user.name}
            )
        }))
        io.to(id).emit('oldMessages', {
            messages: preparedMessages
        })
        console.log('a user joined to chatroom' + id)
    })

    socket.on('leaveRoom', ({currentChatId}) => {
        socket.leave(currentChatId);
        console.log('a user leave chatroom' + currentChatId)
    })

    socket.on('chatroomMessage', async ({currentChatId, message}) => {
        console.log(message)
        if(message.length > 0) {
            const user = await User.findOne({_id: socket.userId});
            const newMessage = new Message({chatroom: currentChatId, user: socket.userId, message})
            io.to(currentChatId).emit('newMessage', {
                message, userId: socket.userId, name: user.name
            })

            await newMessage.save();
        }
    })
});

