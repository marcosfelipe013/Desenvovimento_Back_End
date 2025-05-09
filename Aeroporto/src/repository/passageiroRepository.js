const Passageiro = require('../model/passageiro');

module.exports = {
    findAllPassageiros: async() =>{
        return await Passageiro.find();
    },
    findPassageiroByCpf: async(cpf) =>{
        return await Passageiro.findOne({cpf});
    },
    findPassageiroById: async(id) =>{
        return await Passageiro.findById(id);
    },
    createPassageiro: async(data) =>{
        const newPassageiro = new Passageiro(data);

        return await newPassageiro.save();
    },
    editPassageiroById: async(id, data) =>{
        return await Passageiro.findByIdAndUpdate(id, {$set:data}, {new:true});
    },
    deletePassageiroById: async(id) =>{
        return await Passageiro.findByIdAndDelete(id);
    }
}