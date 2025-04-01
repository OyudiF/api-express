const moment = require('moment');
const connection = require('../infraestrutura/connection');

class Atendimento {
    adiciona(atendimento) {
        const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        const atendimentoDatado = {...atendimento, data_criacao, data};
        
        const sql = 'INSERT INTO Atendimentos SET ?';

        connection.query(sql, atendimentoDatado, (erro, resultados) => {
            if(erro){
                console.log(erro);
            } else{
                console.log(resultados);
            }
        });
    }
}

module.exports = new Atendimento;