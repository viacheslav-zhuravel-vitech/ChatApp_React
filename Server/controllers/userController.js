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
