const mongoose = require('mongoose');
const portaoDeEmbarqueRepository = require('../repository/portaoDeEmbarqueRepository');
const vooRepository = require('../repository/vooRepository');

module.exports = {
    getAllPortaoDeEmbarque: async() =>{
        const portaoDeEmbarque = await portaoDeEmbarqueRepository.findAllPortaoDeEmbarque();

        return portaoDeEmbarque;
    },
    createPortaoDeEmbarque: async(data) =>{
        const portaoDeEmbarqueData = {
            codigo: data.codigo,
            disponivel: data.disponivel
        }

        return await portaoDeEmbarqueRepository.createPortaoDeEmbarque(portaoDeEmbarqueData);
    },
    putPortaoDeEmbarque: async(id, data) =>{
        const updates = {};

        if (data.codigo) {
            updates.codigo = data.codigo;
        }
        if (data.status) {
            updates.status = data.status;
        }
        if (data.disponivel !== undefined) {
            updates.disponivel = data.disponivel;
        }

        return portaoDeEmbarqueRepository.editPortaoDeEmbarqueById(id, updates);
    },
    deletePortaoDeEmbarque: async(id) =>{
        return await portaoDeEmbarqueRepository.deletePortaoDeEmbarqueById(id);
    }
}