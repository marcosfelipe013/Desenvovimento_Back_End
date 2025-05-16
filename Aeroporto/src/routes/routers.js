const express = require('express');
const router = express.Router();
const passageiroController = require('../controller/passageiroController');
const passageiroValidator = require('../validator/passageiroValidator');

const vooController = require('../controller/vooController');
const vooValidator = require('../validator/vooValidator');

const portaoDeEmbarqueController = require('../controller/portaoDeEmbarqueController');
const portaoDeEmbarqueValidator = require('../validator/portaoDeEmbarqueValidator');

const funcionarioController = require('../controller/funcionarioController');
const funcionarioValidator = require('../validator/funcionarioValidator');

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/ping', (request, response) => {
    return response.status(200).json({message:'fragou!'});
});

// Rotas para passageiro
router.get('/passageiro', passageiroController.getAllPassageiros);
router.post('/passageiro', passageiroValidator.postPassageiroAction, passageiroController.postPassageiro);
router.put('/passageiro/:id', passageiroValidator.editPassageiroAction, passageiroController.putPassageiro);
router.delete('/passageiro/:id', passageiroController.deletePassageiro);

// Rotas para Voo
router.get('/voo', vooController.getAllVoos);
router.post('/voo', authMiddleware, vooValidator.postVooAction, vooController.postVoo);
router.put('/voo/:id', authMiddleware, adminMiddleware, vooValidator.editVooAction, vooController.putVoo);
router.delete('/voo/:id', vooController.deleteVoo);

// Rotas para portão
router.get('/portao', portaoDeEmbarqueController.getAllPortaoDeEmbarque);
router.post('/portao', portaoDeEmbarqueValidator.postPortaoAction, portaoDeEmbarqueController.postPortaoDeEmbarque);
router.put('/portao/:id', portaoDeEmbarqueValidator.editPortaoAction, portaoDeEmbarqueController.putPortaoDeEmbarque);
router.delete('/portao/:id', portaoDeEmbarqueController.deletePortaoDeEmbarque);

// Rotas para funcionário
router.post('/funcionario', funcionarioValidator.postFuncionarioAction, funcionarioController.postFuncionario);

// Rotas solicitadas na atividade:
// Todos os voos programados para o dia atual
router.get('/voo/:data', vooController.getVoosByDia);
// Lista de passageiros por voo
router.get('/passageiro/:voo', passageiroController.getAllPassageirosByVoo);
// Status do Check-in de cada passageiro
router.get('/resumo', passageiroController.getAllPassageirosByNomeAndStatusCheckIn);

// Login de funcionário
router.post('/login', funcionarioValidator.loginFuncionarioAction, funcionarioController.loginFuncionario);

module.exports = router;