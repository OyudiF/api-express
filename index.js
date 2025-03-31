const customExpress = require('./config/customExpress');
const connection = require('./infraestrutura/connection');
const tables = require('./infraestrutura/tables');

connection.connect((erro) => {
    if(erro){
        console.log(erro);
    } else {
        console.log('conectado com sucesso');

        tables.init(connection);
        const app = customExpress();

        app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
    }
});

