const mongoose = require('mongoose');
const {request} = require('express');
const {matchedData} = require('express-validator');
const Voo = require('../model/Voo');

module.exports = {
    editVoo: async(request, response) => {
        const data = matchedData(request);
        let updates = {};

        if(data.nmrVoo) {
            updates.nmrVoo = data.nmrVoo;
        }
        if(data.origem) {
            updates.origem = data.origem;
        }
        if(data.destino) {
            updates.destino = data.destino;
        }
        if(data.dataHrPartida) {
            updates.dataHrPartida = data.dataHrPartida;
        }
        if(data.portaoId) {
            updates.portaoId = data.portaoId;
        }
        if(data.status) {
            updates.status = data.status;
        }

        await Voo.findByIdAndUpdate(data.id, updates, {new: true});
        response.status(200).json({message: 'Voo atualizado com sucesso!'});
    },
    deleteVoo: async(request, response) => {
        const data = matchedData(request);
        await Voo.findByIdAndDelete(data.id);
        response.status(200).json({message: 'Voo deletado com sucesso!'});
    },
    getVoo: async(request, response) => {
        const data = matchedData(request);
        const voo = await Voo.findById(data.id);
        if(!voo) {
            response.status(400).json({message: 'Voo não encontrado!'});
            return;
        }
        response.status(200).json(voo);
    },
    getAllVoos: async(request, response) => {
        const voos = await Voo.find();

        if(!voos) {
            response.status(400).json({message: 'Nenhum voo encontrado!'});
            return;
        }
        response.status(200).json(voos);
    },
    updateStatus: async(request, response) => {
        const data = matchedData(request);
        const voo = await Voo.findById(data.id);

        if(!voo) {
            response.status(400).json({message: 'Voo não encontrado!'});
            return;
        }

        voo.status = data.status;
        await voo.save();
        response.status(200).json({message: 'Status do voo atualizado com sucesso!'});
    },
    getPassageiros: async(request, response) => {
        const data = matchedData(request);
        const voo = await Voo.findById(data.id).populate('passageiros');

        if(!voo) {
            response.status(400).json({message: 'Voo não encontrado!'});
            return;
        }

        response.status(200).json(voo.passageiros);
    }
};