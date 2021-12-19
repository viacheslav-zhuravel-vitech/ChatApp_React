const router = require('express').Router();
const {catchErrors} = require('../hendlers/errorHandler')
const userController = require('../controllers/userController')

router.post('/login', catchErrors(userController.login) )
router.post('/register', catchErrors(userController.register) )
router.get('/getAllUsers', catchErrors(userController.getAllRegisteredUser) )

module.exports = router;