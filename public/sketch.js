let peopleList;
let feed = null
let ui;

function setup() {
  createCanvas(400, 400);

  peopleList = new PeopleList();
  ui = new UI();

  resizeCanvas(400, 600)

  generateFakePeople()

  // Display information about each person
  //peopleList.display();

  // Try to befriend people based on hobbies
  peopleList.createRecommendList();

  // Make random posts and have random users like it
  peopleList.generateRandomPost()

  // Try to like peoples post
  peopleList.generateRandomPostLikes()

}
function draw() {
  background(220);

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
    "Lily",
    "Samuel",
    "Madison",
    "Christian",
    "Ella",
    "Dylan",
    "Natalie",
    "Joshua",
    "Hannah",
    "Jonathan",
    "Avery",
    "Carter",
    "Addison",
    "Nicholas",
    "Scarlett"
  ];
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

function testShowAll() {


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
      stroke(0,0,0)
        line(current.location.x, current.location.y, current.friends[i].get("location").x, current.friends[i].get("location").y);
      }
    strokeWeight(1)
  let friendList = peopleList.suggestFriend(current)
  for (let i=0; i < friendList.length; i++) {
    strokeWeight(2)
    stroke(0,0,0)
      line(current.location.x, current.location.y, friendList[i].get("location").x, friendList[i].get("location").y);
  }
  strokeWeight(1)

  peopleList.showAllLikes()
  peopleList.showAllrecommend()
}