module.exports = app => {
    app.get("/atendimentos", (req, res) => res.send("Servidor funcionando, tudo ok!"));

    app.post('/atendimentos', (req, res) => {
        console.log(req.body);
        res.send('Você esta na rota de atendimento e está realizando um POST')
    
    });
}