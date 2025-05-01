const express = require('express');
const router = express.Router();
const vooController = require('./src/controller/vooController');
const passageiroController = require('./src/controller/passageirocontroller');

router.get('/ping', (request, response) => {
    response.status(200).json({message: 'Fragou!'});
});


router.get('/voos', vooController.getAllVoos);

router.get('/voos/:id', vooController.getVoo);

router.get('/passageirosdovoo', vooController.getPassageiros);

router.get('/checkinpassageiros', passageiroController.getAllStatusCheckIn);

module.exports = router;