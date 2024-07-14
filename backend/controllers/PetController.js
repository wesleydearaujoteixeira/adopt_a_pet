const getToken = require('../helpers/get-a-token');
const getUserByToken = require('../helpers/get-user-bytoken');
const Pet = require('../models/Pet');
const User = require('../models/User');

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



}