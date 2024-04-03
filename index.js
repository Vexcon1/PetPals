const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const StormDB = require("stormdb");
const userClass = require("./userClass.js");

// start db with "./db.stormdb" storage location
const engine = new StormDB.localFileEngine("./db.stormdb");
const db = new StormDB(engine);

const port = process.env.PORT || 3000;

// set default db value if db is empty
db.default({ users: [], accounts: [], ID_Index: 0 });

app.use(express.static("public"));

// link list go again

function findIndex(array, element) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === element) {
      return i; // Return the index if element is found
    }
  }
  return -1; // Return -1 if element is not found
}

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

    console.log(payload, key == "login");

    if (key == "increase") {
      var ind = db.get(`${data}`).value();
      db.set(`${data}`, ind + 1).save();
    }
    if (key == "createPerson") {
      var ind = db.get(`ID_Index`).value();
      var isAble = true;

      if (args2 != null) {
        let userListA = db.get(`accounts`).value();
        for (let i = 0; i < userListA.length; i++) {
          if (userListA[i].username == args2[0]) {
            isAble = false;
            socket.emit("methodClient", { key: "signupFail" });
            break;
          }
        }
      }

      if (isAble == true) {
        var newUser = new userClass(
          ind,
          args1[1],
          args1[2],
          args1[3],
          args1[4],
        );

        args1[0] = ind;

        db.set(`ID_Index`, ind + 1).save();

        console.log(db.get(`users`).value().length);

        db.get(`users`).push(newUser).save();

        console.log(db.get(`users`).value().length);

        console.log(
          db.get(`users`).value()[db.get(`users`).value().length - 1],
        );

        if (args2 != null) {
          db.get(`accounts`)
            .push({
              id: ind,
              username: args2[0],
              password: args2[1],
              index: db.get(`users`).value().length - 1,
            })
            .save();
          socket.emit("methodClient", { key: "signupSuccess", value: newUser });
        } else {
          socket.emit("methodClient", { key: "createPerson", value: newUser });
        }
      }
    }

    if (key == "createPost") {
      let userList = db.get(`users`).value();
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == args1[0]) {
          var newPost = {
            id: args1[0],
            postId: args1[1],
            who: args1[2],
            words: args1[3],
            img: args1[4],
            likes: args1[5],
            likesUser: [],
          };

          db.get(`users`).get(i).get(`posts`).push(newPost).save();
          break;
        }
      }
    }

    if (key == "likePost") {
      let userList = db.get(`users`).value();
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == args1[1]) {
          let thePosts = db.get(`users`).get(i).get(`posts`).value();
          for (let x = 0; x < thePosts.length; x++) {
            if (
              db.get(`users`).get(i).get(`posts`).get(x).value().postId ==
              args1[2]
            ) {
              console.log("yep");
              var theyPost = db.get(`users`).get(i).get(`posts`).get(x);
              theyPost.set("likes", theyPost.get("likes").value() + 1).save();
              theyPost.get("likesUser").push(args1[0]).save();
              console.log(theyPost);
            }
          }
        }
      }
    }

    if (key == "unlikePost") {
      let userList = db.get(`users`).value();
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == args1[1]) {
          let thePosts = db.get(`users`).get(i).get(`posts`).value();
          for (let x = 0; x < thePosts.length; x++) {
            if (
              db.get(`users`).get(i).get(`posts`).get(x).value().postId ==
              args1[2]
            ) {
              console.log("yep");
              var theyPost = db.get(`users`).get(i).get(`posts`).get(x);
              theyPost.set("likes", theyPost.get("likes").value() - 1).save();
              var daelete = findIndex(args1[0]);
              theyPost.get("likesUser").get(daelete).delete(true);
              console.log(theyPost);
            }
          }
        }
      }
    }

    if (key == "addFriend") {
      let userList = db.get(`users`).value();
      let user1 = null;
      let user2 = null;
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == args1[0]) {
          user1 = userList[i];
        }
        if (userList[i].id == args1[1]) {
          user2 = userList[i];
        }
      }

      console.log(user1, user2);

      if (user1 != undefined && user2 != undefined) {
        user1.friends.push(user2.id);
      }

      socket.emit("methodClient", {
        key: "fixFriends",
        friends: user1.friends,
      });
    }

    if (key == "login") {
      let username = args1[0];
      let password = args1[1];

      let foundAccount = false;

      let userList = db.get(`accounts`).value();

      for (let i = 0; i < userList.length; i++) {
        if (userList[i].username == username) {
          if (userList[i].password == password) {
            let user = db.get(`users`).value()[userList[i].index];
            socket.emit("methodClient", { key: "login", value: user });
            foundAccount = true;
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
