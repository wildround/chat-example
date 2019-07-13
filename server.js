const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 8080;
const sockets = {};

app.use(express.static("public"));

io.on("connection", socket => {
    console.log('Новый коннект');
    sockets[socket.id] = socket;   

    socket.on("chat message", data => {
        console.log(`User ${data.name} ${data.msg}`);
        // io.emit("chat message",`${data.name}: ${data.msg}`);
        io.emit("chat message", data);
    });    
    
    socket.on("disconnect", socket => {
        console.log("user disconnected");
    });
});

server.listen(port, () => console.log(`Server started on port ${port}`));