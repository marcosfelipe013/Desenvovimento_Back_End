const PortaoDeEmbarque = require('../model/portaoDeEmbarque');

module.exports = {
    findAllPortaoDeEmbarque: async() =>{
        return await PortaoDeEmbarque.find();
    },
    findPortaoDeEmbarqueById: async(id) =>{
        return await PortaoDeEmbarque.findById(id);
    },
    findPortaoDeEmbarqueByCodigo: async(codigo) =>{
        return await PortaoDeEmbarque.findOne({codigo});
    },
    createPortaoDeEmbarque: async(data) =>{
        const newPortaoDeEmbarque = new PortaoDeEmbarque(data);
        return await newPortaoDeEmbarque.save();
    },
    editPortaoDeEmbarqueById: async(id, data) =>{
        return await PortaoDeEmbarque.findByIdAndUpdate(id, {$set:data}, {new:true});
    },
    deletePortaoDeEmbarqueById: async(id) =>{
        return await PortaoDeEmbarque.findByIdAndDelete(id);
    },
    setDisponibilidade: async (portaoId, disponivel) => {
        return await PortaoDeEmbarque.findByIdAndUpdate(portaoId, { $set: { disponivel } }, { new: true });
    },
}