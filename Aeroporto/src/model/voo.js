const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    
    nmrVoo: {
        type: String,
        required: true
    },
    
    origem: {
        type: String,
        required: true
    },

    destino: {
        type: String,
        required: true
    },

    dataHrPartida: {
        type: String,
        required: true
    },

    portaoId: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ['Programado', 'Embarque', 'Concluído'],
        default: 'Programado'
    }
});

const modelName = 'Voos';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
}
else {
    module.exports = mongoose.model(modelName, modelSchema);
}