let peopleList;
let feed = null;
let vs1;
let ui;
let img;
let testViewSubject = null;
const socket = io();
const db = new Database();

db.setup();

function setup() {
  createCanvas(400, 600);

  peopleList = new PeopleList();

  img = loadImage("PETPALS.png");

  ui = new UI();
  vs1 = new VScrollbar(10, 10, 10, height * 2 - 110, 10);
  vsp = new VScrollbar(10, 10, 10, height * 2 - 110, 10);

  //generateFakePeople()

  // Display information about each person
  peopleList.display();

  db.load();
  peopleList.createRecommendList();

  showAllPosts();
}

function boop() {
  peopleList.display();

  // Try to befriend people based on hobbies
  peopleList.createRecommendList();

  //peopleList.generateRandomPost()
  //peopleList.generateRandomPostLikes()

  showAllPosts();
}

function draw() {

  ui.update();
}

function generateName() {
  const names = [
    "John",
    "Emily",
    "Michael",
    "Samantha",
    "David",
    "Olivia",
    "Daniel",
    "Sophia",
    "James",
    "Ava",
    "William",
    "Isabella",
    "Benjamin",
    "Mia",
    "Alexander",
    "Charlotte",
    "Ethan",
    "Amelia",
    "Matthew",
    "Harper",
    "Joseph",
    "Evelyn",
    "Anthony",
    "Abigail",
    "Andrew",
    "Emily",
    "Lucas",
    "Elizabeth",
    "Gabriel",
    "Grace",
    "Logan",
    "Chloe",
    "Christopher",
    "Victoria",
    "Nathan",
    "Jesse",
    "Samuel",
    "Madison",
    "Christian",
    "Ella",
    "Dylan",
    "Natalie",
    "Joshua",
    "Theo",
    "Jonathan",
    "Avery",
    "Carter",
    "Addison",
    "Nicholas",
    "Scarlett",
    "Kyle",
    "Zyleria",
    "Emberlyn",
    "Thalassa",
    "Orion",
    "Lyra",
    "Ajax",
    "Seraphina",
    "Draven",
    "Azura",
    "Asher",
    "Nova",
    "Ravena",
    "Zephyr",
    "Phoenix",
    "Aurora",
    "Thorne",
    "Luna",
    "Griffin",
    "Kai",
    "Seren",
    "Elysia",
    "Dorian",
    "Vesper",
    "Cassian",
    "Elara",
    "Finnian",
    "Rosalind",
    "Lysander",
    "Amara",
    "Cyrus",
    "Selene",
    "Caspian",
    "Elowen",
    "Thalia",
    "Darius",
    "Athena",
    "Ezekiel",
    "Nova",
    "Kieran",
    "Lorelei",
    "Xander",
    "Rowan",
    "Sylvan",
    "Calista",
    "Lucian",
    "Eira",
    "Damien",
    "Isolde",
  ];
  return random(names);
}

function generatePet() {
  let pets = [
    "Dog",
    "Cat",
    "Fish",
    "Bird",
    "Rabbit",
    "Hamster",
    "Snake",
    "Turtle",
    "Horse",
    "Guinea Pig",
  ];
  return random(pets);
}

function generateHobbies() {
  let hobbies = [
    "#walks",
    "#cuddle",
    "#dicipline",
    "#training",
    "#funny",
    "#mad",
    "#dog",
    "#cat",
    "#kids",
    "#relatable",
  ];
  let selectedHobbies = [];
  for (let i = 0; i < 3; i++) {
    let hobby = random(hobbies);
    selectedHobbies.push(hobby);
  }
  return selectedHobbies;
}

function generatePost() {
  for (let i = 0; i < 100; i++) {
    peopleList.generateRandomPost();
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
    "Do these devs know how to code?",
    "Have you heard the latest news?",
    "What are your plans for the weekend?",
    "I just finished a good book!",
    "Let's grab coffee sometime! I would really love to get to know you better",
    "I am a bot, I am not a human, I am a robot, I am a bot, I am a robot, I am a bot, I am a robot, I am a bot, I am a robot, I am a bot, I am a robot, I am a bot, I am a robot, I am a bot, I am a robot, I am a bot, I am a robot, I am a bot",
  ];

  const randomIndex = Math.floor(Math.random() * chatMessages.length);

  return chatMessages[randomIndex];
}

function generateFakePeople() {
  for (let i = 0; i < 10; i++) {
    /*let person = new Person(peopleList.generateUniqueId(), generateName(), random(1, 100), generatePet(), generateHobbies());
      peopleList.addPerson(person);
      */
    peopleList.createPerson();
  }
  //peopleList.removePerson(peopleList.get("link"))
}

function generateTestPeople() {
  for (let i = 0; i < 10; i++) {
    /*let person = new Person(peopleList.generateUniqueId(), generateName(), random(1, 100), generatePet(), generateHobbies());
      peopleList.addPerson(person);
      */
    peopleList.createPerson();
  }
  //peopleList.removePerson(peopleList.get("link"))
}

function allFriend(id) {
  let current = peopleList.get("link");
  while (current) {
    if (current.get("id") == id && peopleList.findIfFriend(id,current.id)) {
      peopleList.friendPerson(id, current);
    }
    current = current.get("next");
  }
}

function drawNodeList() {
  let current = peopleList.get("link");
  while (current) {
    fill(255, 0, 0);
    stroke(0, 0, 0);
    ellipse(current.location.x, current.location.y, 20, 20);
    fill(255, 0, 0);
    textAlign(CENTER);
    textSize(15);
    text(current.name, current.location.x, current.location.y + 20);
    textSize(13);
    text(current.id, current.location.x, current.location.y + 40); // Displaying ID
    text(
      `${current.posts.length}`,
      current.location.x,
      current.location.y + 60,
    ); // Displaying ID
    current = current.get("next");
  }
}

function showAllPosts() {
  let current = peopleList.get("link");
  let newPost = [];
  while (current) {
    if (current.posts.length > 0) {
      newPost = newPost.concat(current.posts);
    }
    current = current.get("next");
  }
  ui.set("postsDisplaying", newPost);
}

function testShowAll() {
  // Display people on the canvas

  drawNodeList();

  let current = testViewSubject;

  if (current != null) {
    feed = peopleList.createNewsFeed(current);
    current.location.x = width / 2;
    current.location.y = height / 2;
    fill(255, 0, 0);
    stroke(0, 0, 0);
    ellipse(current.location.x, current.location.y, 20, 20);
    fill(255, 0, 0);
    textSize(15);
    textAlign(CENTER);
    textSize(15);
    text(current.name, current.location.x, current.location.y + 20);
    textSize(13);
    text(current.id, current.location.x, current.location.y + 40); // Displaying ID
    textSize(13);
    text(
      `${current.posts.length}`,
      current.location.x,
      current.location.y + 60,
    ); // Displaying ID
    if (current.posts.length > 0) {
      fill(200, 2, 2);
      for (let i = 0; i < current.posts.length; i++) {
        textSize(10);
        text(
          `${current.posts[i].words}`,
          current.location.x,
          current.location.y + 80 + i * 20,
        );

        // Displaying ID
      }
    }
    /*
    for (let i = 0; i < feed.length; i++) {
      if (current.location != null) {
      strokeWeight(10)
      line(current.location.x, current.location.y, feed[i].get("location").x, feed[i].get("location").y);
      }
    }
    */
    for (let i = 0; i < current.friends.length; i++) {
      strokeWeight(2);
      stroke(10, 10, 255);
      line(
        current.location.x,
        current.location.y,
        current.friends[i].get("location").x,
        current.friends[i].get("location").y,
      );
    }
    strokeWeight(1);
    let friendList = peopleList.suggestFriend(current);
    for (let i = 0; i < friendList.length; i++) {
      strokeWeight(2);
      stroke(0, 0, 0);
      line(
        current.location.x,
        current.location.y,
        friendList[i].link.get("location").x,
        friendList[i].link.get("location").y,
      );
    }
    strokeWeight(1);
  }

  peopleList.showAllLikes();
  peopleList.showAllrecommend();
  peopleList.showAllFriends();
}

function keyPressedM() {
  if (keyCode == UP_ARROW) {
    print("remade");
    // Try to befriend people based on hobbies
    peopleList.createRecommendList();

    // Try to like peoples post
    peopleList.generateRandomFriend()();
  }
  if (keyCode == DOWN_ARROW) {
    generateFakePeople();
  }

  if (keyCode == RIGHT_ARROW) {
    peopleList.createRecommendList();
    peopleList.generateRandomPost();
    peopleList.generateRandomPostLikes();
  }

  if (keyCode == LEFT_ARROW) {
    generateTestPeople();
  }
}

let states = [];
let values = [];
async function quickSort(start, end) {
  if (start > end) {
    // Nothing to sort!
    return;
  }

  let index = await partition(start, end);
  states[index] = -1;
  await Promise.all([quickSort(start, index - 1), quickSort(index + 1, end)]);
}

async function partition(start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }
  // Quicksort algorithm
  let pivotIndex = start;
  states[pivotIndex] = 0;
  let pivotElement = values[end].likes;
  for (let i = start; i < end; i++) {
    if (values[i].likes < pivotElement) {
      await swap(i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(end, pivotIndex);
  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }
  return pivotIndex;
}

async function swap(i, j) {
  let temp = values[i];
  values[i] = values[j];
  values[j] = temp;
}
