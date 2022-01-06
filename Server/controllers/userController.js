const mongose = require('mongoose');
const User = mongose.model('User');
const sha256 = require('js-sha256');
const jwt = require('jwt-then')

exports.register = async (req, res) => {
    const {name, email, password} = req.body;
    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com$/;

    if(!emailRegex.test(email)) throw new Error( "Email wish your domain is not supported");
    if(password.length < 6) throw new Error("Password mast be longer then 6");

    const userExist = await User.findOne({
        email,
    })
    if(userExist) throw new Error("User with same email already exist")

    const user = new User({
        name,
        email,
        password: sha256(password + process.env.SALT)
    });

    await user.save();

    res.json({
        message: `User ${name} register successfully`
    })

}
exports.login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({
        email,
        password: sha256(password + process.env.SALT)
    })

    if (!user) throw  new Error("Email and password wrong")

    const token = await jwt.sign({id: user.id}, process.env.SECRET);
    res.json({
        message: "User logged in successfully",
        token,
        name: user.name
    });
}

exports.loginByToken = async (req, res) => {
    const {token} = req.body;
    const payload = await jwt.verify(token, process.env.SECRET);
    const loginedUser = await User.findOne({
        _id: payload.id
    })

    if (!loginedUser) throw  new Error("User don't login")

    res.json({
        token,
        name: loginedUser.name,
    });
}

exports.getAllRegisteredUser = async  (req, res) => {
    const allUsers = await User.find({});

    res.json(allUsers.map(user => ({ name: user.name, id: user._id, email: user.email})));
}