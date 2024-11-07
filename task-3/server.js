const express  = require('express');
const app = express();
const http = require('http');
const expressServer = http.createServer(app);

const {Server} = require('socket.io');
const io = new Server(expressServer);

const users = {};
const userRooms = {};

// Serve static files from "public" folder
app.use(express.static("public"));


io.on("connection", (socket) => {

    socket.on("userName", (userName) => {
        console.log(`${userName} has connected, Socket ID: ${socket.id}`);
        users[socket.id] = userName;
        userRooms[socket.id] = [];
    });

    // Join a specific room
    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        const userName = users[socket.id];
        userRooms[socket.id].push(roomId);

        // Notify others when new user has joined
        socket.to(roomId).emit("message", { userName: "System", message: `${userName} has joined the room.` });
    });

    // Handle messages sent to room
    socket.on("message", ({ roomId, message }) => {
        const userName = users[socket.id];
        io.to(roomId).emit("message", { userName, message });
    });


    socket.on("disconnect", () => {
        const userName = users[socket.id];
        const rooms = userRooms[socket.id] || [];

        // Notify each room when user left
        rooms.forEach((roomId) => {
            socket.to(roomId).emit("message", { userName: "System", message: `${userName} has left the room.` });
        });

        // Cleanup
        delete users[socket.id];
        delete userRooms[socket.id];
        
        console.log(`${userName} has disconnected`);
    });

});

const PORT = process.env.PORT || 3000;
expressServer.listen(PORT, () => {
    console.log(`Server running on port @ ${PORT}`);
});
