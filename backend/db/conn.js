const mongoose = require('mongoose');

async function main() {

    const PORT = 49299;

    try {
        console.log("Tentando conectar ao MongoDB...");
        
        await mongoose.connect(`mongodb://127.0.0.1:${PORT}/getapet`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000
        });
        console.log("Conectou ao mongoose");
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB =>>>>>:', err.message);
    }
}

main().catch((err) => console.log(err));

module.exports = mongoose;
