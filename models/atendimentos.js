const moment = require('moment');
const connection = require('../infraestrutura/connection');

class Atendimento {
    adiciona(atendimento, res) {
        const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        
        const dataValida = moment(data).isSameOrAfter(data_criacao);
        const clienteValido = atendimento.cliente.length >= 3;

        const validacoes = [
            {
                nome: data,
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: cliente,
                valido: clienteValido,
                mensagem: 'Cliente deve ter pelo menos tres caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const errosExist = erros.length;

        if(errosExist){
            res.status(400).json(erros);
        } else {    
            const atendimentoDatado = {...atendimento, data_criacao, data};

            const sql = 'INSERT INTO Atendimentos SET ?';

            connection.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro);
                } else{
                    res.status(201).json(resultados);
                }
            });
        }
    }
}

module.exports = new Atendimento;