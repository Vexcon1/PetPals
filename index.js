const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const StormDB = require("stormdb");

// start db with "./db.stormdb" storage location
const engine = new StormDB.localFileEngine("./db.stormdb");
const db = new StormDB(engine);

const port = process.env.PORT || 3000;

// set default db value if db is empty
db.default({ users: [] });

app.use(express.static('public'));



io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('mouse', (data) => {
    socket.broadcast.emit('mouse', data);
  });

  socket.on('database', (payload) => {
    var { key, data, value } = payload;
    console.log(payload);
    console.log(key, data, value);
    if (key == "set") {
      db.set(`${data}`, value).save();
    }
    if (key == "get") {
      console.log('hello')
      var theData = db.get(`${data}`).value();
      socket.emit('database', { key: 'getA', index: data, sData: theData });
    }
    if (key == "loadDB") {
      socket.emit('database', { key: 'theDB', theDB: db.state });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
http.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
