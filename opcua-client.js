// opcua-client.js
const opcua = require('node-opcua');

const client = opcua.OPCUAClient.create({
    endpointMustExist: false,
    securityMode: opcua.MessageSecurityMode.None,
    securityPolicy: opcua.SecurityPolicy.None,
    serverCertificateRejected: true, // Add this to accept untrusted certificates
});


async function connectToServer(endpointUrl) {
    await client.connect(endpointUrl);
    console.log('Connected to OPC UA Server');
    const session = await client.createSession();
    console.log('Session created');
    return session;
}

async function readData(session, nodeId) {
    const dataValue = await session.read({
        nodeId,
        attributeId: opcua.AttributeIds.Value
    });
    return dataValue.value.value;
}

async function disconnect(session) {
    await session.close();
    await client.disconnect();
    console.log('Disconnected from OPC UA Server');
}

module.exports = { connectToServer, readData, disconnect };