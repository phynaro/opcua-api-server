// server.js
const express = require('express');
const { connectToServer, readData, disconnect } = require('./opcua-client');

const app = express();
const port = 3000;

const OPCUA_SERVER_ENDPOINT = 'opc.tcp://192.168.70.61:59100';
const NODE_ID = 'ns=7;g=511f4e7b-a8b9-caf4-d39d-3e8471e2f8f7';

app.get('/api/data', async(req, res) => {
    try {
        const session = await connectToServer(OPCUA_SERVER_ENDPOINT);
        const data = await readData(session, NODE_ID);
        await disconnect(session);
        res.json({ data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to read data from OPC UA Server' });
    }
});

app.listen(port, () => {
    console.log(`API server is running on http://localhost:${port}`);
});