const { checkSchema } = require('express-validator');

module.exports = {
  postPortaoAction: checkSchema({
    codigo: {
      notEmpty: true,
      trim: true,
      errorMessage: 'Código é obrigatório'
    },
    disponivel: {
      notEmpty: true,
      isBoolean: true,
      errorMessage: 'Diponibilidade é obrigatória'
    }
  }),

  editPortaoAction: checkSchema({
    codigo: {
      optional: true,
      trim: true
    },
    disponivel: {
      optional: true,
      isBoolean: true
    }
  })
};