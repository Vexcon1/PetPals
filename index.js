const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const StormDB = require("stormdb");
const serverClass = require("./serverClass.js")
const userClass = require("./userClass.js")

// start db with "./db.stormdb" storage location
const engine = new StormDB.localFileEngine("./db.stormdb");
const db = new StormDB(engine);

const port = process.env.PORT || 3000;

// set default db value if db is empty
db.default({  userList: serverClass, users: [], accounts: [], ID_Index: 0 });

app.use(express.static("public"));

const newUserA = new userClass(1, "A", 20, "dog", ["swimming", "running", "coding"])

// link list go again

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("mouse", (data) => {
    socket.broadcast.emit("mouse", data);
  });

  socket.on("database", async (payload) => {
    var { key, data, value } = payload;
   // console.log(payload);
   // console.log(key, data, value);
    if (key == "set") {
      db.set(`${data}`, value).save();
    }
    if (key == "get") {
      console.log("hello");
      var theData = db.get(`${data}`).value();
      await socket.emit("database", {
        key: "getA",
        index: data,
        sData: theData,
      });
    }
    if (key == "loadDB") {
      socket.emit("database", { key: "theDB", theDB: db.state });
      socket.emit("database", { key: "users", value: db.get("users").value() });
    }
  });

  socket.on("methodServer", async (payload) => {
    var { key, args1, args2 } = payload;

    console.log(payload)

    if (key == "increase") {
      var ind = db.get(`${data}`).value();
      db.set(`${data}`, ind + 1).save();
    }
    if (key == "createPerson") {
      var ind = db.get(`ID_Index`).value();

      args1[0] = ind;
      
      var newUser = new userClass(args1[0],args1[1],args1[2],args1[3],args1[4])



      serverClass.addPerson(newUser)

      db.set(`ID_Index`, ind + 1).save();

      db.get(`users`).push(newUser).save();

      if (args2 != null) {
        db.get(`accounts`).push({
          id: args1[0],
          username: args2[0],
          password: args2[1],
          link: newUser
        }).save()
      }

      socket.emit("methodClient", { key: "createPerson", value: newUser });
    }

    if (key == "createPost") {
      let userList = db.get(`users`).value();
      for (let i = 0; i < userList.length; i++) {
        console.log(args1[0], userList[i].id);
        if (userList[i].id == args1[0]) {
          var newPost = {
            id: args1[0],
            who: args1[1],
            words: args1[2],
            img: args1[3],
            likes: args1[4],
          };

          db.get(`users`).get(i).get(`posts`).push(newPost).save();
          console.log("push", userList[i].posts);
          break;
        }
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
http.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
