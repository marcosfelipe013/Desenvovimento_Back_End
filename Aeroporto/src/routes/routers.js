const express = require('express');
const router = express.Router();
const passageiroController = require('../controller/passageiroController');
const passageiroValidator = require('../validator/passageiroValidator');

const vooController = require('../controller/vooController');
const vooValidator = require('../validator/vooValidator');

const portaoDeEmbarqueController = require('../controller/portaoDeEmbarqueController');
const portaoDeEmbarqueValidator = require('../validator/portaoDeEmbarqueValidator');

router.get('/ping', (request, response) => {
    return response.status(200).json({message:'fragou!'});
});

router.get('/passageiro', passageiroController.getAllPassageiros);
router.post('/passageiro', passageiroValidator.postPassageiroAction, passageiroController.postPassageiro);
router.put('/passageiro/:id', passageiroValidator.editPassageiroAction, passageiroController.putPassageiro);
router.delete('/passageiro/:id', passageiroController.deletePassageiro);

router.get('/voo', vooController.getAllVoos);
router.post('/voo', vooValidator.postVooAction, vooController.postVoo);
router.put('/voo/:id', vooValidator.editVooAction, vooController.putVoo);
router.delete('/voo/:id', vooController.deleteVoo);

router.get('/portao', portaoDeEmbarqueController.getAllPortaoDeEmbarque);
router.post('/portao', portaoDeEmbarqueValidator.postPortaoAction, portaoDeEmbarqueController.postPortaoDeEmbarque);
router.put('/portao/:id', portaoDeEmbarqueValidator.editPortaoAction, portaoDeEmbarqueController.putPortaoDeEmbarque);
router.delete('/portao/:id', portaoDeEmbarqueController.deletePortaoDeEmbarque);

module.exports = router;