const express = require('express');
const bodyParser = require('body-parser');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const app = express();


const packageDefinition = protoLoader.loadSync('user_registration.proto', {
    keepCase: true,
});
const userRegistrationProto = grpc.loadPackageDefinition(packageDefinition).registration;

const grpcClient = new userRegistrationProto.UserRegistration('localhost:50051', grpc.credentials.createInsecure());

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const userData = req.body;

    grpcClient.registerUser({
        first_name: userData.first_name,
        phone: userData.phone,
        second_name: userData.second_name,
        last_name: userData.last_name,
        description: userData.description,
        login: userData.login,
        hash: userData.hash,
        cases: userData.cases
    }, (error, response) => {
        if (error) return res.status(500).send(error);
        res.status(200).send(response);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`REST API server running on port ${PORT}`);
});