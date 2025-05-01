const mongoose = require ('mongoose');
const express = require ('express');
const cors = require ('cors');
require('dotenv').config({path:'.env'});

const apiRouters = require('./routers.js');

mongoose.connect(process.env.DATABASE);
mongoose.Promisse = global.Promisse;
mongoose.connection.on('error', (error) =>{
    console.error("ERRO"+ error.menssage);
});

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use("/", apiRouters);

const servico = server.listen(process.env.PORT, () =>{
    console.log("Servidor rodando na porta " + servico.address().port);
});