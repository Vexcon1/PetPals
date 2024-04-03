class Database {
  constructor() {
    this.data = {};
  }

  add(index, value) {
    print(index, value);
    this.data[index] = value;
  }

  method(index, value, value2) {
    socket.emit("methodServer", { key: index, args1: value, args2: value2 });
    print("sent");
  }

  get(index) {
    socket.emit("database", { key: "get", data: index });
    return this.data[index];
  }
}

const socket = io();
const db = new Database();

socket.emit("database", { key: "loadDB" });

socket.on("database", (key) => {
  if (key.key == "getA") {
    // print(key)
    db.add(key.index, key.sData);
  }
  if (key.key == "theDB") {
    //db.data = key.theDB
  }
  if (key.key == "users") {
    print(key);
    for (let i = 0; i < key.value.length; i++) {
      var server = {
        id: key.value[i].id,
        name: key.value[i].name,
        age: key.value[i].age,
        pet: key.value[i].pet,
        hobbies: key.value[i].hobbies,
        posts: [],
      };

      if (server.hobbies == undefined) {
        server.hobbies = [];
      }

      for (let x = 0; x < key.value[i].posts.length; x++) {
        console.log("postssssa", key.value[i].posts[x]);
        let post = new Post(
          key.value[i].id,
          key.value[i].posts[x].postId,
          key.value[i].posts[x].who,
          key.value[i].posts[x].words,
          key.value[i].posts[x].img,
          key.value[i].posts[x].likes,
        );
        post.set("likesUser", key.value[i].posts[x].likesUser)
        server.posts.push(post);
      }
      let person = new Person(
        server.id,
        server.name,
        server.age,
        server.pet,
        server.hobbies,
      );

      person.posts = server.posts;
      if (person != null && ui != null) {
        if (ui.get("thisPerson").name == person.name) {
          ui.set("thisPerson", person);
        }

        if (server.friends != null) {
          for (let i = 0; i < server.friends.length; i++) {
            let newFriend = peopleList.getPerson(server.friends[i]);
            person.addFriend(newFriend);
          }
        }

        peopleList.addPerson(person);
        peopleList.get("ids").push(server.id);
        //print(peopleList.get("link"))
      }
    }
    boop();
  }
});

socket.on("methodClient", (server) => {
  if (server.key == "createPerson") {
    let person = new Person(
      server.value.id,
      server.value.name,
      server.value.age,
      server.value.pet,
      server.value.hobbies,
      server.value.posts,
    );
    peopleList.addPerson(person);
    peopleList.get("ids").push(server.value.id);
    //print('new people',person,peopleList.ids)

    if (server.key == "fixFriends") {
      if (server.friends != null) {
        for (let i = 0; i < server.friends.length; i++) {
          let newFriend = peopleList.getPerson(server.friends[i]);
          person.addFriend(newFriend);
        }
      }
    }
  }
  if (server.key == "login") {
    let person = new Person(
      server.value.id,
      server.value.name,
      server.value.age,
      server.value.pet,
      server.value.hobbies,
      server.value.posts,
    );
    ui.runMethod("correctLogin", person);
    ui.set("thisPerson", person);
    peopleList.addPerson(person);
    peopleList.get("ids").push(server.value.id);
    //print('new people',person,peopleList.ids)
  }
  if (server.key == "signupSuccess") {
    let person = new Person(
      server.value.id,
      server.value.name,
      server.value.age,
      server.value.pet,
      server.value.hobbies,
      server.value.posts,
    );
    ui.runMethod("correctSignup", person);
    ui.set("thisPerson", person);
    peopleList.addPerson(person);
    peopleList.ids.push(server.value.id);
    //print('new people',person,peopleList.ids)
  }
  if (server.key == "signupFail") {
    ui.runMethod("signupFail");
  }
  if (server.key == "loginFail") {
    ui.runMethod("loginFail");
  }
});
