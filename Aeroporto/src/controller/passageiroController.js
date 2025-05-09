const { validationResult, matchedData } = require('express-validator');
const { request, response } = require('express');
const passageiroService = require('../service/passageiroService');

module.exports = {
    getAllPassageiros: async(request, response) => {
        const passageiros = await passageiroService.getAllPassageiros();

        return response.status(200).json({passageiros});
    },
    postPassageiro: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = matchedData(request);

        try {
            const newPassageiro = await passageiroService.createPassageiro(data);
            return response.status(200).json({ passageiro: newPassageiro });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    },
    putPassageiro: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = matchedData(request);
        const id = request.params.id;

        try {
            await passageiroService.putPassageiro(id, data);
            return response.status(200).json({ sucess: true });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    },
    deletePassageiro: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const id = request.params.id;

        try {
            await passageiroService.deletePassageiro(id);
            return response.status(200).json({ sucess: true });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}