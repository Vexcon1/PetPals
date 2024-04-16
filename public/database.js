// DB Class to send methods to server
class Database {
  constructor() {
    this.data = {};
  }
  
  method(index, value, value2) {
    print(index,value,value2)
    socket.emit("methodServer", { key: index, args1: value, args2: value2 });
  }

  setup() {

    socket.on("database", (key) => {
      // Grab all information given from server and recreate link list
      ui.set("page","buffer")
      if (key.key == "users") {
        for (let i = 0; i < key.value.length; i++) {
          if (peopleList != null && peopleList.get("ids") != null && peopleList.get("ids").includes(key.value[i].id) != true) {

          var server = {
            id: key.value[i].id,
            name: key.value[i].name,
            age: key.value[i].age,
            pet: key.value[i].pet,
            hobbies: key.value[i].hobbies,
            friends: key.value[i].friends,
            posts: [],
          }; // new person

          if (server.hobbies == undefined) {
            server.hobbies = [];
          }

          // load all user posts
          for (let x = 0; x < key.value[i].posts.length; x++) {
            let post = new Post(
              key.value[i].id,
              key.value[i].posts[x].postId,
              key.value[i].posts[x].who,
              key.value[i].posts[x].words,
              key.value[i].posts[x].img,
              key.value[i].posts[x].likes,
            );
            post.set("likesUser", key.value[i].posts[x].likesUser);
            server.posts.push(post);
          }

          // create new person class
          let person = new Person(
            server.id,
            server.name,
            server.age,
            server.pet,
            server.hobbies,
          );
          person.posts = server.posts;


          // create friends to person
          if (server.friends != null) {
            for (let i = 0; i < server.friends.length; i++) {
              let newFriend = peopleList.getPerson(server.friends[i]);
              if (newFriend == null) {
              person.friendsID.push(server.friends[i])
              } else {
              person.addFriend(newFriend);
              }
            }
          }

          if (person != null && ui != null) {
            if (ui.get("thisPerson").name == person.name) {
              ui.set("thisPerson", person);
            }

            peopleList.addPerson(person);
            peopleList.get("ids").push(server.id);
          }
        }
        }
        peopleList.fixFriends()
        boop();
        ui.set("page","start")
      }
    });

    // Method respond from server
    socket.on("methodClient", (server) => {
      if (server.key == "createPerson") {
        // add a newly created uer to list
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
      }
      if (server.key == "login") {
        // once logged in successfully add all details
        if (peopleList.getPerson(server.value.id) == null) {
          // success login
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
        testViewSubject = person
        } else {
          // failed login
          let person = peopleList.getPerson(server.value.id)
          ui.runMethod("correctLogin", person);
          ui.set("thisPerson", person);
          testViewSubject = person
        }
      }
      if (server.key == "signupSuccess") {
        // created new account
        if (peopleList.getPerson(server.value.id) == null) {
        // succes sign up
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
        peopleList.get("ids").push(server.value.id);
          testViewSubject = person
        } else {
          // failed sign up, likely same name
          let person = peopleList.getPerson(server.value.id)
          ui.runMethod("correctLogin", person);
          ui.set("thisPerson", person);
          testViewSubject = person
        }
      }
      if (server.key == "signupFail") {
        // sign up failed per server request
        ui.runMethod("signupFail");
      }
      if (server.key == "loginFail") {
        // login failed per server request
        ui.runMethod("loginFail");
      }
      if (server.key == "fixFriends") {
        // Incase of friends not being a class and is instead a number
        /*
        if (server.friends != null) {
          for (let i = 0; i < server.friends.length; i++) {
            let newFriend = peopleList.getPerson(server.friends[i]);
            let person = peopleList.getPerson(server.user.id);
            print('friendFix', person, newFriend)
            if (newFriend != null && person != null) {
              if (person.friends.includes(newFriend) != true) {
            person.addFriend(newFriend);
              }
            }
            print('fixFriend2',person.friends)
          }
        }
        */
        peopleList.fixFriends()
      }
    });
  }

  load() {
    socket.emit("database", { key: "loadDB" });
  }
}
