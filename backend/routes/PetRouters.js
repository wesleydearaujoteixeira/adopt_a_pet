const petRouter = require('express').Router();

//  Pet's controllers 

const PetController = require('../controllers/PetController');

// middlewares 

const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/images-upload');

// Routes of the Application

petRouter.post('/create/:id', verifyToken, imageUpload.array('images'), PetController.create);
petRouter.get('/', PetController.getALL);
petRouter.get('/mypets/:id', PetController.getAllUserPets);
petRouter.get('/myadoptions/:id', PetController.getUserAdoptions);
petRouter.get('/:id', PetController.getPetById);
petRouter.delete('/:id', verifyToken, PetController.deletePetById);
petRouter.patch('/:id', verifyToken, PetController.updatedPet);

module.exports = petRouter;
