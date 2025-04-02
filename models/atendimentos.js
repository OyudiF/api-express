const moment = require('moment');
const connection = require('../infraestrutura/connection');
const atendimentos = require('../controllers/atendimentos');

class Atendimento {
    adiciona(atendimento, res) {
        const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        
        const dataValida = moment(data).isSameOrAfter(data_criacao);
        const clienteValido = atendimento.cliente.length >= 3;

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
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
                    res.status(201).json(atendimento);
                }
            });
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos';

        connection.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

        connection.query(sql, (erro, resultados) => {
            const atendimento = resultados[0];
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(atendimento);
            }
        })
    }

    alterar(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

        connection.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({...valores, id});
            }
        })
    }

    deletar(id, res) {
        const sql = "DELETE FROM Atendimentos WHERE id=?";

        connection.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new Atendimento;