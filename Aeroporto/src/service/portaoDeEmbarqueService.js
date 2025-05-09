const mongoose = require('mongoose');
const portaoDeEmbarqueRepository = require('../repository/portaoDeEmbarqueRepository');

module.exports = {
    getAllPortaoDeEmbarque: async() =>{
        const portaoDeEmbarque = await portaoDeEmbarqueRepository.findAllPortaoDeEmbarque();

        return portaoDeEmbarque;
    },
    createPortaoDeEmbarque: async(data) =>{
        const codigoCheck = await portaoDeEmbarqueRepository.findPortaoDeEmbarqueByCodigo(data.codigo);

        if (codigoCheck) {
            throw new Error('Este Portão já está cadastrado!')
        }

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

        if (data.disponivel) {
            updates.disponivel = data.disponivel;
        }

        return portaoDeEmbarqueRepository.editPortaoDeEmbarqueById(id, updates);
    },
    deletePortaoDeEmbarque: async(id) =>{
        return await portaoDeEmbarqueRepository.deletePortaoDeEmbarqueById(id);
    }
}