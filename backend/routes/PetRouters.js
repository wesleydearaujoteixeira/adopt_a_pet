const petRouter = require('express').Router();

//  Pet's controllers 

const PetController = require('../controllers/PetController');

// middlewares 

const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/images-upload');

// Routes of the Application

petRouter.post('/create/:id', verifyToken, imageUpload.array('images'), PetController.create);
petRouter.get('/', PetController.getALL);






module.exports = petRouter;