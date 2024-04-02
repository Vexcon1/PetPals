class PeopleList {
  constructor() {
    this.link = null;
    this.length = 0;
    this.ids = [];
  }
  // Accessor methods
  get(data_name) {
    return this[data_name];
  }
  set(data_name, data_set) {
    this[data_name] = data_set;
  }

  deSeralizer(data) {
    return serializerClient.deserialize(data)
  }

  deAll() {
    if (!this.link) {
    this.link = serializerClient.deserialize(this.link)
    let current = this.link
    while (current != null) {
      current.set("next",serializerClient.deserialize(current))
      current = current.get("next")
      }
    }
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
      console.log("added person");
      current.set("next", person);
    }
    this.length++;
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
        console.log("found JESSE");
        current.addFriend(wantFriend);
      }
      current = current.get("next");
    }
  }

  unfriendPerson(person1, wantFriend) {
    let current = this.link;
    while (current) {
      if (current.get("name") == person1 || current.get("id") == person1) {
        console.log("found JESSE");
        current.removeFriend(wantFriend);
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
    let current = this.link
    while (current) {
      if (current.get("id") === id) {
        return current;
        break;
      }
      current = current.get("next");
    }
  }

  getPersonByName(name) {
    let current = this.link;
    while (current) {
      if (current.get("name") === name) {
        return current;
        break;
      }
      current = current.get("next");
    }
  }

  likePersonPost(id, pid) {
    let current = this.link;
    while (current) {
      if (current.get("id") === id) {
        current.get("posts");
        break;
      }
      current = current.get("next");
    }
  }
}

var a = new PeopleList()

module.exports = a;