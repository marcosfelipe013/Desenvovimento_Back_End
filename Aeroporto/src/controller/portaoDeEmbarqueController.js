const { validationResult, matchedData } = require('express-validator');
const { request, response } = require('express');
const portaoDeEmbarqueService = require('../service/portaoDeEmbarqueService');

module.exports = {
    getAllPortaoDeEmbarque: async(request, response) => {
        const portaoDeEmbarque = await portaoDeEmbarqueService.getAllPortaoDeEmbarque();

        return response.status(200).json({portaoDeEmbarque});
    },
    postPortaoDeEmbarque: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = matchedData(request);

        try {
            const newPortaoDeEmbarque = await portaoDeEmbarqueService.createPortaoDeEmbarque(data);
            return response.status(201).json({ portaoDeEmbarque: newPortaoDeEmbarque });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    },
    putPortaoDeEmbarque: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = matchedData(request);
        const id = request.params.id;

        try {
            await portaoDeEmbarqueService.putPortaoDeEmbarque(id, data);
            return response.status(200).json({ sucess: true });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    },
    deletePortaoDeEmbarque: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }
        
        const id = request.params.id;

        try {
            await portaoDeEmbarqueService.deletePortaoDeEmbarque(id);
            return response.status(200).json({ sucess: true });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
};