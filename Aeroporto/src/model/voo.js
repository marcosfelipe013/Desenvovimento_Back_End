const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    nmrVoo:Number,
    origem:String,
    destino:String,
    dataHrPartida:Date,
    portaoId: {
        type: mongoose.Schema.ObjectId,
        ref: 'portaodeembarque',
        required: true
    },
    status: String
});

const modelName = 'Voos';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
}
else {
    module.exports = mongoose.model(modelName, modelSchema);
}