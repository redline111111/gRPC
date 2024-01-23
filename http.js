const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    try {
        const userData = req.body;

        const response = await axios.post('http://localhost:3001/register', userData);

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Ошибка при запросе к микросервису регистрации:', error.message);
        res.status(500).send('Ошибка на сервере');
    }
});

app.listen(port, () => {
    console.log(`Основной сервер запущен на порту ${port}`);
});