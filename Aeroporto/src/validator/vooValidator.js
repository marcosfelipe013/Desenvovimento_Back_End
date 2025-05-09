const { checkSchema } = require('express-validator');

module.exports = {
  postVooAction: checkSchema({
    nmrVoo: {
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
    },
    status: {
      notEmpty: true,
      errorMessage: 'Status Deve ser obrigatório'
    }
  }),

  editVooAction: checkSchema({
    nmrVoo: {
      optional: true,
      trim: true
    },
    origem: {
      optional: true,
    },
    destino: {
      optional: true,
    },
    dataHrPartida: {
      optional: true
    },
    portaoId: {
      optional: true,
    },
    status: {
      optional: true
    }
  })
};