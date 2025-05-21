const mongoose = require('mongoose');
const vooRepository = require('../repository/vooRepository');
const portaoDeEmbarqueRepository = require('../repository/portaoDeEmbarqueRepository');

module.exports = {
    getAllVoos: async() =>{
        const voos = await vooRepository.findAllVoos();

        return voos;
    },
    getAllVoosByDia: async(data) =>{
        const [ano, mes, dia] = data.split('-').map(Number);

        if (!ano || !mes || !dia) {
            throw new Error('Data inválida!')
        }

        const inicioDia = new Date(Date.UTC(ano, mes - 1, dia, 0, 0, 0));
        const fimDia = new Date(Date.UTC(ano, mes - 1, dia, 23, 59, 59, 999));

        const voos = await vooRepository.findAllVoosByDia(inicioDia, fimDia);

        if(!voos || voos.length === 0){
            throw new Erro('Nenhum voo encontrado!')
        }

        return voos;
    },
    createVoo: async(data) =>{
        const portao = await portaoDeEmbarqueRepository.findPortaoDeEmbarqueById(data.portaoId);
        
        if (!portao) {
            throw new Error('Portão não encontrado.');
        }

        if (!portao.disponivel) {
            throw new Error('Portão não está disponível.');
        }

        const vooCheck = await vooRepository.findVooByNmrVoo(data.nmrVoo);

        if (vooCheck) {
            throw new Error('Este voo já está cadastrado!');
        }

        await portaoDeEmbarqueRepository.setDisponibilidade(data.portaoId, false);

        const vooData = {
            nmrVoo: data.nmrVoo,
            origem: data.origem,
            destino: data.destino,
            dataHrPartida: data.dataHrPartida,
            portaoId: data.portaoId,
            status: data.status
        }

        return await vooRepository.createVoo(vooData);
    },
    putVoo: async(id, data) =>{
        const updates = {};

        if (data.nmrVoo) {
            updates.nmrVoo = data.nmrVoo;
        }
        if (data.origem) {
            updates.origem = data.origem;
        }
        if (data.destino) {
            updates.destino = data.destino;
        }
        if (data.dataHrPartida) {
            updates.dataHrPartida = data.dataHrPartida;
        }
        if (data.portaoId) {
            const portaoCheck = await portaoDeEmbarqueRepository.findPortaoDeEmbarqueById(data.portaoId);

            if (!portaoCheck.disponivel) {
                throw new Error('Portão não está disponível.');
            }

            let status;

            if (!data.status) {
                const voo = await vooRepository.findVooById(id);

                if (!voo) {
                    throw new Error('Voo não encontrado!');
                }

                status = voo.status;
            } else {
                status = data.status;
            }

            if (status == 'concluido') {
                throw new Error('Voo já concluído, não pode ser associado a um portão!');
            }

            await portaoDeEmbarqueRepository.setDisponibilidade(data.portaoId, false);  

            updates.portaoId = data.portaoId;
        }
        if (data.status) {
            let portao;

            if (!data.portaoId) {
                const voo = await vooRepository.findVooById(id);

                if (!voo) {
                    throw new Error('Voo não encontrado!');
                }

                portao = await portaoDeEmbarqueRepository.findPortaoDeEmbarqueById(voo.portaoId);
            } else {
                portao = await portaoDeEmbarqueRepository.findPortaoDeEmbarqueById(data.portaoId);
            }

            if (!portao) {
                throw new Error('Portão não encontrado!');
            }

            if (data.status == 'concluido'){
                await portaoDeEmbarqueRepository.setDisponibilidade(portao._id, true);
            }

            updates.status = data.status;
        }

        return await vooRepository.editVooById(id, updates);
    },
    deleteVoo: async(id) =>{
        const voo = await vooRepository.findVooById(id);

        if (!voo) {
            throw new Error('Voo não encontrado!')
        }

        const portaoId = voo.portaoId;

        await portaoDeEmbarqueRepository.setDisponibilidade(portaoId, true);

        return await vooRepository.deleteVooById(id);
    }
}