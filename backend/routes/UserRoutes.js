
const router = require('express').Router();
const UserController = require('../controllers/UserController');


// middlewares has been used;

const checkToken = require('../helpers/verify-token');


// Controller's routes

router.post('/register', UserController.register);
router.get('/data', UserController.data);
router.post('/login', UserController.Login);
router.get('/checkUser', UserController.checkUser);
router.get('/:id', UserController.getUserById);
router.patch('/edit/:id', checkToken , UserController.userUpdate);


module.exports = router;