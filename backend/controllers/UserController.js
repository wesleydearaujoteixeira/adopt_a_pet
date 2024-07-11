const createUserToken = require('../helpers/create-user-token');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importando os helpers

const tokenId = require('../helpers/get-a-token');

module.exports = class UserController {


    static async register(req, res) {
        console.log('Received registration request');
        const { name, email, phone, password, status, confirmpassword } = req.body;

        // Validate required fields
        if (!name) {
            res.status(400).json({ message: 'Name is required' });
            return;
        }

        if (!email) {
            res.status(400).json({ message: 'Email is invalid' });
            return;
        }

        if (!phone) {
            res.status(400).json({ message: 'Phone number is invalid' });
            return;
        }

        if (!password || password.length < 8) {
            res.status(400).json({ message: 'Password must be at least 8 characters long' });
            return;
        }

        if (password !== confirmpassword) {
            res.status(400).json({ message: 'Passwords do not match' });
            return;
        }

        try {
            // Check if user with the same email already exists
            console.log('Checking if user already exists');

            const existingUser = await User.findOne({email: email});

            if (existingUser) {
                res.status(422).json({ message: 'Email already exists' });
                return;
            }

            // Create a hashed password

            console.log('Creating hashed password');
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            // Create a new user

            console.log('Creating new user');
            
            const user = new User({
                name,
                email,
                phone,
                status,
                password: passwordHash
            });

            const newUser = await user.save();
           await createUserToken(newUser, req, res);

        } catch (error) {
            res.status(500).json({ message: `Server error: ${error.message}` });
            console.error(error);
        }
    }

    static async data(req, res) {

        console.log('Received data request');
        
        const { status } = req.query;

        const datas = await User.find({status: status});

        if (!datas) {
            res.status(404).json({ message: 'No data found' });
            return;
        }

        res.json(datas);


    }


    static async Login(req, res) {

        const {email, password} = req.body;

        if(!email) {
            res.status(422).json({ message: 'Email is required' });
            return;
        }
 
        if(!password){
            res.status(422).json({ message: 'Password is required' });
            return;
        }

       // check if user exists

        const user = await User.findOne({email});
        
        if (!user) {
            res.status(422).json({ message: 'Invalid credentials and wrong email'});
            return;
        }

        // check if password is correct

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(422).json({ message: 'Invalid credentials and wrong password'});
            return;
        }

        await createUserToken(user, req, res);

    }

    static async checkUser (req, res) {

        let currentUser;
        console.log(req.headers.authorization);

        if(req.headers.authorization) {

            console.log("Checking Token Files...");

            const token = tokenId(req);
            const decode =jwt.verify(token, "OurSecret");

            currentUser = await User.findById(decode.id)
            currentUser.password = undefined;
        }
        
        else{
            currentUser = null;
        }

        res.status(200).send(currentUser);

    }


    static async getUserById(req, res) {

        const id = req.params.id;

        const user = await User.findById(id).select('-password');

        if(!user){
            res.status(422).json({
                message: "User is not found! "
            })

        }

        res.status(200).json({ user });


    }

    static async userUpdate (req, res) {
            res.status(422).json({message: "Acho que foi"});
            return;
    }


    


}
