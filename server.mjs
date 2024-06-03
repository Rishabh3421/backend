import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.mjs';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http'; // Import createServer for creating the HTTP server

dotenv.config();

console.log('Server starting...');

const app = express(); // Initialize app before creating server

const server = createServer(app); // Create HTTP server with the app

const io = new Server(server, { // Initialize Socket.IO with the HTTP server
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use('/api/users', userRoutes);

server.listen(port, () => { 
  console.log(`Server is running on port ${port}`);
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
