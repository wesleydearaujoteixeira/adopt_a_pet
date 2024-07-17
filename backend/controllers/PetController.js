const getToken = require('../helpers/get-a-token');
const getUserByToken = require('../helpers/get-user-bytoken');
const Pet = require('../models/Pet');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose').Types;


module.exports = class PetController {

    static async create(req, res) {


        const id = req.params.id;

        const images = req.files;


        const { name, age, weight, color } = req.body;
        
        if(!name) {
            res.status(422).json({message: "Name's required"});
        }


        if(!age){
            res.status(422).json({message: " Age's required "});
        }

        if(!weight){
            res.status(422).json({message: " Weight's required "});
        }

        if(!color){
            res.status(422).json({message: " Color's required "});
        }


        if(images.length === 0) {
            res.status(422).json({message: " Image's required "});
        }

        let available = true;        

        const user = await User.findOne({_id: id});

        if(!user){
            res.status(422).json({message: " User not found "});
        }


        const pet = new Pet({    

            name, 
            age, 
            weight, 
            color,
            available,
            images: [],
            user: {
                _id: user.id,
                name: user.name,
                image: user.image,
                phone: user.phone   
            }
            
        });


        images.map((image) => {
            pet.images.push(image.filename);
        });


        try {

            const newPewt = await pet.save();

            res.status(200).json({
                message: "Pet cadastro",
                newPewt,
            });

        } catch (error) {
            res.status(500).json({message: "Erro informado ->", error});
            
        }

    }

    static async getALL(req, res) {

        const pets = await Pet.find().sort('-createdAt');

        if(!pets){
            res.status(422).json({message: " Error, doesn't exist any Pet logged"});
        }

        res.status(200).json({
            pets: pets
        });

    }
 
    // This function should receive `req` and `res` as parameters

    static async getAllUserPets(req, res) {

        try {

            const id = req.params.id;
            
            // Find user by ID
            const user = await User.findById(id);
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
    
            // Find pets by user ID
            const pets = await Pet.find({ 'user._id': id }).sort('-createdAt');

            if (!pets || pets.length === 0) {
                return res.status(422).json({ message: "Error, no pets logged for this user" });
            }
    
            // Respond with pets
            res.status(200).json({ pets });

        } catch (error) {
            // Error handling
            res.status(500).json({ message: error.message });
        }
    
    }

    static async getUserAdoptions(req, res) {

        try {
            const id = req.params.id;
            
            // Find user by ID
            const user = await User.findById(id);

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
    
            // Find pets by user ID
            const pets = await Pet.find({adopter_id: id }).sort('-createdAt');

            if (!pets || pets.length === 0) {

                return res.status(422).json({ message: "Error, no pets logged for this user" });
            
            }

            // Respond with pets
            res.status(200).json({ 
                pets, 
            });

    } catch (error) {
        // Error handling
        res.status(500).json({ message: error.message });
   

    }

}



 static async getPetById(req, res) {

        const id = req.params.id;

        if(!ObjectId.isValid(id)){
            res.status(422).json({message: "Invalid Id!"});
            return;
        }


        const pet = await Pet.findOne({_id: id});


        if(!pet) {
            res.status(422).json({message: "Pet not found"});
            return;
        }


        res.status(200).json({
            pet,
        });


    }

    static async deletePetById(req, res) {

        const id = req.params.id;
    
        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: "Invalid Id!" });
            return;
        }
    
        try {
            // Check pet exists
            const pet = await Pet.findOne({ _id: id });
    
            if (!pet) {
                res.status(422).json({ message: "Pet not found" });
                return;
            }
    
            // Check if logged in user registered in pet
            const user = req.user;  // Assuming user is set in req by middleware
    
            if (pet.user._id.toString() !== user.id.toString()) {
                res.status(422).json({ message: "User not authenticated to remove" });
                return;
            }
    
            await Pet.findByIdAndDelete(id);

            res.status(200).json({ message: "Pet deleted!" });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }


  
        
    
    
    
    static async updatedPet(req, res) {



        const id = req.params.id;
        const { name, age, weight, color, available } = req.body;
        const images = req.files;
    
        const updatedPet = {};
    
        // Verifica se o ID é válido
        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: "Invalid Id!" });
            return;
        }
    
            // Verifica se o pet existe
            const pet = await Pet.findOne({ _id: id });
    
            if (!pet) {
                res.status(422).json({ message: "Pet not found" });
                return;
            }
    
            // Verifica se o usuário logado registrou o pet
            const user = req.user;  // Assumindo que o usuário está definido no req por middleware
    
            if (pet.user._id.toString() !== user.id.toString()) {
                res.status(422).json({ message: "User not authenticated to update" });
                return;
            }

    
            // Verifica e atualiza os campos
            if (name){ 
                return  updatedPet.name = name
            }else{
                res.status(422).json({ message: "Nomeeeee" });
            }

            if (age){ 
                return updatedPet.age = age

            }else{
                res.status(422).json({ message: "Ageeeeee" });

            }


            if (weight) { 
                return updatedPet.weight = weight

            }else {
                res.status(422).json({ message: "pesoooooo" });

            }
            if (color){ 
                return updatedPet.color = color;
            }else {
                res.status(422).json({ message: " COOOOOOR " });

            }
    
            // Verifica e atualiza as imagens
            if (images && images.length > 0) {
                updatedPet.images = [];

                images.map((img) => updatedPet.images.push(img.filename) );
            }else {
                res.status(422).json({ message: "User not authenticated to update" });

            }

            // Atualiza o pet
            await Pet.findByIdAndUpdate(id, updatedPet);
    
            res.status(200).json({ message: "Pet updated!", });
      
    }


}