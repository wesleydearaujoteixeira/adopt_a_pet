const router = require('express').Router();
const UserController = require('../controllers/UserController');

// Controller's routes

router.post('/register', UserController.register);
router.get('/data', UserController.data);
router.post('/login', UserController.Login);
router.get('/checkUser', UserController.checkUser);


module.exports = router;