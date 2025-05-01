const mongoose = require('mongoose');
const {request} = require('express');
const {matchedData} = require('express-validator');
const PortaoDeEmbarque = require('../model/portaodeembarque');
const Voo = require('../model/Voo');

module.exports = {
    editPort: async(request, response) => {
        const data = matchedData(request);
        let updates = {};

        if(data.codigo) {
            const voo = await Voo.findById(data.id);

            if(!voo) {
                response.status(400).json({message: 'Portão de embarque não encontrado!'});
                return;
            }

            updates.codigo = data.codigo;
        }
        if(data.disponivel) {
            updates.disponivel = data.disponivel;
        }

        await PortaoDeEmbarque.findByIdAndUpdate(data.id, updates, {new: true});
        response.status(200).json({message: 'Portão de embarque atualizado com sucesso!'});
    }
};