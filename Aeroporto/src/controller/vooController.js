const { validationResult, matchedData } = require('express-validator');
const { request, response } = require('express');
const vooService = require('../service/vooService');

module.exports = {
    getAllVoos: async(request, response) => {
        const voos = await vooService.getAllVoos();

        return response.status(200).json({voos});
    },
    postVoo: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = matchedData(request);

        try {
            const newVoo = await vooService.createVoo(data);
            return response.status(200).json({ voo: newVoo });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    },
    putVoo: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = matchedData(request);
        const id = request.params.id;

        try {
            await vooService.putVoo(id, data);
            return response.status(200).json({ sucess: true });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    },
    deleteVoo: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }
        
        const id = request.params.id;

        try {
            await vooService.deleteVoo(id);
            return response.status(200).json({ sucess: true });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
};