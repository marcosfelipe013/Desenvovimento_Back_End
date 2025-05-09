const portaoDeEmbarque = require('../model/portaoDeEmbarque');

module.exports = {
    findAllPortaoDeEmbarque: async() =>{
        return await portaoDeEmbarque.find();
    },
    findPortaoDeEmbarqueById: async(id) =>{
        return await portaoDeEmbarque.findById(id);
    },
    findPortaoDeEmbarqueByCodigo: async(codigo) =>{
        return await portaoDeEmbarque.findOne({codigo});
    },
    createPortaoDeEmbarque: async(data) =>{
        const newPortaoDeEmbarque = new portaoDeEmbarque(data);
        return await newPortaoDeEmbarque.save();
    },
    editPortaoDeEmbarqueById: async(id, data) =>{
        return await portaoDeEmbarque.findByIdAndUpdate(id, {$set:data}, {new:true});
    },
    deletePortaoDeEmbarqueById: async(id) =>{
        return await portaoDeEmbarque.findByIdAndDelete(id);
    },
    setDisponibilidade: async (portaoId, disponivel) => {
        return await portaoDeEmbarque.findByIdAndUpdate(portaoId, { $set: { disponivel } }, { new: true });
    },
}