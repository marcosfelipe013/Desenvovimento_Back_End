const voo = require('../model/voo');
const portaoDeEmbarqueRepository = require('./portaoDeEmbarqueRepository');

module.exports = {
    findAllVoos: async() =>{
        return await voo.find();
    },
    findVooById: async(id) =>{
        return await voo.findById(id);
    },
    createVoo: async(data) =>{
        const portao = await portaoDeEmbarqueRepository.findPortaoDeEmbarqueById(data.portaoId);
        if (!portao) throw new Error('Portão não encontrado.');
        if (!portao.disponivel) throw new Error('Portão não está disponível.');

        const existingVoo = await voo.findOne({ portaoId: data.portaoId });
        if (existingVoo) throw new Error('Este portão já está vinculado a outro voo.');

        const newVoo = new voo(data);
        const saved = await newVoo.save();

        await portaoDeEmbarqueRepository.setDisponibilidade(data.portaoId, false);

        return saved;
    },
    editVooById: async(id, data) =>{
        return await voo.findByIdAndUpdate(id, {$set:data}, {new:true});
    },
    deleteVooById: async(id) =>{
        return await voo.findByIdAndDelete(id);
    }
}