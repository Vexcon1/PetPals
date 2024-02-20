class Person {
  constructor(id, name, age, pet, location, _hobbies) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.pet = pet;
    this.location = location;
    this.hobbies = _hobbies;
    this.recommend = [];
    this.friends = [];
    this.next = null;
    this.posts = []
  }

  // Accessor methods
  get(data_name) {
    return this[data_name]
  }

  set(data_name,data_set) {
    this[data_name] = data_set
  }

  // User Actions

  createPost() {
    let post = new Post(this.id, this.name, "text", getRandomChatMessage());
    this.posts.push(post)
  }

  addPostLike(id,pid) {
    for (let i = 0; i < this.posts.length; i++) {
      if (posts[i].get("id") == pid) {
        posts[i].get("likes").push(id)
      }
    }
  }

  // Algorithms
  createRecommend(otherPerson) {
    if (this.id === otherPerson.get("id") || this.recommend.includes(otherPerson)) {
      return;
    }
    for (let i = 0; i < this.hobbies.length; i++) {
      if (otherPerson.get("hobbies").includes(this.hobbies[i]) == true)         {
        this.recommend.push(otherPerson);
        otherPerson.get("recommend").push(this);
      }
    }
  }

    recommendLines() {
    for (let i = 0; i < this.recommend.length; i++) {
      let otherPerson = this.recommend[i]
      let commonHobbies = this.hobbies.filter(hobby => otherPerson.get("hobbies").includes(hobby));
      if (commonHobbies.length > 0) {
        strokeWeight(1)
        stroke(255, 0, 0); // Red line for failed recommendhip
      }
    // Draw line between people
    line(this.location.x, this.location.y, otherPerson.get("location").x, otherPerson.get("location").y);
    }
  }

  recommendLikes() {
  for (let i = 0; i < this.posts.length; i++) {
    let thePost = this.posts[i]
    for (let i = 0; i < thePost.likes.length; i++) {
      let otherPerson = peopleList.getPerson(thePost.likes[i])
    if (otherPerson != null) {
      strokeWeight(4)
      stroke(0, 255, 0); // Red line for failed recommendhip

  // Draw line between people
  line(this.location.x, this.location.y, otherPerson.get("location").x, otherPerson.get("location").y);
    }
    }
  }
  }
}