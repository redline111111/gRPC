require('dotenv').config()

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { registerWithoutDescript } = require('./auth.module');
const { sequelize } = require('./db/sequelize/sequelize');

const packageDefinition = protoLoader.loadSync('user_registration.proto', {
    keepCase: true,
});
const userRegistrationProto = grpc.loadPackageDefinition(packageDefinition).registration;

async function registerUser(call, callback) {
    try {
        const response = await registerWithoutDescript(call.request);
        callback(null, response);
    } catch (error) {
        callback(error);
    }
}
const server = new grpc.Server();
server.addService(userRegistrationProto.UserRegistration.service, { registerUser: registerUser });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    sequelize.authenticate();
    sequelize.sync({force: true})
    console.log('Соединение с базой данных установлено');

    server.start();
    console.log('gRPC server running on port 50051');
});
