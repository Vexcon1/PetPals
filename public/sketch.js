

class Message {
  constructor(_id, _owner, _msg) {
    this.id = _id
    this.owner = _owner
    this.msg = _msg
    this.emoji = null
  }

  // Accessor methods 
  get(data_name) {
    return this[data_name]
  }
  set(data_name,data_set) {
    this[data_name] = data_set
  }
}

class Post {
  constructor(_id, _owner, _mediaType, _media) {
    this.id = _id
    this.owner = _owner
    this.mediaType = _mediaType
    this.media = _media
    this.likes = []
  }


  // Accessor methods
  get(data_name) {
    return this[data_name]
  }
  set(data_name,data_set) {
    this[data_name] = data_set
  }
}

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

let peopleList;
let feed = null

function setup() {
  createCanvas(400, 400);

  peopleList = new PeopleList();

  generateFakePeople()

  // Display information about each person
  //peopleList.display();

  // Try to befriend people based on hobbies
  peopleList.createRecommendList();

  // Make random posts and have random users like it
  peopleList.generateRandomPost()

  // Try to like peoples post
  peopleList.generateRandomPostLikes()

  let current = peopleList.get("link");
  let friendList = peopleList.suggestFriend(current)
  for (let i=0; i < friendList.length; i++) {
    peopleList.friendPerson(current,friendList[i])
    print('new friend')
  }
}
function draw() {
  background(220);

  // Display people on the canvas

  drawNodeList()

  let current = peopleList.get("link");
  
  feed = peopleList.createNewsFeed(current)
  current.location.x = width/2
  current.location.y = height/2 
  fill(255, 0, 0)
  stroke(0, 0, 0)
  ellipse(current.location.x, current.location.y, 20, 20);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  text(current.name, current.location.x, current.location.y + 20);
  text(current.id, current.location.x, current.location.y + 40); // Displaying ID
  text(`${current.posts.length}`, current.location.x, current.location.y + 60); // Displaying ID
  if (current.posts.length > 0) {
  for (let i = 0; i < current.posts.length; i++) {
    text(`${current.posts[i].media}`, current.location.x, current.location.y + 80 + i * 20); // Displaying ID
  }
  }
    for (let i = 0; i < feed.length; i++) {
      print(feed)
      strokeWeight(10)
      line(current.location.x, current.location.y, feed[i].get("location").x, feed[i].get("location").y);
    }
    for (let i=0; i < current.friends.length; i++) {
      print('heyyy')
      strokeWeight(2)
      stroke(0,0,255)
        line(current.location.x, current.location.y, current.friends[i].get("location").x, current.friends[i].get("location").y);
      }
    strokeWeight(1)
  
  
  peopleList.showAllLikes()
  peopleList.showAllrecommend()
}

function generateName() {
  let names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Emily', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
  return random(names);
}

function generatePet() {
  let pets = ['Dog', 'Cat', 'Fish', 'Bird', 'Rabbit', 'Hamster', 'Snake', 'Turtle', 'Horse', 'Guinea Pig'];
  return random(pets);
}

function generateHobbies() {
  let hobbies = ['Reading', 'Cooking', 'Gardening', 'Painting', 'Running', 'Photography', 'Singing', 'Knitting', 'Fishing', 'Cycling'];
  let selectedHobbies = [];
  for (let i = 0; i < 3; i++) {
    let hobby = random(hobbies);
    selectedHobbies.push(hobby);
  }
  return selectedHobbies;
}

function generatePost() {
  for (let i = 0; i < 10; i++) {
    peopleList.createPost(post);
  }
}

function getRandomChatMessage() {
  // Array of chat messages
  const chatMessages = [
    "Hello, how are you?",
    "What's up?",
    "How's your day going?",
    "Nice weather today, isn't it?",
    "Did you watch any good movies lately?",
    "I'm feeling hungry!",
    "Have you heard the latest news?",
    "What are your plans for the weekend?",
    "I just finished a good book!",
    "Let's grab coffee sometime!"
  ];

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * chatMessages.length);

  // Return the random chat message
  return chatMessages[randomIndex];
}

function generateFakePeople() {
  for (let i = 0; i < 10; i++) {
    let person = new Person(peopleList.generateUniqueId(), generateName(), random(1, 100), generatePet(), createVector(random(width), random(height)), generateHobbies());
    peopleList.addPerson(person);
  }
  peopleList.removePerson(peopleList.get("link"))
}

function drawNodeList() {
  let current = peopleList.get("link");
  while (current) {
    fill(255, 0, 0)
    stroke(0, 0, 0)
    ellipse(current.location.x, current.location.y, 20, 20);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text(current.name, current.location.x, current.location.y + 20);
    text(current.id, current.location.x, current.location.y + 40); // Displaying ID
    text(`${current.posts.length}`, current.location.x, current.location.y + 60); // Displaying ID
    current = current.get("next");
  }
}
