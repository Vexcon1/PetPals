const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const StormDB = require("stormdb");
var serverClass = require("./serverClass.js")
var userClass = require("./userClass.js")

// start db with "./db.stormdb" storage location
const engine = new StormDB.localFileEngine("./db.stormdb");
const db = new StormDB(engine);

const port = process.env.PORT || 3000;

// set default db value if db is empty
db.default({  userList: serverClass, users: [], accounts: [], ID_Index: 0 });

app.use(express.static("public"));

if (db.get(`ID_Index`).value() >= 1) {
  serverClass = db.get(`userList`).value()
}

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

    console.log(payload,(key == "login"))

    if (key == "increase") {
      var ind = db.get(`${data}`).value();
      db.set(`${data}`, ind + 1).save();
    }
    if (key == "createPerson") {
      var ind = db.get(`ID_Index`).value();
      var isAble = true

       if (args2 != null) {
      let userListA = db.get(`accounts`).value();
      for (let i=0; i<userListA.length; i++) {
        console.log(userListA[i].username, args2[0])
        if (userListA[i].username == args2[0]) {
          isAble = false
            socket.emit("methodClient", { key: "signupFail" });
          break;
          }
        }
      }


    if (isAble == true) {


      args1[0] = ind;

      var newUser = new userClass(ind,args1[1],args1[2],args1[3],args1[4])

      var serial = newUser

      serverClass.addPerson(serial)

      db.set(`ID_Index`, ind + 1).save();

      db.get(`users`).push(newUser).save();

      if (args2 != null) {
        db.get(`accounts`).push({
          id: ind,
          username: args2[0],
          password: args2[1],
          link: newUser
        }).save()
        socket.emit("methodClient", { key: "signupSuccess", value: newUser });
      } else {

      socket.emit("methodClient", { key: "createPerson", value: newUser });

        db.set(`userList`, serverClass).save()
      }
    }
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

    if (key == "addFriend") {

      var newUser = new   userClass(ind,args1[1],args1[2],args1[3],args1[4])

      let user1 = serverClass.getPerson(args1[0])
      let user2 = serverClass.getPerson(args1[1])

      console.log(user1,user2,serverClass.link)

      if (user1 != undefined && user2 != undefined) {
      user1.addFriend(user2);
      }
    }

    if (key == "login") {
      let username = args1[0]
      let password = args1[1]

      let foundAccount = false

      let userList = db.get(`accounts`).value()

      for (let i=0; i<userList.length; i++) {
        console.log(userList[i].username, username, userList[i].password, password)
        if (userList[i].username == username) {
          if (userList[i].password == password) {
            let user = userList[i].link
            socket.emit("methodClient", { key: "login", value: user });
            foundAccount = true
            break;
          }
        }
      }
      if (foundAccount == false) {
        socket.emit("methodClient", { key: "loginFail" });
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
