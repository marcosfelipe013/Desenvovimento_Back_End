const funcionarioRepository = require('../repository/funcionarioRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
    createFuncionario: async(data) =>{
        const emailCheck = await funcionarioRepository.findFuncionarioByEmail(data.email);

        if(emailCheck){
            throw new Error('Funcionário já cadastrado!')
        }

        const funcionarioData = {
            nome: data.nome,
            email: data.email,
            senha: await bcrypt.hash(data.senha, 10),
            cargo: data.cargo
        }

        return funcionarioRepository.createFuncionario(funcionarioData);
    },
    loginFuncionario: async(data) =>{
        const funcionario = await funcionarioRepository.findFuncionarioByEmail(data.email);

        if(!funcionario){
            throw new Error('Funcionário não encontrado!')
        }

        const passwordCheck = await bcrypt.compare(data.senha, funcionario.senha);

        if(!passwordCheck){
            throw new Error('Senha incorreta!')
        }
        
        const token = jwt.sign(
            {
                id: funcionario._id,
                nome: funcionario.nome,
                cargo: funcionario.cargo
            }, 
                SECRET_KEY,
                { 
                    expiresIn: '1h'
                }
        );

        return { funcionario, token };
    }
}