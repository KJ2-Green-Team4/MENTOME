const path = require('path');
const http = require('http');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Get Request Body To Json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Permit Access Rights
app.use(express.static(path.join(__dirname, '../frontend/main/build')));
app.use(express.static(path.join(__dirname, '../frontend/meeting')));

// Import Controller
const socketController = require('./controllers/socket');

// Import Routers
const accountRouter = require('./routes/account');
const contentRouter = require('./routes/content');
const noticeRouter = require('./routes/notice');
const s3Router = require('./routes/s3');

// Socket function
socketController.socketManagement(io);

// Activate Routers
app.use(accountRouter);
app.use(contentRouter);
app.use(noticeRouter);
app.use(s3Router);

// Router for meeting page
app.get('/meeting', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/meeting/index.html'));
});

// Router for main page
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/main/build/index.html'));
});

// Connecting MongoDB
mongoose.connect(process.env.CONNECTION_URL_FOR_MONGODB)
  .then(result => {
    console.log('Connected MongoDB!');
  });

// Running Server
server.listen(process.env.PORT, () => {
  console.log('Server is now running!');
});
