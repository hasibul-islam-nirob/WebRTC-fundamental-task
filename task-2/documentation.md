## Task 2: Build a signaling server using Node.js and Socket.io for managing peer connection signaling between two users.


#### Setup

1. **Clone the repository** (if in version control) or create the project directory.
2. **Install dependencies**:
```bash
npm install express socket.io
```
3. **Run the server**:
```bash
node server.js
```
4. The server will run on **`http://localhost:4000`** by default.


#### Usage

1. **General Broadcast**: Users accessing the main page will see a message broadcasted to all users in the default namespace.
2. **Admin Room**: Users accessing `/admin` will see an admin-specific message.
3. **User Room**: Users accessing `/user` will see a user-specific message.