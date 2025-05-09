const voo = require('../model/voo');

module.exports = {
    findAllVoos: async() =>{
        return await voo.find();
    },
    findVooById: async(id) =>{
        return await voo.findById(id);
    },
    createVoo: async(data) =>{
        const newVoo = new voo(data);
        return await newVoo.save();
    },
    editVooById: async(id, data) =>{
        return await voo.findByIdAndUpdate(id, {$set:data}, {new:true});
    },
    deleteVooById: async(id) =>{
        return await voo.findByIdAndDelete(id);
    }
}