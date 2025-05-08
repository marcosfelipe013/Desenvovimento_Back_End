const mongoose = require('mongoose');
const vooRepository = require('../repository/vooRepository');
const passageiroRepository = require('../repository/passageiroRepository');
const portaoDeEmbarqueRepository = require('../repository/portaoDeEmbarqueRepository');
const { postVoo } = require('../controller/vooController');

module.exports = {
    getAllVoos: async() =>{
        const voos = await vooRepository.findAllVoos();

        return voos;
    },
    createVoo: async(data) =>{
        const vooData = {
            nrmVoo: data.nrmVoo,
            origem: data.origem,
            destino: data.destino,
            dataHrPartida: data.dataHrPartida,
            portaoId: data.portaoId,
            status: 'Embarque'
        }

        return await vooRepository.createVoo(vooData);
    },
    putVoo: async(id, data) =>{
        const updates = {};
        let atualizarStatusPassageiros = false;

        if (data.status) {
          updates.status = data.status;
          atualizarStatusPassageiros = true;
        }
        if (data.nrmVoo) updates.nrmVoo = data.nrmVoo;
        if (data.origem) updates.origem = data.origem;
        if (data.destino) updates.destino = data.destino;
        if (data.dataHrPartida) updates.dataHrPartida = data.dataHrPartida;
        if (data.portaoId) updates.portaoId = data.portaoId;

        const vooAtualizado = await vooRepository.editVooById(id, updates);

        if (atualizarStatusPassageiros) {
            await passageiroRepository.updateCheckInStatusByVooId(id, data.status);

        if (data.status === 'concluido') {
            const voo = await vooRepository.findVooById(id);
            await portaoDeEmbarqueRepository.setDisponibilidade(voo.portaoId, true);
        }

        return vooAtualizado;
    }
    },
    deleteVoo: async(id) =>{
        return await vooRepository.deleteVooById(id);
    }
}