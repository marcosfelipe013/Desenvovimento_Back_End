const Passageiro = require('../model/passageiro');

module.exports = {
    findAllPassageiros: async() =>{
        return await Passageiro.find();
    },
    findPassageiroById: async(id) =>{
        return await Passageiro.findById(id);
    },
    findPassageiroByCpf: async(cpf) =>{
        return await Passageiro.findOne({cpf});
    },
    findAllPassageiosByVoo: async(vooId) =>{
        return await Passageiro.find({vooId});
    },
    findAllPassageirosByNomeAndStatusCheckIn: async() =>{
        return await Passageiro.find({}, 'nome statusCheckIn');
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