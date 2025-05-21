const Voo = require('../model/voo');

module.exports = {
    findAllVoos: async() =>{
        return await Voo.find();
    },
    findVooByNmrVoo: async(nmrVoo) =>{
        return await Voo.findOne({nmrVoo})
    },
    findVooById: async(id) =>{
        return await Voo.findById(id);
    },
    findAllVoosByDia: async(inicio, fim) =>{
        return await Voo.find({
            dataHrPartida: {
                $gte: inicio,
                $lte: fim
            },
            status: 'programado'
        });
    },
    createVoo: async(data) =>{
        const newVoo = new Voo(data);
        return await newVoo.save();
    },
    editVooById: async(id, data) =>{
        return await Voo.findByIdAndUpdate(id, {$set:data}, {new:true});
    },
    deleteVooById: async(id) =>{
        return await Voo.findByIdAndDelete(id);
    }
}