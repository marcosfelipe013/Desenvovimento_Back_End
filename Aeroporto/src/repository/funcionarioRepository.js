const Funcionario = require('../model/funcionario');

module.exports = {
    findAllFuncionarios: async() =>{
        return await Funcionario.find()
    },
    findFuncionarioById: async(id) =>{
        return await Funcionario.findOne(id);
    },
    findFuncionarioByEmail: async(email) =>{
        return await Funcionario.findOne({email});
    },
    createFuncionario: async(data) =>{
        const newFuncionario = new Funcionario(data);

        return await newFuncionario.save();
    }
}