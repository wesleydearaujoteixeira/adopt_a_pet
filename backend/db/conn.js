const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:51794/getapet', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Ajuste o tempo limite de seleção do servidor
            socketTimeoutMS: 45000, // Ajuste o tempo limite do soquete
            connectTimeoutMS: 10000 // Ajuste o tempo limite de conexão
        });
        console.log("Conectou ao mongoose");
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err.message);
    }
}

main().catch((err) => console.log(err));

module.exports = mongoose;
