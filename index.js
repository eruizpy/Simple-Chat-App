// packages
const express = require('express');
let io = require('socket.io');

// setup our port
const port = 3000;

// setup express app
const app = express({ static: true });
app.use('/', express.static('public'));

// listen on our port
const server = app.listen(port);

// setup sockets
io = io(server);

// on a connecton
io.on('connection', (socket) => {

  // on every message sent
  socket.on('message', (data) => {

    // set up new data
    /* 
      we don't just emit data directly,
      to make sure that there is only 
      a message in the new object, and
      nothing else. More stuff can be 
      added here if you want to send
      more than just messages
    */
    const newData = {
      message: data.message,
    };

    // emit the message to everyone but the client
    socket.broadcast.emit('message', newData);

    return { status: 'success' };
  });
});

// serve index.html
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});