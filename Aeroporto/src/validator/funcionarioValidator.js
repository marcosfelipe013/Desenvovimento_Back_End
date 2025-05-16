const { checkSchema } = require('express-validator');

module.exports = {
  postFuncionarioAction: checkSchema({
    nome: {
      notEmpty: true,
      trim: true,
      isLength: {
        options: { min: 2 }
      },
      errorMessage: "Nome precisa de pelo menos 2 caracteres"
    },
    email: {
      notEmpty: true,
      isEmail: true,
      errorMessage: 'Email inválido'
    },
    senha: {
      notEmpty: true,
      isLength: {
        options: { min: 6 }
      },
      errorMessage: 'Senha deve ter pelo menos 6 caracteres'
    },
    cargo: {
      notEmpty: true,
      errorMessage: 'Cargo é obrigatório'
    }
  }),
  editFuncionarioAction: checkSchema({
    nome: {
      optional: true,
      trim: true,
      isLength: {
        options: { min: 2 }
      },
      errorMessage: "Nome precisa de pelo menos 2 caracteres"
    },
    email: {
        optional: true,
        isEmail: true,
        errorMessage: 'Email inválido'
    },
    senha: {
        optional: true,
        isLength: {
            options: { min: 6 }
        },
        errorMessage: 'Senha deve ter pelo menos 6 caracteres'
    },
    cargo: {
        optional: true
    }
  }),
  loginFuncionarioAction: checkSchema({
    email: {
      notEmpty: true,
      isEmail: true,
      errorMessage: 'Email inválido'
    },
    senha: {
      notEmpty: true,
      isLength: {
        options: { min: 6 }
      },
      errorMessage: 'Senha deve ter pelo menos 6 caracteres'
    }
  })
};
