const express = require('express');
const app = express();
const socketio = require('socket.io');
const PORT = 8001
//used to serve static files
app.use(express.static(__dirname + '/public'))
const expressServer = app.listen(PORT, () => console.log(`SocketIO server running on ${PORT}`));


const io = socketio(expressServer)

io.on('connection', (socket) => {
    console.log(socket.id, 'has connected');
    //socket.emit('messageFromServer', {data: 'welcome to the socket server'})
    socket.on('newMessageToServer', (dataFromClient) => {
        console.log('Data :', dataFromClient)
        io.emit('newMessageToClients', {text:dataFromClient.text})
    })
})
