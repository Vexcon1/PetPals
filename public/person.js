class Person {
  constructor(id, name, age, pet, _hobbies) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.pet = pet;
    this.location = createVector(
      random(-190, 190) + width / 2,
      random(-190, 190) + height / 2,
    );
    this.hobbies = _hobbies;
    this.recommend = [];
    this.friends = [];
    this.friendsID = [];
    this.next = null;
    this.posts = [];
  }

  // Accessor methods
  get(data_name) {
    return this[data_name];
  }

  set(data_name, data_set) {
    this[data_name] = data_set;
  }

  // User Actions

  createPost(txt) {
    if (txt == undefined) {
      txt = getRandomChatMessage();
    }
    peopleList.set("postLength", peopleList.get("postLength") + 1);
    let post = new Post(
      this.id,
      peopleList.get("postLength"),
      this.name,
      txt,
      null,
      0,
    );
    this.posts.push(post);
    db.method("createPost", [
      this.id,
      peopleList.get("postLength"),
      this.name,
      txt,
      null,
      0,
    ]);
  }

  addPostLike(id, pid) {
    for (let i = 0; i < this.posts.length; i++) {
      if (posts[i].get("id") == pid) {
        posts[i].get("likesUser").push(id);
        posts[i].set("likes", posts[i].get("likes") + 1);
      }
    }
  }

  addFriend(current) {
    if (current != undefined && current != null) {
      this.friends.push(current);
    }
  }

  removeFriend(current) {
    if (current != undefined && current != null) {
      let index = this.friends.indexOf(current);
      print(this.name,current.name,this.friends[0],this.friendsID,index);
      this.friends.splice(index, 1);
    }
  }

  // Algorithms
  createRecommend(otherPerson) {
    if (
      this.id === otherPerson.get("id") ||
      this.recommend.includes(otherPerson)
    ) {
      return;
    }
    for (let i = 0; i < this.hobbies.length; i++) {
      if (otherPerson.get("hobbies").includes(this.hobbies[i]) == true) {
        this.recommend.push(otherPerson);
        //otherPerson.get("recommend").push(this);
      }
    }
  }

  recommendLines() {
    for (let i = 0; i < this.recommend.length; i++) {
      let otherPerson = this.recommend[i];
      let commonHobbies = this.hobbies.filter((hobby) =>
        otherPerson.get("hobbies").includes(hobby),
      );
      if (commonHobbies.length > 0) {
        strokeWeight(1);
        stroke(255, 0, 0); // Red line for failed recommendhip
      }
      // Draw line between people
      line(
        this.location.x,
        this.location.y,
        otherPerson.get("location").x,
        otherPerson.get("location").y,
      );
    }
  }

  recommendLikes() {
    for (let i = 0; i < this.posts.length; i++) {
      let thePost = this.posts[i];
      for (let i = 0; i < thePost.likesUser.length; i++) {
        let otherPerson = peopleList.getPerson(thePost.likesUser[i]);
        if (otherPerson != null) {
          strokeWeight(4);
          stroke(0, 255, 0); // Red line for failed recommendhip

          // Draw line between people
          line(
            this.location.x,
            this.location.y,
            otherPerson.get("location").x,
            otherPerson.get("location").y,
          );
        }
      }
    }
  }
}
