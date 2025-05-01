const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    
    id: {
        type: String,
        required: true,
        unique: true
    },
    codigo: {
        type: String,
        required: true
    },
    disponivel: {
        type: Boolean,
        default: true
    },
});

const modelName = 'PortaoDeEmbarque';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
}
else {
    module.exports = mongoose.model(modelName, modelSchema);
}
