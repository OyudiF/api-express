class Tables {
    init(connection){
        this.connection = connection;

        this.criarAtendimento();
    }

    criarAtendimento() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, data_criacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))';
        
        this.connection.query(sql, (erro) => {
            if(erro) {
                console.log(erro);
            } else {
                console.log('Tabela Atendimentos criada com sucesso');
            }
        });
    }
}

module.exports = new Tables;