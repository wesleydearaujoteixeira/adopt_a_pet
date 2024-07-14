const express = require('express');
const cors = require('cors');
const mongoose = require('../backend/db/conn');
const app = express();

// Config JSON response 

app.use(express.json());

// middlewares's sections

app.use(cors({ credentials: true, origin:"https://localhost:3000"}));

// Public Folder for Images

app.use(express.static('public'));

const PORT = 5000;
// Aplication's Routers

const router = require('./routes/UserRoutes');
const PetRouter = require('./routes/PetRouters');



app.use('/users', router);
app.use('/pets', PetRouter);


mongoose.connection.once('open', () => {
    console.log('Conectado ao MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta  http://localhost:${PORT}/`);  
  });
});





