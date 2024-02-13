let hobbies = ['Reading', 'Cooking', 'Gardening', 'Painting', 'Running', 'Photography', 'Singing', 'Knitting', 'Fishing', 'Cycling'];

class Message {
  constructor(_id, _owner, _msg) {
    this.id = _id
    this.owner = _owner
    this.msg = _msg
  }

  getMsg() {
    return this.msg;
  }
}

class Post {
  
}

class Person {
  constructor(id, name, age, pet, location) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.pet = pet;
    this.location = location;
    this.hobbies = hobbies;
    this.recommend = [];
    this.friends = [];
    this.next = null;
  }

  createRecommend(otherPerson) {
    if (this.id === otherPerson.id || this.recommend.includes(otherPerson)) {
      return;
    }
        let commonHobbies = this.hobbies.filter(hobby => otherPerson.hobbies.includes(hobby));
        if (commonHobbies.length > 0 && random(1) < 0.5) {
          this.recommend.push(otherPerson);
          otherPerson.recommend.push(this);
        }

      // Draw line between people
      line(this.location.x, this.location.y, otherPerson.location.x, otherPerson.location.y);
    }
  
    recommendLines() {
    for (let i = 0; i < this.recommend.length; i++) {
      let otherPerson = this.recommend[i]
      let commonHobbies = this.hobbies.filter(hobby => otherPerson.hobbies.includes(hobby));
      if (commonHobbies.length > 0) {
        stroke(255, 0, 0); // Red line for failed recommendhip
      }
    // Draw line between people
    line(this.location.x, this.location.y, otherPerson.location.x, otherPerson.location.y);
    }
  }
}

class PeopleList {
  constructor() {
    this.head = null;
    this.length = 0;
    this.ids = new Set();
  }

  addPerson(person) {
    if (!this.head) {
      this.head = person;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = person;
    }
    this.length++;
  }

  removePerson(person) {
    if (this.head.id === person.id) {
      this.head = this.head.next;
      this.length--;
    } else {
      let current = this.head;
      while (current.next) {
        if (current.next.id === person.id) {
          current.next = current.next.next;
          this.length--;
          break;
        }
        current = current.next;
      }
    }
  }

  friendPerson(person,wantFriend) {
    let current = this.head;
    while (current) {
      if (current.name == wantFriend || current.id == wantFriend) {
        current.addFriend(person);
      }
      current = current.next;
    }
  }

  generateUniqueId() {
    let id = '';
    do {
      id = '';
      for (let i = 0; i < 10; i++) {
        id += Math.floor(Math.random() * 10);
      }
    } while (this.ids.has(id));
    this.ids.add(id);
    return id;
  }

  display() {
    let current = this.head;
    while (current) {
      let info = `ID: ${current.id}, ${current.name}, Age: ${current.age}, Pet: ${current.pet}, Hobbies: ${current.hobbies.join(', ')}, Location: (${current.location.x.toFixed(2)}, ${current.location.y.toFixed(2)})`;
      console.log(info);
      current = current.next;
    }
  }

  createRecommendList() {
    let current = this.head;
    while (current) {
      let other = this.head;
      while (other) {
        if (current !== other) {
          current.createRecommend(other);
        }
        other = other.next;
      }
      current = current.next;
    }
  }

  showAllrecommend() {
    let current = this.head;
    while (current) {
      if(dist(current.location.x, current.location.y, mouseX, mouseY) <= 20) {
      current.recommendLines()
      }
      current = current.next;
    }
  }
}

let peopleList;

function setup() {
  createCanvas(400, 400);

  peopleList = new PeopleList();

  // Create 10 people with unique attributes
  for (let i = 0; i < 10; i++) {
    let person = new Person(peopleList.generateUniqueId(), generateName(), random(1, 100), generatePet(), createVector(random(width), random(height)), generateHobbies());
    peopleList.addPerson(person);
  }
  console.log(peopleList.head.name,peopleList.head.id)
  peopleList.removePerson(peopleList.head)

  // Display information about each person
  peopleList.display();

  // Try to befriend people based on hobbies
  peopleList.createRecommendList();
}

function draw() {
  background(220);

  // Display people on the canvas
  let current = peopleList.head;
  while (current) {
    fill(255, 0, 0)
    stroke(0, 0, 0)
    ellipse(current.location.x, current.location.y, 20, 20);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text(current.name, current.location.x, current.location.y + 20);
    text(current.id, current.location.x, current.location.y + 40); // Displaying ID
    current = current.next;
  }
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
  let selectedHobbies = [];
  for (let i = 0; i < 3; i++) {
    let hobby = random(hobbies);
    selectedHobbies.push(hobby);
  }
  return selectedHobbies;
}