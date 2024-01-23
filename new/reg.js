const express = require('express');
const bodyParser = require('body-parser');
const { registerWithoutDescript } = require('../auth.module');
const { sequelize } = require('../db/sequelize/sequelize');
require('dotenv').config()

const app = express();
const port = 3001;
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const response = await registerWithoutDescript(req.body);
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({message: error});
    }
    
});

// Запуск сервера
app.listen(port, () => {
    sequelize.authenticate();
    sequelize.sync({force: true})
    console.log('Соединение с базой данных установлено');
    console.log(`REST API сервер запущен на порту ${port}`);
});