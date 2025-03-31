const express = require('express'); // Chama o express para usar como servidor
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = () => {
    const app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    consign()
        .include('controllers')
        .into(app);

    return app;
}

