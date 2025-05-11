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
    getAllPassageirosByVoo: async(vooId) => {
        const vooCheck = await vooRepository.findVooById(vooId);

        if (!vooCheck) {
            throw new Error('Voo não encontrado!')
        }
        
        const passageiros = await passageiroRepository.findAllPassageiosByVoo(vooId)

        if(!passageiros || passageiros.length === 0){
            throw new Error('Nenhum passageiro encontrado para este voo')
        }
        return passageiros;
    },
    getAllPassageirosByNomeAndStatusCheckIn: async() =>{
        const passageiros = await passageiroRepository.findAllPassageirosByNomeAndStatusCheckIn();

        if(!passageiros || passageiros.length === 0) {
            throw new Error('Nenhum passageiro encontrado!')
        }

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

        if(voo.status == 'concluido') {
            throw new Error('Voo já concluido, não podendo mais adicionar usuários a este voo!')
        }

        const passageiroData = {
            nome: data.nome,
            cpf: data.cpf,
            vooId: data.vooId,
            statusCheckIn: data.statusCheckIn
        }

        return await passageiroRepository.createPassageiro(passageiroData);
    },
    putPassageiro: async(id, data) =>{
        const updates = {};


        if (data.nome) {
            updates.nome = data.nome;
        }

        if (data.cpf) {
            const cpfCheck = await passageiroRepository.findPassageiroByCpf(data.cpf);

            if (cpfCheck && cpfCheck._id.toString() !== id){
                throw new Error('Passageiro já cadastrado!')
            }
            
            const cpfValidator = validarCPF(data.cpf);

            if (!cpfValidator) {
                throw new Error('CPF inválido!')
            }
            
            updates.cpf = data.cpf;
        }
        
        if (data.vooId) {
            const vooCheck = await vooRepository.findVooById(data.vooId);

            if (!vooCheck) {
                throw new Error('Voo não encontrado!')
            }

            updates.vooId = data.vooId;
        }

        if (data.statusCheckIn) {
            if (data.statusCheckIn == 'realizado') {
                let voo;

                if (!data.vooId) {
                    const passageiro = await passageiroRepository.findPassageiroById(id);
                    
                    if (!passageiro) {
                        throw new Error('Passageiro não encontrado!')
                    }

                    voo = await vooRepository.findVooById(passageiro.vooId);
                } else {
                    voo = await vooRepository.findVooById(data.vooId);
                }

                if (!voo) {
                    throw new Error('Voo não encontrado!');
                }

                if (voo.status !== 'embarque'){
                    throw new Error('Voo tem que estar com o Status de Embarque!');
                }
            }
            
            updates.statusCheckIn = data.statusCheckIn;
        }

        return await passageiroRepository.editPassageiroById(id, updates);
    },
    deletePassageiro: async(id) =>{
        const passageiro = await passageiroRepository.findPassageiroById(id);

        if (!passageiro){
            throw new Error('Passageiro não encontrado!')
        }

        return await passageiroRepository.deletePassageiroById(id);
    }
}