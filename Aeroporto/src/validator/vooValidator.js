const { checkSchema } = require('express-validator');

const validStatuses = ['programado', 'embarque', 'concluido'];

module.exports = {
  postVooAction: checkSchema({
    nrmVoo: {
      notEmpty: true,
      trim: true
    },
    origem: {
      notEmpty: true,
      errorMessage: 'Origem obrigatória'
    },
    destino: {
      notEmpty: true,
      errorMessage: 'Destino obrigatório'
    },
    dataHrPartida: {
      notEmpty: true,
    },
    portaoId: {
      notEmpty: true,
      errorMessage: 'portaoId é obrigatório'
    }
  }),

  editVooAction: checkSchema({
    nrmVoo: {
      optional: true,
      trim: true
    },
    origem: {
      optional: true,
      errorMessage: 'Origem obrigatória'
    },
    destino: {
      optional: true,
      errorMessage: 'Destino obrigatório'
    },
    dataHrPartida: {
      optional: true
    },
    portaoId: {
      optional: true,
      errorMessage: 'portaoId é obrigatório'
    }
  })
};