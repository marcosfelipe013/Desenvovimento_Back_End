const mongoose = require('mongoose');
const {request} = require('express');
const {matchedData} = require('express-validator');
const Passageiro = require('../model/passageiro');
const Voo = require('../model/Voo');
const { updateStatus } = require('./vooController');

module.exports = {
    editPass: async(request, resonse) =>{
        const data = matchedData(request);
        let updates = {};

        if(data.id){
            const passageiro = await Passageiro.findById(data.id);
            
            if(!passageiro){
                response.status(400).json({message: 'Passageiro não encontrado!'});
                return;
            }
            updates.id = data.id;
        }
        if(data.nome){
            updates.nome = data.nome;
        }
        if(data.cpf){
            const isValidCpf = (cpf) => {
                cpf = cpf.replace(/[^\d]+/g, '');
                if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

                let sum = 0, remainder;
                for (let i = 1; i <= 9; i++) {
                    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
                }
                remainder = (sum * 10) % 11;
                if (remainder === 10 || remainder === 11) remainder = 0;
                if (remainder !== parseInt(cpf.substring(9, 10))) return false;

                sum = 0;
                for (let i = 1; i <= 10; i++) {
                    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
                }
                remainder = (sum * 10) % 11;
                if (remainder === 10 || remainder === 11) remainder = 0;
                if (remainder !== parseInt(cpf.substring(10, 11))) return false;

                return true;
            };

            if (!isValidCpf(data.cpf)) {
                response.status(400).json({message: 'CPF inválido!'});
                return;
            }

            const passageiro = await Passageiro.findOne({cpf: data.cpf});
            
            if (passageiro) {
                response.status(400).json({message: 'CPF já cadastrado!'});
                return;
            }

            updates.cpf = data.cpf;
        }
        if(data.vooId){
            const voo = await Voo.findOne({id: data.vooId});

            if(!voo){
                response.status(400).json({message: 'Voo não encontrado!'});
                return;
            }
            const passageiro = await Passageiro.findOne({vooId: data.vooId});

            if(passageiro){
                response.status(400).json({message: 'Passageiro já cadastrado nesse voo!'});
                return;
            }

            updates.vooId = data.vooId;
        }
        if(data.statusCheckIn){
            updates.statusCheckIn = data.statusCheckIn;
        }

        await Passageiro.findByIdAndUpdate(data.id, updates, {new: true});
        response.status(200).json({message: 'Passageiro atualizado com sucesso!'});
    },
    deletePass: async(request, response) => {
        const data = matchedData(request);
        await Passageiro.findByIdAndDelete(data.id);
        response.status(200).json({message: 'Passageiro deletado com sucesso!'});
    },
    getPass: async(request, response) => {
        const data = matchedData(request);
        const passageiro = await Passageiro
    },
    getAllPasss: async(request, response) => {
        const passageiro = await Passageiro.find();

        if(!passageiro){
            response.status(400).json({message: 'Nenhum passageiro encontrado!'});
            return;
        }
        response.status(200).json(passageiro);
    },
    getPassByVooId: async(request, response) => {
        const data = matchedData(request);
        const passageiro = await Passageiro.find({vooId: data.vooId});
        if(!passageiro){
            response.status(400).json({message: 'Nenhum passageiro encontrado nesse voo!'});
            return;
        }
        response.status(200).json(passageiro);
    },
    getPassByCpf: async(request, response) => {
        const data = matchedData(request);
        const passageiro = await Passageiro.find({cpf: data.cpf});
        if(!passageiro){
            response.status(400).json({message: 'Nenhum passageiro encontrado com esse CPF!'});
            return;
        }
        response.status(200).json(passageiro);
    },
    checkInPassageiro: async(request, response) => {
        const { vooId, passageiroId } = req.body;

        try {
            const voo = await Voo.findOne({ id: vooId });
    
            if (!voo) {
                return response.status(404).json({ error: 'Voo não encontrado.' });
            }

            if (voo.status !== 'Embarque') {
                return response.status(400).json({ error: 'O check-in só pode ser realizado se o status do voo for "Embarque".' });
            }
            
            const passageiro = await Passageiro.findById(passageiroId);
    
            if (!passageiro) {
                return response.status(404).json({ error: 'Passageiro não encontrado.' });
            }

            const checkInStatus = passageiro.statusCheckIn;
            
            if (checkInStatus === 'Pendente')  {
                passageiro.statusCheckIn = 'Concluído';
                await passageiro.save();
            }

            return response.status(200).json({ message: 'Check-in realizado com sucesso!', passageiro });
        } catch (error) {
            return response.status(500).json({ error: 'Erro no servidor.', detalhes: error.message });
        }
    },
    getAllStatusCheckIn: async (request, response) => {
        const statusCheckIn = await Passageiro.find({}, { statusCheckIn: 1 });
        if (!statusCheckIn) {
            response.status(400).json({ message: 'Nenhum status de check-in encontrado!' });
            return;
        }
        response.status(200).json(statusCheckIn);
    }
}