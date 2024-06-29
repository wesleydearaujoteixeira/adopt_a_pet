const express = require('express');
const cors = require('cors');

const app = express();

// Config JSON response 

app.use(express.json());

// middlewares's sections

app.use(cors({credentials: true, origin:"https://localhost:3000"}));

// Public Folder for Images

app.use(express.static('public'));

const PORT = 5000;

// Aplication's Routers

app.get('/', (req, res) => {
    res.send({message:"loading"})
});

const UserRouters = require('./routes/UserRoutes');

app.use(UserRouters);


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
});








