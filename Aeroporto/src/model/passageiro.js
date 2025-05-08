const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    nome:String,
    cpf:String,
    vooId: {
        type: mongoose.Schema.ObjectId,
        ref: 'voos',
        required: true
    },
    statusCheckIn: String
});

const modelName = 'passageiros';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
}
else {
    module.exports = mongoose.model(modelName, modelSchema);
}