const express = require('express');
const errorHandlers = require('./hendlers/errorHandler')
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/user', require('./routes/user'));
app.use('/chatroom', require('./routes/chatroom'))

app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors);

if(process.env.ENV === "DEVELOPMENT") {
    app.use(errorHandlers.developmentErrors)
} else {
    app.use(errorHandlers.productionErrors);
}



module.exports = app;