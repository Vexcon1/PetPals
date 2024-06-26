class PeopleList {
  constructor() {
    this.link = null;
    this.length = 0;
    this.ids = [];
    this.postLength = 0;
  }
  // Accessor methods
  get(data_name) {
    return this[data_name];
  }
  set(data_name, data_set) {
    this[data_name] = data_set;
  }

  // User Actions
  addPerson(person) {
    if (!this.link) {
      this.link = person;
    } else {
      let current = this.link;
      while (current.get("next")) {
        current = current.get("next");
      }
      current.set("next", person);
    }
    this.length++;
  }

  createPerson(loginInfo, extra) {
    if (loginInfo == null) {
      db.method("createPerson", [
        1,
        generateName(),
        random(1, 100),
        generatePet(),
        generateHobbies(),
      ]);
    } else {
      db.method("createPerson", loginInfo, extra);
    }
  }

  removePerson(person) {
    if (this.link != null) {
      if (this.link.id === person.get("id")) {
        this.link = this.link.next;
        this.length--;
      } else {
        let current = this.link;
        while (current.get("next")) {
          if (current.get("next").get("id") === person.get("id")) {
            current.set("next", current.get("next").get("next"));
            this.length--;
            break;
          }
          current = current.get("next");
        }
      }
    }
  }

  friendPerson(person1, wantFriend) {
    let current = this.link;
    while (current) {
      if (current.get("name") == person1 || current.get("id") == person1) {
        current.addFriend(wantFriend);
        db.method("addFriend", [current.get("id"), wantFriend.get("id")]);
      }
      current = current.get("next");
    }
  }

  unfriendPerson(person1, wantFriend) {
    let current = this.link;
    while (current) {
      if (current.get("name") == person1 || current.get("id") == person1) {
        current.removeFriend(wantFriend);
        print(wantFriend);
        db.method("removeFriend", [current.get("id"), wantFriend.get("id")]);
      }
      current = current.get("next");
    }
  }

  findIfFriend(friend1, friend2) {
    let current = this.link;
    while (current) {
      if (current.get("name") == friend1 || current.get("id") == friend1) {
        for (let i = 0; i < current.get("friends").length; i++) {
          if (current.get("friends")[i].get("id") == friend2) {
            return true;
          }
        }
      }
      current = current.get("next");
    }

    return false;
  }

  getPerson(id) {
    let current = this.link;
    while (current) {
      if (current.get("id") === id) {
        return current;
        break;
      }
      current = current.get("next");
    }
  }

  getName(name) {
    let current = this.link;
    let list = []
    while (current) {
      let tempName = current.get("name")
      while (tempName.length > name.length)
        {
          tempName = tempName.substring(0, tempName.length - 1);
        }
      if (tempName === name) {
        list.push(current);
      }
      current = current.get("next");
    }

    return list
  }

  likePost(uid, id, pid) {
    db.method("likePost", [uid, id, pid]);
  }

  unlikePost(uid, id, pid) {
    db.method("unlikePost", [uid, id, pid]);
  }

  // Display Method

  display() {
    // let current = this.link;
    //while (current) {
    // let info = `ID: ${current.get("id")}, ${current.get("name")}, Age: ${current.get("age")}, Hobbies: ${current.get("hobbies").join(', ')}, Location: (${current.get("location").x.toFixed(2)}, ${current.get("location").y.toFixed(2)})`;
    // current = current.get("next");
    //}
  }

  // Algorithms

  generateUniqueId() {
    let id = "";
    do {
      id = "";
      for (let i = 0; i < 10; i++) {
        id += Math.floor(Math.random() * 10);
      }
    } while (this.ids.includes(id));
    this.ids.push(id);
    return id;
  }

  generateRandomPost() {
    let numPosts = 5;
    for (let i = 0; i < numPosts; i++) {
      var person = this.getPerson(
        this.ids[Math.floor(Math.random() * this.ids.length)],
      );
      if (person != null) {
         if (person != testViewSubject) {
        person.createPost();
         }
      }
    }
  }

  generateRandomFriend() {
    let current = this.link;
    for (let i = 0; i < 5; i++) {
      if (current) {
         if (testViewSubject != current) {
        if (
          current.get("id") == id &&
          peopleList.findIfFriend(id, current.id)
        ) {
          peopleList.friendPerson(id, current);
        }
         }
        current = current.get("next");
      }
    }
  }

  generateRandomPostLikes() {
    let current = this.link;
    while (current) {
      if (testViewSubject != current) {
      let numPosts = current.get("posts").length;
      let likeNum = 5;
      for (let i = 0; i < numPosts; i++) {
        for (let x = 0; x < likeNum; x++) {
          let randomX = Math.floor(Math.random() * this.ids.length);
          var personLike = this.getPerson(this.ids[randomX]);
          if (personLike != null) {
            //this.friendPerson(current.id, personLike);
            current.get("posts")[i].get("likesUser").push(personLike.get("id"));
            current
              .get("posts")
              [i].set("likes", current.get("posts")[i].get("likes") + 1);
            this.likePost(
              personLike.id,
              current.id,
              current.get("posts")[i].postId,
            );
          }
        }
      }
      }
      current = current.get("next");
    }
  }

  suggestFriend(person) {
    var possiblePeople = [];
    var peopleArray = [];
    let current = this.link;
    while (current) {
      if (current != person && current.id != person.id) {
        //for (let i = 0; i < person.recommend.length; i++) {
        let otherPerson = current;
        let commonHobbies = person.hobbies.filter((hobby) =>
          otherPerson.get("hobbies").includes(hobby),
        );
        if (commonHobbies.length > 0) {
          peopleArray["hob"] = true;
          peopleArray["hobP"] = commonHobbies.length;
        }
        //}
        /*
      for (let i = 0; i < person.posts.length; i++) {
        let thePost = person.posts[i]
        for (let a = 0; a < thePost.likesUser.length; a++) {
        if (thePost.likesUser[a] == current.id) {
          peopleArray['like'] = true
        }
        }
      }
      */
        if (person.friends.length > 0) {
          for (let x = 0; x < person.friends.length; x++) {
            if (current.friends.length > 0) {
              for (let a = 0; a < current.friends.length; a++) {
                if (
                  current.friends[a].get("id") == person.friends[x].get("id")
                ) {
                  peopleArray["friend"] = true;
                  peopleArray["friendP"] = peopleArray["friendP"] + 1;
                }
              }
            }
          }
        }
        if (peopleArray["hob"] == true || peopleArray["friend"] == true) {
          if (!person.friends.includes(current)) {
            if (peopleArray["hobP"] == null) {
              peopleArray["hobP"] = 0;
            }
            if (peopleArray["friendP"] == null) {
              peopleArray["friendP"] = 0;
            }
            possiblePeople.push({
              id: current.id,
              link: current,
              points: peopleArray["hobP"] + peopleArray["friendP"],
            });
          }
          peopleArray = [];
        }
      }
      current = current.get("next");
    }
    return possiblePeople;
  }

  createNewsFeed(person) {
    var possiblePeople = {
      priority: [],
      normal: [],
      low: [],
    };
    var peopleArray = [];
    let current = this.link;
    if (person != null) {
      while (current) {
        if (person.friends.includes(current)) {
          peopleArray["friends"] = true;
        }
        for (let i = 0; i < current.posts.length; i++) {
          if (person.friends != null) {
            for (let fi = 0; fi < person.friends.length; fi++) {
              let thePost = current.posts[i];
              for (let a = 0; a < thePost.likesUser.length; a++) {
                if (thePost.likesUser[a] == current.id) {
                  peopleArray["ilike"] = true;
                }
                if (person.friends[a] != null) {
                  if (person.friends[a].id == thePost.likesUser[a]) {
                    peopleArray["flike"] = true;
                  }
                }
              }
            }
          }
        }
        let otherPerson = current;
        let commonHobbies = person.hobbies.filter((hobby) =>
          otherPerson.get("hobbies").includes(hobby),
        );
        print(commonHobbies.length);
        if (commonHobbies.length > 0) {
          peopleArray["hob"] = true;
        }

        if (peopleArray["flike"] == true) {
          possiblePeople.priority.push(current);
        }

        if (peopleArray["ilike"] == true) {
          possiblePeople.normal.push(current);
        }

        if (peopleArray["friends"] == true) {
          possiblePeople.low.push(current);
        } else if (peopleArray["hob"] == true) {
          possiblePeople.low.push(current);
        }

        if (
          peopleArray["ilike"] == true ||
          peopleArray["flike"] == true ||
          peopleArray["friends"] == true ||
          peopleArray["hob"] == true
        ) {
          //print(peopleArray)
          peopleArray = [];
        }
        current = current.get("next");
      }

      let allPosts = [];

      for (let i = 0; i < possiblePeople.priority.length; i++) {
        allPosts = allPosts.concat(possiblePeople.priority[i].posts);
      }

      for (let i = 0; i < possiblePeople.normal.length; i++) {
        allPosts = allPosts.concat(possiblePeople.normal[i].posts);
      }

      for (let i = 0; i < possiblePeople.low.length; i++) {
        allPosts = allPosts.concat(possiblePeople.low[i].posts);
      }

      return allPosts;
    }
  }

  async createPopularFeed() {
    let current = this.link;
    let allPosts = [];
    values = [];

    while (current) {
      for (let i = 0; i < current.posts.length; i++) {
        values.push(current.posts[i]);
      }
      current = current.get("next");
    }
    // await quickSort(0, values.length - 1);
    await quickSort(0, values.length - 1);
    for (let i = 0; i < values.length; i++) {
      allPosts.push(values[i]);
    }
    return allPosts.reverse();
  }

  createRecommendList() {
    let current = this.link;
    while (current) {
      let other = this.link;
      while (other) {
        if (current !== other) {
          current.createRecommend(other);
        }
        other = other.get("next");
      }
      current = current.get("next");
    }
  }

  async getFollowingStatus(ida) {
    let persona = this.getPerson(ida);
    let current = this.link;
    let peopleArray = [];
    var allFriends = {
      current: [],
      person: [],
      both: [],
      master: [],
    };
    if (persona != null) {
      while (current) {
        if (current == persona) {
          current = current.get("next");
        }
        if (current == null) {
          break;
        }
        if (persona.get("friends").includes(current)) {
          peopleArray["personFriend"] = true;
        } else {
          peopleArray["personFriend"] = false;
        }
        if (current.get("friends").includes(persona)) {
          peopleArray["currentFriend"] = true;
        } else {
          peopleArray["currentFriend"] = false;
        }
        //print(peopleArray["personFriend"],peopleArray["currentFriend"] )
        if (
          peopleArray["personFriend"] == true &&
          peopleArray["currentFriend"] == true
        ) {
          allFriends.both.push(current);
        } else if (peopleArray["personFriend"] == true) {
          allFriends.person.push(current);
        } else if (peopleArray["currentFriend"] == true) {
          allFriends.current.push(current);
        }
        current = current.get("next");
      }
    }
    allFriends.master = allFriends.master.concat(allFriends.both);
    allFriends.master = allFriends.master.concat(allFriends.person);
    allFriends.master = allFriends.master.concat(allFriends.current);
    return allFriends;
  }

  createAllPostList() {
    let current = this.link;
    let allPosts = [];
    while (current) {
      allPosts = allPosts.concat(current.get("posts"));
      current = current.get("next");
    }
    return allPosts;
  }

  showAllrecommend() {
    let current = this.link;
    while (current) {
      if (
        dist(
          current.get("location").x,
          current.get("location").y,
          mouseX,
          mouseY,
        ) <= 20
      ) {
        current.recommendLines();
      }
      current = current.get("next");
    }
  }

  showAllLikes() {
    let current = this.link;
    while (current) {
      if (
        dist(
          current.get("location").x,
          current.get("location").y,
          mouseX,
          mouseY,
        ) <= 20
      ) {
        current.recommendLikes();
      }
      current = current.get("next");
    }
  }

  showAllFriends() {
    let current = this.link;
    while (current) {
      if (
        dist(
          current.get("location").x,
          current.get("location").y,
          mouseX,
          mouseY,
        ) <= 20
      ) {
        for (let i = 0; i < current.get("friends").length; i++) {
          strokeWeight(6);
          stroke(10, 10, 255);
          line(
            current.get("location").x,
            current.get("location").y,
            current.get("friends")[i].get("location").x,
            current.get("friends")[i].get("location").y,
          );
        }
        strokeWeight(1);
      }
      current = current.get("next");
    }
  }

  localLogin() {
    db.method("login", [ui.get("username"), ui.get("password")]);
  }

  fixFriends() {
    let current = this.link;
    while (current) {
      if (current.friendsID.length > 0) {
        for (let i = 0; i < current.friendsID.length; i++) {
          let newFriend = this.getPerson(current.friendsID[i]);
          let index = current.friendsID.indexOf(current);
          current.addFriend(newFriend);
          current.friendsID = current.friendsID.splice(index, 1);
        }
      }
      current = current.get("next");
    }
  }
}
