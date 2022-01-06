const router = require('express').Router();
const {catchErrors} = require('../hendlers/errorHandler')
const conversationController = require('../controllers/conversationController')
const auth = require("../middlewares/auth")

router.post('/createConversation', auth, catchErrors(conversationController.createConversation));
router.get('/getActiveConversation/:id', auth, catchErrors(conversationController.getActiveConversation));


module.exports = router;