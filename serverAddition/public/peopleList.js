
class PeopleList {
  constructor() {
    this.link = null;
    this.length = 0;
    this.ids = []
  }
  // Accessor methods
  get(data_name) {
    return this[data_name]
  }
  set(data_name,data_set) {
    this[data_name] = data_set
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
      current.set("next",person);
    }
    this.length++;
  }

  removePerson(person) {
    if (this.link.id === person.get("id")) {
      this.link = this.link.next;
      this.length--;
    } else {
      let current = this.link;
      while (current.get("next")) {
        if (current.get("next").get("id") === person.get("id")) {
          current.set("next",current.get("next").get("next"));
          this.length--;
          break;
        }
        current = current.get("next");
      }
    }
  }

  friendPerson(person,wantFriend) {
    let current = this.link;
    while (current) {
      if (current.get("name") == person || current.get("id") == person) {
        current.addFriend(wantFriend);
      }
      current = current.get("next");
    }
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

  likePersonPost(id,pid) {
    let current = this.link;
    while (current) {
      if (current.get("id") === id) {
        current.get("posts")
        break;
      }
      current = current.get("next");
    }
  }

  // Display Method

  display() {
    let current = this.link;
    while (current) {
      let info = `ID: ${current.get("id")}, ${current.get("name")}, Age: ${current.get("age")}, Pet: ${current.get("pet")}, Hobbies: ${current.get("hobbies").join(', ')}, Location: (${current.get("location").x.toFixed(2)}, ${current.get("location").y.toFixed(2)})`;
      current = current.get("next");
    }
  }

  // Algorithms

  generateUniqueId() {
    let id = '';
    do {
      id = '';
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
      var person = this.getPerson(this.ids[Math.floor(Math.random() * this.ids.length)])
       if (person != null) {
      person.createPost()
       }
    }
  }

  generateRandomPostLikes() {
    let current = this.link;
    while (current) {
      let numPosts = current.get("posts").length;
      let likeNum = 5;
      for (let i = 0; i < numPosts; i++) {
        for (let x = 0; x < likeNum; x++) {
          let randomX = Math.floor(Math.random() * this.ids.length)
          var personLike = this.getPerson(this.ids[randomX])
           if (personLike != null) {
            current.get("posts")[i].get("likes").push(personLike.get("id"))
           }
        }
      }
      current = current.get("next");
    }
  }

  suggestFriend(person) {
    var possiblePeople = []
    var peopleArray = []
    let current = this.link;
    while (current) {
      for (let i = 0; i < person.recommend.length; i++) {
        let otherPerson = current
        let commonHobbies = person.hobbies.filter(hobby => otherPerson.get("hobbies").includes(hobby));
        if (commonHobbies.length > 0) {
          peopleArray['hob'] = true
        }
      }
      for (let i = 0; i < person.posts.length; i++) {
        let thePost = person.posts[i]
        for (let a = 0; a < thePost.likes.length; a++) {
        if (thePost.likes[a] == current.id) {
          peopleArray['like'] = true
        }
        }
      }
    if (peopleArray['hob'] == true && peopleArray['like'] == true) {
      possiblePeople.push(current)
      peopleArray = []
    }
    current = current.get("next") 
    }

    return possiblePeople
  }

  createNewsFeed(person) {
    var possiblePeople = []
    var peopleArray = []
    let current = this.link;
    while (current) {
      for (let i = 0; i < current.posts.length; i++) {
        for (let fi = 0; fi < person.friends.length; fi++) {
        let thePost = current.posts[i]
        for (let a = 0; a < thePost.likes.length; a++) {
        if (thePost.likes[a] == current.id) {
          peopleArray['ilike'] = true
        }
        if (person.friends[a].id == thePost.likes[a]) {
              peopleArray['flike'] = true
        }
        }
        }
      }
    if (peopleArray['ilike'] == true || peopleArray['flike'] == true) {
      possiblePeople.push(current)
      peopleArray = []
    }
    current = current.get("next") 
    }

    return possiblePeople
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

  showAllrecommend() {
    let current = this.link;
    while (current) {
      if(dist(current.get("location").x, current.get("location").y, mouseX, mouseY) <= 20) {
      current.recommendLines()
      }
      current = current.get("next");
    }
  }

  showAllLikes() {
    let current = this.link;
    while (current) {
      if(dist(current.get("location").x, current.get("location").y, mouseX, mouseY) <= 20) {
      current.recommendLikes()
      }
      current = current.get("next");
    }
  }
}