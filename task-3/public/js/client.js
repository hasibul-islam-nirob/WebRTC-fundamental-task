const socket = io();

const userName = prompt("Enter your name:");
socket.emit("userName", userName);
const roomId = prompt("Enter Room ID to join:");
socket.emit("joinRoom", roomId);

// Handle receiving messages
socket.on("message", ({ userName, message }) => {
    displayMessage(userName ? `${userName}: ${message}` : message);
});

// Send message to the server
document.getElementById("sendButton").onclick = () => {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;
    if (message) {
        socket.emit("message", { roomId, message });
        messageInput.value = "";
    }
};

// Display messages in chat window
function displayMessage(message) {
    const messages = document.getElementById("messages");
    const messageElement = document.createElement("li");
    messageElement.classList.add("list-group-item");
    messageElement.innerText = message;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
}
