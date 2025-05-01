const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    vooId: {
        type: String,
        required: true
    },
    statusCheckIn: {
        type: String,
        enum: ['Pendente', 'Concluído'],
        default: "Pendente"
    }
});

const modelName = 'Passageiros';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
}
else {
    module.exports = mongoose.model(modelName, modelSchema);
}