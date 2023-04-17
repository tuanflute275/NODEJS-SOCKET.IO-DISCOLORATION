const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var port = process.env.PORT || 3000

app.use(express.static("public"))
app.set('view engine', 'ejs')
app.set('views', 'views')
app.get('/', (req, res) => {
    res.render('index.ejs')
})

io.on("connection", (socket) => {
    console.log(socket.id + ':' + 'đã kết nối');

    socket.on("disconnect", () => {
        console.log(socket.id + ':' + 'ngắt kết nối');
    })
    socket.on('client-send-text', (data)=>{
        console.log(data);
        io.sockets.emit('server-send-text',data)
    })
    socket.on('client-send-color',(data)=>{
        console.log('color:', data);
        io.sockets.emit('server-send-color', data)
    })
})
server.listen(port, () => {
    console.log(`web run with link: http://localhost:${port}`);
});
