const mongoose = require('mongoose');
const passageiroRepository = require('../repository/passageiroRepository')
const vooRepository = require('../repository/vooRepository');

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
  
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
  
    let primeiroDigito = 11 - (soma % 11);
    if (primeiroDigito > 9) primeiroDigito = 0;
    if (primeiroDigito !== parseInt(cpf.charAt(9))) return false;
  
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
  
    let segundoDigito = 11 - (soma % 11);
    if (segundoDigito > 9) segundoDigito = 0;
    if (segundoDigito !== parseInt(cpf.charAt(10))) return false;
  
    return true;
}

module.exports = {
    getAllPassageiros: async() =>{
        const passageiros = await passageiroRepository.findAllPassageiros();

        return passageiros;
    },
    createPassageiro: async(data) =>{
        const cpfCheck = await passageiroRepository.findPassageiroByCpf(data.cpf);

        if (cpfCheck){
            throw new Error('Passageiro já cadastrado!')
        }

        const cpfValidator = validarCPF(data.cpf);

        if (!cpfValidator) {
            throw new Error('CPF inválido!')
        }

        const voo = await vooRepository.findVooById(data.vooId);
        if (!voo){
            throw new Error('Voo não encontrado!')
        }
        if (voo.status !== 'Embarque'){
            throw new Error('Voo não está em embarque!')
        }

        const passageiroData = {
            nome: data.nome,
            cpf: data.cpf,
            vooId: data.vooId,
            statusCheckIn: 'pendente'
        }

        return await passageiroRepository.createPassageiro(passageiroData);
    },
    putPassageiro: async(id, data) =>{
        const updates = {};

        if (data.nome) updates.nome = data.nome;

        const cpfCheck = await passageiroRepository.findPassageiroByCpf(data.cpf);

        if (cpfCheck && cpfCheck._id.toString() !== id){
            throw new Error('Passageiro já cadastrado!')
        }

        const cpfValidator = validarCPF(data.cpf);

        if (!cpfValidator) {
            throw new Error('CPF inválido!')
        }

        if (data.cpf) {
            updates.cpf = data.cpf;
        } 
        if (data.vooId) {
            updates.vooId = data.vooId;
        }

        if (data.statusCheckIn) {
            if (data.statusCheckIn !== 'realizado') {
              throw new Error('StatusCheckIn só pode ser "realizado" na edição');
            }
            updates.statusCheckIn = data.statusCheckIn;
          }

        return await passageiroRepository.deletePassageiroById(id, updates);
    },
    deletePassageiro: async(id) =>{
        const passageiro = await passageiroRepository.findPassageiroById(id);

        if (!passageiro){
            throw new Error('Passageiro não encontrado!')
        }

        return await passageiroRepository.deletePassageiroById(id);
    }
}