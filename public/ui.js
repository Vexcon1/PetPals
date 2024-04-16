//const { Color } = require("p5");

//const { text } = require("body-parser");

let tp;

let post;

class UI {
  constructor() {
    this.isAccount = false;

    this.page = "buffer";
    this.pagePrev = "buffer"

    this.postPageView = "ForYou";

    this.typing = 0;

    this.id = "";
    this.username = "";
    this.pet = "";
    this.password = "";
    this.age = "";
    this.hobbys = [];
    this.thisPerson = this.id;
    this.thisUser = null;

    this.recommends = [];

    this.postsDisplaying = null;
    this.viewPals = null;
    this.failedToSignUp = false;
    this.failedToLogIn = false;
    this.failedToSignUpReason = "";
    this.failedToLogInReason = "";

    this.tempSize = 0
    this.tempSizeInc = 1
    this.searchFor = ""

    this.pets = [
      "Dog",
      "Cat",
      "Bird",
      "Fish",
      "Hamster",
      "Rat",
      "Snake",
      "Lizard",
      "Chicken",
      "Pig",
    ];

    this.hobbies = [
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
    this.hobbySelect = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];

    // Algorithms

    this.feed = null;
  }

  get(data_name) {
    return this[data_name];
  }
  set(data_name, data_set) {
    this[data_name] = data_set;
  }

  update() {
    //decides what page to run
    if (this.page != "search")
      this.pagePrev = this.page;
    
    if (this.page == "debug") {
      this.runDebugPage();
      return;
    }

    if (this.page == "home") {
      this.runHomePage();
    }

    if (this.page == "start") {
      this.runStartPage();
    }

    if (this.page == "login") {
      this.runLogPage();
    }

    if (this.page == "signin") {
      this.runSignPage();
    }

    if (this.page == "hobbies") {
      this.runHobbiesPage();
    }

    if (this.page == "buffer") {
      this.runBufferPage();
    }

    if (this.page == "petType") {
      this.runPetSelectionPage();
    }

    if (this.page == "posts") {
      this.runPostsPage();
    }

    if (this.page == "postType") {
      this.runPostTypePage();
    }

    if (this.page == "messaging") {
      this.runMessagingPage();
    }

    if (this.page == "text") {
      this.runTextPage();
    }

    if (this.page == "makePost") {
      this.runMakePostPage();
    }

    if (this.page == "account") {
      this.runAccountPage();
    }

    if (this.page == "viewPals") {
      this.runViewPals();
    }

    if (this.page == "search") {
      this.runSearchPage();
    }
    
    if (this.page == "delete1") {
      this.runDelete1();
    }

    if (this.page != "home" && this.page != "search") this.runBottomMenu();

    fill(255, 0, 0);
    ellipse(25, 575, 20, 20);

    noStroke()
    fill(80)
    ellipse(25, 25, 35, 35)

    stroke(255)
    strokeWeight(2)
    noFill()
    ellipse(22, 22, 12, 12)

    line(28, 28, 34, 34)
  }

  runDebugPage() {
    //debug mode shows connections between users
    rectMode(CENTER);
    textAlign(CENTER);
    background(30);
    this.runBottomMenu();
    drawNodeList();
    testShowAll();
  }

  runBottomMenu() {
    //bottom menu switches between account, posts, and creating post

    rectMode(CENTER);
    noStroke();
    fill(40);
    rect(200, 595, 400, 90, 5);

    fill(50);
    rect(200, 575, 80, 40, 20);
    rect(100, 575, 80, 40, 20);
    rect(300, 575, 80, 40, 20);

    stroke(100, 180, 255);
    strokeWeight(2);

    if (mouseX > 180 && mouseX < 220 && mouseY > 560 && mouseY < 590) {
      stroke(255, 203, 150);
      strokeWeight(2);
    } else {
      stroke(255, 153, 100);
      strokeWeight(2);
    }
    rect(200, 575, 35, 27, 5);
    line(200, 568, 200, 582);
    line(190, 575, 210, 575);

    if (dist(mouseX, mouseY, 300, 575) < 15) {
      stroke(230, 240, 255);
      strokeWeight(2);
    } else {
      stroke(100, 180, 255);
      strokeWeight(2);
    }

    ellipse(300, 570, 10, 10);
    ellipse(300, 589, 20, 20);

    noStroke();
    rect(300, 592, 30, 6);
    fill(40);
    rect(300, 597.5, 30, 5);

    if (dist(mouseX, mouseY, 100, 575) < 15) {
      stroke(230, 240, 255);
      strokeWeight(2);
    } else {
      stroke(100, 180, 255);
      strokeWeight(2);
    }

    fill(50);
    triangle(110, 575, 95, 568, 95, 582);

    image(img, 375, 25, 30, 30);
  }

  // A simple hashing function to convert a string into a numeric value
  assignColor(id) {
    let a = id.charCodeAt(1) - 96;
    if (a <= 2) return color(100, 180, 255);
    else if (a <= 5) return color(255, 141, 163);
    else if (a <= 8) return color(181, 167, 255);
    else return color(255, 153, 100);
  }

  runDelete1()
  {
    rectMode(CENTER)
    stroke(255, 100, 100)
    fill(255)
    strokeWeight(5)
    rect(width/2, height/2, width -100, 250, 20)

    rect(width/2, height/2, 275, 125, 10)
    rect(width/2, height/2+ 90, 200, 40, 10)
    
    noStroke()
    fill(50)
    textSize(20)
    textAlign(CENTER)
    text("are you sure you want to\nDELETE YOUR ACCOUNT??", width/2, height/2 - 100)

    textSize(30)
    text("KEEP ACCOUNT", width/2, height/2 + 5)

    textSize(20)
    text("I'm sure.", width/2, height/2 + 95)
  }

  runHomePage() {
    //page to select what page to go to next. Can navigate here by clicking paw at top right
    //also includes friends suggestion section.
    background(30);

    textStyle(NORMAL);
    textSize(20);
    fill(255, 153, 100);
    textAlign(CENTER);
    noStroke();
    text("Welcome back", width / 2, 50);

    textSize(60);
    fill(100, 180, 255);
    text(this.username, width / 2, 100);

    image(img, width / 2, 200, 150, 150);

    textSize(20);
    fill(255);
    text(
      "-            -                      -                -",
      width / 2,
      320,
    );

    textStyle(NORMAL);
    fill(100, 180, 255);
    textSize(20);
    text("posts", 86.5, 320);
    text("account", 302, 320);

    fill(255, 153, 100);
    text("create post", 189, 320);

    //decides what friends to suggest to user based on his hobbies
    let possible = peopleList.suggestFriend(this.thisUser);
    let top1 = 0;
    let top1Spot = null;
    let top2 = 0;
    let top2Spot = null;
    let top3 = 0;
    let top3Spot = null;
    let final = [];
    for (let i = 0; i < possible.length; i++) {
      if (possible[i].points > top1) {
        top1Spot = possible[i].link;
        top1 = possible[i].points;
      } else if (possible[i].points > top2) {
        top2Spot = possible[i].link;
        top2 = possible[i].points;
      } else if (possible[i].points > top3) {
        top3Spot = possible[i].link;
        top3 = possible[i].points;
      }
    }
    final.push(top1Spot);
    final.push(top2Spot);
    final.push(top3Spot);

    this.recommends[0] = top1Spot;
    this.recommends[1] = top2Spot;
    this.recommends[2] = top3Spot;

    for (let i = 0; i < final.length; i++) {
      let current = final[i];
      if (this.thisUser == null) {
        textStyle(BOLD);
        fill(255);
        textSize(15);
        textAlign(LEFT);
        text(
          "Lonely, Sadly no one is here\nthat you might like  ¯|_(ツ)_/¯",
          i * 125 + 75,
          375,
        );

        return;
      }
      if (current == null) {
        textStyle(BOLD);
        fill(255);
        textSize(15);
        textAlign(LEFT);
        text(
          "Lonely, Sadly no one is here\nthat you might like  ¯|_(ツ)_/¯",
          i * 125 + 75,
          375,
        );
        return;
      }
      textStyle(NORMAL);
      fill(40);
      rectMode(CENTER);

      rect(i * 125 + 75, 455, 100, 200, 10);

      //fill(100, 180, 255);
      fill(this.assignColor(current.get("name")));
      ellipse(i * 125 + 75, 420, 60);

      textSize(40);
      fill(255);
      text(current.get("name").charAt(0), i * 125 + 75, 433);

      fill(50);
      rect(i * 125 + 75, 370, 80, 20, 5);

      textStyle(BOLD);
      fill(255);
      textSize(15);
      text(current.get("name"), i * 125 + 75, 375);

      for (let j = 0; j < 3; j++) {
        let hob = current.get("hobbies")[j];
        fill(50);
        rect(i * 125 + 75, j * 30 + 470, 80, 20, 3);
        textStyle(NORMAL);

        fill(255);
        text(hob, i * 125 + 75, j * 30 + 475);
      }

      fill(40);
      rect(i * 125 + 75, 560, 100, 30);

      textSize(18);
      textStyle(BOLD);
      fill(100, 180, 255);

      if (peopleList.findIfFriend(this.id, current.get("id")) == true)
        text("Following", i * 125 + 75, 565);
      else text("Follow", i * 125 + 75, 565);
    }
  }

  runStartPage() {
    //very first screen when you run program.
    //sign in or log in
    background(30);

    imageMode(CENTER);
    image(img, width / 2, height / 2 - 35, 200, 200);

    noStroke();
    fill(255);
    textStyle(BOLD);
    textAlign(CENTER);
    textSize(40);
    text("Welcome to", width / 2, height / 2 - 150);

    fill(255, 153, 100);
    textSize(20);
    text("sign up", 250, 400);

    fill(255);
    text("log in", 150, 400);
    if (mouseIsPressed && dist(mouseX, mouseY, 150, 400) < 20) {
      this.page = "login";
    }

    if (mouseIsPressed && dist(mouseX, mouseY, 250, 400) < 20) {
      this.page = "signin";
    }
  }

  runSearchPage()
  {
    rectMode(CORNER)
    noStroke()
    fill(35)
    rect(0, 0, width, this.tempSize * 2)

    
    fill(40)
    stroke(200)
    strokeWeight(2)

    rect(50, 10, this.tempSize, 30, 10)

    if (this.tempSize < 300)
    {
      this.tempSize += this.tempSizeInc
      this.tempSizeInc *= 1.5
    }

    if (this.tempSize > 300)
      this.tempSize = 300

    noStroke()
    fill(255)
    textSize(20)
    textAlign(LEFT)

    this.wrapText(this.searchFor, 60, 30, 260, 20)

    let names = []

    if (this.searchFor.length > 0)
    {
      names = peopleList.getName(this.searchFor)
    }

    while(names.length > 8)
      {
        names.splice(names.length -1, 1)
      }

    for (let i = 0; i < names.length; i++)
      {
        let current = names[i]
        rectMode(CORNER)
        noStroke()
        fill(80)
        rect(15, i * 50 + 76, 80 + textWidth(current.name), 35, 15)

        textAlign(CENTER);
        fill(this.assignColor(current.name));
        ellipse(35, i * 50 + 93, 25, 25);
        fill(255);
        textSize(17);
        textStyle(NORMAL);
        text(current.name.charAt(0), 35, i * 50 + 98);

        noStroke();
        fill(255);
        textStyle(NORMAL);
        textAlign(LEFT);
        textSize(20);

        text(current.name, 70, i * 50 + 100);

        textAlign(RIGHT);
        fill(100, 180, 255);

        let state = ""
        if (peopleList.findIfFriend(this.thisUser.id, current.id) &&
            peopleList.findIfFriend(current.id, this.thisUser.id))
          state = "Pals!"
        else if (peopleList.findIfFriend(this.thisUser.id, current.id))
          state = "Following"
        else
          state = "Follow"

        fill(60)
        if (mouseX > 340 - textWidth(state) && mouseX < 360 && mouseY > i * 50 + 75 && mouseY < i * 50 +110)
        {
          fill(70)
          if (mouseIsPressed)
            fill(50)
        }

        rectMode(CORNERS)
        rect(360, i * 50 + 75, 340 - textWidth(state), i * 50 +110, 10)

        textAlign(RIGHT);
        fill(100, 180, 255);

        text(state, 350, i * 50 + 100);
      }
  }

  runMessagingPage() {
    //abandoned screen
    background(30);

    textAlign(CENTER);
    textStyle(BOLD);
    noStroke();
    textSize(50);
    fill(255);
    text("Messages", width / 2, 100);

    for (let i = 0; i < 6; i++) {
      rectMode(CENTER);
      noStroke();
      fill(50);

      rect(width / 2, i * 70 + 200, width - 50, 50, 10);

      fill(100, 180, 255);
      ellipse(50, i * 70 + 200, 30, 30);

      //text(name)
    }
  }

  runTextPage() {
    //part of abandoned messaging page
    background(30);

    rectMode(CORNER);
    noStroke();
    fill(25);
    rect(0, height - 100, width, 50);

    fill(35);
    if (
      mouseX > 10 &&
      mouseX < 260 &&
      mouseY > height - 90 &&
      mouseY < height - 60
    )
      fill(40);
    rect(10, height - 90, 250, 30, 10);

    fill(80, 160, 255);
    rect(270, height - 90, 120, 30, 10);

    textAlign(CENTER);
    textStyle(BOLD);
    textSize(25);
    fill(255);
    text("SEND", 330, height - 66);
  }

  runBufferPage() {
    //very satesfying loading screen
    background(30);

    noFill();
    stroke(100, 180, 255);
    strokeWeight(3);

    push();

    translate(width / 2, height / 2);
    rotate(cos(millis() / 1000));
    // Bottom-right.
    arc(0, 0, 50, 50, 0, HALF_PI);

    push();
    rotate(tan(millis() / 6000));
    // Bottom-left.
    arc(0, 0, 60, 60, HALF_PI, PI);
    pop();

    rotate(cos(millis() / 1000));
    // Top-left.
    arc(0, 0, 70, 70, PI, PI + QUARTER_PI);

    rotate(tan(millis() / 5000));
    // Top-right.
    arc(0, 0, 80, 80, PI + QUARTER_PI, TWO_PI);

    pop();
  }

  runSignPage() {
    //sign in screen. Choose your name, age, password, hobbies, and pet!
    rectMode(CENTER);
    textAlign(CENTER);
    background(30);

    imageMode(CENTER);
    image(img, width / 2, 70, 60, 60);

    noStroke();
    fill(255, 153, 100);
    textStyle(NORMAL);
    textSize(15);
    text("Name", 200, 130);

    noFill();
    stroke(150);
    if (mouseX > 100 && mouseX < 300 && mouseY > 135 && mouseY < 165) {
      fill(50);
    }
    if (this.typing == 1) {
      stroke(190, 210, 220);
      fill(50);
    }
    rect(200, 150, 200, 25, 5);

    noStroke();
    fill(255);
    if (this.username != null) text(this.username, 200, 155);

    fill(100, 180, 255);
    textStyle(NORMAL);
    textSize(15);
    text("Password", 200, 230);

    noFill();
    stroke(150);
    if (mouseX > 100 && mouseX < 300 && mouseY > 235 && mouseY < 265) {
      fill(50);
    }
    if (this.typing == 2) {
      stroke(190, 210, 220);
      fill(50);
    }
    rect(200, 250, 200, 25, 5);

    noStroke();
    fill(255);
    if (this.password != null) text(this.password, 200, 255);

    noStroke();
    fill(255, 153, 100);
    textStyle(NORMAL);
    textSize(15);
    text("Age", 200, 330);

    noFill();
    stroke(150);
    if (mouseX > 100 && mouseX < 300 && mouseY > 335 && mouseY < 365) {
      fill(50);
    }
    if (this.typing == 3) {
      stroke(190, 210, 220);
      fill(50);
    }
    rect(200, 350, 200, 25, 5);

    noStroke();
    fill(255);
    if (this.age != null) text(this.age, 200, 355);

    //if any field is empty -- dont allow user to proceed
    if (this.username == "" || this.password == "" || this.age == "") {
      noFill();
      stroke(255, 153, 100);
      rect(200, 450, 204, 44, 5);
      fill(100, 180, 255);
    } else {
      noFill();
      stroke(100, 180, 255);
      rect(200, 450, 204, 44, 5);
      fill(200);
    }

    noStroke();
    textStyle(BOLD);
    textSize(20);
    text("Next", 200, 456);

    if (this.failedToSignUp == true) {
      fill(255, 100, 100);
      rect(200, 500, 130, 30, 10);
      fill(255);
      textSize(10);
      text(
        "failed to create account.\nReason: " + this.failedToSignUpReason,
        200,
        497,
      );
    }
  }

  //for typing into sign in boxes
  addToKey(k) {
    if (this.page == "search")
    {
      this.searchFor += k;
      return
    }
    if (this.typing == 1 && textWidth(this.username) < 275) this.username += k;
    if (this.typing == 2 && textWidth(this.password) < 275) this.password += k;
    if (this.typing == 3 && textWidth(this.age) < 20 && key >= 0 && key <= 9)
      this.age += k;
  }

  //backspace
  backspace() {
    if (this.page == "search")
    {
      this.searchFor = this.searchFor.substring(0, this.searchFor.length - 1);
      return
    }
    
    if (this.typing == 1) {
      this.username = this.username.substring(0, this.username.length - 1);
    }

    if (this.typing == 2) {
      this.password = this.password.substring(0, this.password.length - 1);
    }

    if (this.typing == 3) {
      this.age = this.age.substring(0, this.age.length - 1);
    }
  }

  runHobbiesPage() {
    //page to select hobbies
    background(30);

    textAlign(CENTER);
    textStyle(ITALIC);
    noStroke();
    fill(200);
    textSize(20);
    text("Pick three", 197, 50);

    fill(20);
    textSize(40);
    textStyle(BOLD);
    text("CATEGORIES", 200, 95);
    fill(100, 180, 255);
    text("CATEGORIES", 200, 90);

    rectMode(CENTER);
    noStroke();
    fill(100);
    if (this.hobbys.length == 3) {
      if (
        mouseX > 135 &&
        mouseX < 265 &&
        mouseY > 105 &&
        mouseY < 135 &&
        mouseIsPressed
      ) {
        for (let i = 0; i < 10; i++) {
          fill(12, 22, 30, 255 - i * 25);
          rect(200, 120, 110 + i * 4, 10 + i * 4, 10);
        }
        fill(60, 140, 200);
      } else if (mouseX > 135 && mouseX < 265 && mouseY > 105 && mouseY < 135) {
        for (let i = 0; i < 10; i++) {
          fill(25, 45, 60, 255 - i * 25);
          rect(200, 120, 110 + i * 4, 10 + i * 4, 10);
        }
        fill(80, 160, 230);
      } else {
        for (let i = 0; i < 10; i++) {
          fill(50, 90, 125, 255 - i * 25);
          rect(200, 120, 110 + i * 4, 10 + i * 4, 10);
        }
        fill(100, 180, 255);
      }
    }
    rect(200, 120, 130, 30, 5);

    fill(200);
    if (this.hobbys.length == 3) fill(255);
    textSize(15);
    textAlign(CENTER);
    text("Create Account", 200, 124);

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 5; j++) {
        rectMode(CORNER);
        noStroke();
        fill(20);
        rect(i * 175 + 37.5, j * 75 + 160, 150, 50, 5);

        let t = 0;

        fill(50);
        if (this.hobbySelect[i * 5 + j] == true) {
          fill(100, 180, 255);
          t = 2;
        }

        if (
          mouseX > i * 175 + 37.5 &&
          mouseX < i * 175 + 37.5 + 150 &&
          mouseY > j * 75 + 150 &&
          mouseY < j * 75 + 160 + 50
        ) {
          t = 3;
          if (mouseIsPressed == true) {
            t = 5;
          }
        }

        rect(i * 175 + 37.5, j * 75 + 150 + t, 150, 50, 5);

        textSize(20);
        fill(255);
        text(this.hobbies[i * 5 + j], i * 175 + 110, j * 75 + 180 + t);
      }
    }
  }

  runPetSelectionPage() {
    //select a pet
    background(30);

    textAlign(CENTER);
    textStyle(ITALIC);
    noStroke();
    fill(200);
    textSize(20);
    text("Pick your", 197, 50);

    fill(20);
    textSize(40);
    textStyle(BOLD);
    text("PET TYPE", 200, 95);
    fill(100, 180, 255);
    text("PET TYPE", 200, 90);

    rectMode(CENTER);
    noStroke();
    fill(100);
    if (this.pet != "") {
      if (
        mouseX > 135 &&
        mouseX < 265 &&
        mouseY > 105 &&
        mouseY < 135 &&
        mouseIsPressed
      )
        fill(80, 160, 230);
      else if (mouseX > 135 && mouseX < 265 && mouseY > 105 && mouseY < 135)
        fill(90, 170, 240);
      else fill(100, 180, 255);
    }
    rect(200, 120, 130, 30, 5);

    fill(200);
    if (this.pet != "") fill(255);
    textSize(15);
    textAlign(CENTER);
    text("Next", 200, 124);

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 5; j++) {
        rectMode(CORNER);
        noStroke();
        fill(20);
        rect(i * 175 + 37.5, j * 75 + 160, 150, 50, 5);

        let t = 0;

        fill(50);
        if (this.pets[i * 5 + j] == this.pet) {
          fill(100, 180, 255);
          t = 2;
        }

        if (
          mouseX > i * 175 + 37.5 &&
          mouseX < i * 175 + 37.5 + 150 &&
          mouseY > j * 75 + 150 &&
          mouseY < j * 75 + 160 + 50
        ) {
          t = 3;
          if (mouseIsPressed == true) {
            t = 5;
          }
        }

        rect(i * 175 + 37.5, j * 75 + 150 + t, 150, 50, 5);

        textSize(20);
        fill(255);
        text(this.pets[i * 5 + j], i * 175 + 110, j * 75 + 180 + t);
      }
    }
  }

  runLogPage() {
    //log in page
    rectMode(CENTER);
    textAlign(CENTER);
    background(30);

    noStroke();

    imageMode(CENTER);
    image(img, width / 2, 80, 60, 60);

    textSize(40);
    fill(100, 180, 255);
    text("LOG IN", width / 2, 150);

    fill(100, 180, 255);
    textStyle(NORMAL);
    textSize(15);
    text("Username", 200, 230);

    noFill();
    stroke(150);
    if (mouseX > 100 && mouseX < 300 && mouseY > 235 && mouseY < 265) {
      fill(50);
    }
    if (this.typing == 1) {
      stroke(190, 210, 220);
      fill(50);
    }
    rect(200, 250, 200, 25, 5);

    noStroke();
    fill(255);
    if (this.username != null) text(this.username, 200, 255);

    noStroke();
    fill(100, 180, 255);
    textStyle(NORMAL);
    textSize(15);
    text("Password", 200, 330);

    noFill();
    stroke(150);
    if (mouseX > 100 && mouseX < 300 && mouseY > 335 && mouseY < 365) {
      fill(50);
    }
    if (this.typing == 2) {
      stroke(190, 210, 220);
      fill(50);
    }
    rect(200, 350, 200, 25, 5);

    noStroke();
    fill(255);
    if (this.password != null) text(this.password, 200, 355);

    if (this.username == "" || this.password == "") {
      noFill();
      stroke(255, 153, 100);
      rect(200, 450, 204, 44, 5);
      fill(100, 180, 255);
    } else {
      noFill();
      stroke(100, 180, 255);
      rect(200, 450, 204, 44, 5);
      fill(200);
    }

    noStroke();
    textStyle(BOLD);
    textSize(20);
    text("Log In", 200, 456);

    if (this.failedToLogIn == true) {
      fill(255, 100, 100);
      rect(200, 506, 210, 45, 10);
      fill(255);
      textSize(10);
      text("failed to log in.\nReason: " + this.failedToLogInReason, 200, 497);
    }
  }

  runPostTypePage() {
    //when you navigate to posts page, this is the in between page.
    //choose to look at recommended content, newest content or most liked content.
    background(30);

    noStroke();
    rectMode(CENTER);
    fill(100, 180, 255);
    if (
      mouseX > width / 2 - 75 &&
      mouseX < width / 2 + 75 &&
      mouseY > height / 2 - 15 &&
      mouseY < height / 2 + 15
    )
      fill(120, 200, 255);
    rect(width / 2, height / 2, 150, 30, 5);

    fill(100, 180, 255);
    if (
      mouseX > width / 2 - 75 &&
      mouseX < width / 2 + 75 &&
      mouseY > height / 2 - 65 &&
      mouseY < height / 2 - 35
    )
      fill(120, 200, 255);
    rect(width / 2, height / 2 - 50, 150, 30, 5);

    fill(100, 180, 255);
    if (
      mouseX > width / 2 - 75 &&
      mouseX < width / 2 + 75 &&
      mouseY > height / 2 - 115 &&
      mouseY < height / 2 - 85
    )
      fill(120, 200, 255);
    rect(width / 2, height / 2 - 100, 150, 30, 5);

    textAlign(CENTER);
    textStyle(BOLD);
    textSize(20);
    fill(30);
    if (
      mouseX > width / 2 - 75 &&
      mouseX < width / 2 + 75 &&
      mouseY > height / 2 - 115 &&
      mouseY < height / 2 - 85
    )
      fill(255);
    text("For You", width / 2, height / 2 - 94);

    fill(30);
    if (
      mouseX > width / 2 - 75 &&
      mouseX < width / 2 + 75 &&
      mouseY > height / 2 - 65 &&
      mouseY < height / 2 - 35
    )
      fill(255);
    text("Popular", width / 2, height / 2 - 44);

    fill(30);
    if (
      mouseX > width / 2 - 75 &&
      mouseX < width / 2 + 75 &&
      mouseY > height / 2 - 15 &&
      mouseY < height / 2 + 15
    )
      fill(255);
    text("Newest", width / 2, height / 2 + 6);
  }

  async runPostsPage() {
    background(30);

    vs1.update();
    vs1.display();

    if (this.postsDisplaying != null) {
      var addSizeVs = 0;
      for (let i = 0; i < this.postsDisplaying.length; i++) {
        var addhitee = this.postsDisplaying[i].getHitee();
        if (i - 1 >= 0) {
          addhitee = this.postsDisplaying[i - 1].getHitee();
        }
        addSizeVs = addSizeVs + addhitee + 25;
      }
      print("yeah", addSizeVs * -1);
      vs1.changeSize(this.postsDisplaying.length, addSizeVs);
    } else {
      vs1.changeSize(0);
      vs1.resetY();
    }

    if (this.postPageView == "Newest") {
      if (this.postsDisplaying == null) {
        this.postsDisplaying = peopleList.createAllPostList().reverse();
      }
      if (this.postsDisplaying != null) {
        var addSizeVs = 0;
        for (let i = 0; i < this.postsDisplaying.length; i++) {
          var addhitee = this.postsDisplaying[i].getHitee();
          if (i - 1 >= 0) {
            addhitee = this.postsDisplaying[i - 1].getHitee();
          }
          addSizeVs = addSizeVs + addhitee + 25;
          this.postsDisplaying[i].update(addSizeVs);
        }
      }
    }
    if (this.postPageView == "ForYou") {
      if (this.postsDisplaying == null) {
        let me = peopleList.getPerson(this.id);
        this.postsDisplaying = peopleList.createNewsFeed(me).reverse();
      }
      if (this.postsDisplaying != null) {
        var addSizeVs = 0;
        for (let i = 0; i < this.postsDisplaying.length; i++) {
          var addhitee = this.postsDisplaying[i].getHitee();
          if (i - 1 >= 0) {
            addhitee = this.postsDisplaying[i - 1].getHitee();
          }
          addSizeVs = addSizeVs + addhitee + 25;
          this.postsDisplaying[i].update(addSizeVs);
        }
      }
    }
    if (this.postPageView == "Popular") {
      if (this.postsDisplaying == null) {
        this.postsDisplaying = await peopleList.createPopularFeed();
      }
      if (this.postsDisplaying != null) {
        var addSizeVs = 0;
        for (let i = 0; i < this.postsDisplaying.length; i++) {
          var addhitee = this.postsDisplaying[i].getHitee();
          if (i - 1 >= 0) {
            addhitee = this.postsDisplaying[i - 1].getHitee();
          }
          addSizeVs = addSizeVs + addhitee + 25;
          this.postsDisplaying[i].update(addSizeVs);
        }
      }
    }
  }

  runMakePostPage() {
    //page to create a new post
    background(30);

    tp.update();
  }

  runAccountPage() {
    //view your account or others here
    let thisName = new Person(1, "Unknown", 0, "", "", []);

    //find the person
    if (this.thisPerson != null) {
      thisName = peopleList.getPerson(this.thisPerson);
    }

    background(30);

    rectMode(CENTER);
    noStroke();

    fill(35);
    rect(width / 2, 80, width, 160);

    //fill(100, 180, 255);
    fill(this.assignColor(thisName.get("name")));
    ellipse(50, 50, 60, 60);

    textAlign(CENTER);
    fill(255);
    textStyle(NORMAL);
    textSize(50);
    text(thisName.get("name").charAt(0), 51, 67);

    textAlign(LEFT);
    textStyle(BOLD);

    textSize(40);
    let textY = 64;

    fill(200);
    text(thisName.get("name"), 100, textY);

    for (let i = 0; i < 3; i++) {
      textAlign(CENTER);
      rectMode(CORNER);
      fill(45);
      rect(50 - 73 / 2, i * 25 + 85, 73, 20, 10);

      textStyle(NORMAL);
      fill(100, 180, 255);
      textSize(15);
      text(thisName.get("hobbies")[i], 50, i * 25 + 100);
    }
    rectMode(CENTER);

    fill(40);
    rect(120, 180, 150, 30, 5);
    rect(280, 180, 150, 30, 5);

    fill(100, 180, 250);

    textStyle(BOLD);
    textSize(20);

    text("VIEW PALS", 280, 187);

    if (this.thisPerson != this.id) {
      if (peopleList.findIfFriend(this.id, this.thisPerson) == false) {
        fill(100, 180, 255);
        if (mouseX > 45 && mouseX < 195 && mouseY > 165 && mouseY < 195)
          fill(120, 200, 255);
        if (
          mouseX > 45 &&
          mouseX < 195 &&
          mouseY > 165 &&
          mouseY < 195 &&
          mouseIsPressed
        )
          fill(50, 100, 150);

        textStyle(BOLD);
        textSize(20);

        text("FOLLOW", 120, 187);
      }

      if (
        peopleList.findIfFriend(this.id, this.thisPerson) == true &&
        peopleList.findIfFriend(this.thisPerson, this.id) == false
      ) {
        fill(180);
        if (mouseX > 45 && mouseX < 195 && mouseY > 165 && mouseY < 195)
          fill(200);
        if (
          mouseX > 45 &&
          mouseX < 195 &&
          mouseY > 165 &&
          mouseY < 195 &&
          mouseIsPressed
        )
          fill(100);

        textStyle(BOLD);
        textSize(20);

        text("FOLLOWING", 120, 187);
      }

      if (
        peopleList.findIfFriend(this.id, this.thisPerson) == true &&
        peopleList.findIfFriend(this.thisPerson, this.id) == true
      ) {
        fill(180);
        if (mouseX > 45 && mouseX < 195 && mouseY > 165 && mouseY < 195)
          fill(200);
        if (
          mouseX > 45 &&
          mouseX < 195 &&
          mouseY > 165 &&
          mouseY < 195 &&
          mouseIsPressed
        )
          fill(100);

        textStyle(BOLD);
        textSize(20);

        text("PALS!", 120, 187);
      }

      if (
        peopleList.findIfFriend(this.thisPerson, this.id) == true &&
        peopleList.findIfFriend(this.id, this.thisPerson) == false
      ) {
        fill(255, 153, 100);
        if (mouseX > 45 && mouseX < 195 && mouseY > 165 && mouseY < 195)
          fill(255, 163, 110);
        if (
          mouseX > 45 &&
          mouseX < 195 &&
          mouseY > 165 &&
          mouseY < 195 &&
          mouseIsPressed
        )
          fill(240, 143, 90);

        textStyle(BOLD);
        textSize(15);

        text("FOLLOW BACK", 120, 187);
      }
    } else {
      textStyle(BOLD);
      textSize(15);
      fill(255, 100, 100)

      text("Delete Account", 120, 185);
    }

    rectMode(CENTER);
    textAlign(LEFT);
    fill(40);
    rect(240, 120, 300, 70, 5);

    textSize(30);
    textStyle(NORMAL);
    fill(180);
    this.wrapText(
      int(thisName.get("age")) +
        " year old, proud " +
        thisName.get("pet") +
        " owner",
      100,
      115,
      270,
      30,
    );
  }

  async runViewPals() {
    background(30);

    textSize(50);
    textStyle(BOLD);
    textAlign(CENTER);
    fill(100, 180, 255);

    text("PALS", width / 2, 50);
    textSize(20);

    this.viewPals = await peopleList.getFollowingStatus(this.thisPerson);

    let addSpace = 0;
    vsp.update();

    push();
    translate(6, vsp.getPos());
    for (let i = 0; i < this.viewPals.both.length; i++) {
      // My Friend

      rectMode(CORNER)
      noStroke()
      fill(38, 80, 120)
      rect(15, i * 50 + 76, 80 + textWidth(this.viewPals.both[i].name), 35, 15)
      
      textAlign(CENTER);
      fill(this.assignColor(this.viewPals.both[i].name));
      ellipse(35, i * 50 + 93, 25, 25);
      fill(255);
      textSize(17);
      textStyle(NORMAL);
      text(this.viewPals.both[i].name.charAt(0), 35, i * 50 + 98);

      noStroke();
      fill(255);
      textStyle(NORMAL);
      textAlign(LEFT);
      textSize(20);

      text(this.viewPals.both[i].name, 70, i * 50 + 100);

      textAlign(RIGHT);
      fill(100, 180, 255);

      let state = ""
      if (peopleList.findIfFriend(this.thisUser.id, this.viewPals.both[i].id) &&
          peopleList.findIfFriend(this.viewPals.both[i].id, this.thisUser.id))
        state = "Pals!"
      else if (peopleList.findIfFriend(this.thisUser.id, this.viewPals.both[i].id))
        state = "Following"
      else
        state = "Follow"

      fill(60)
      if (mouseX > 340 - textWidth(state) && mouseX < 360 && mouseY > i * 50 + 75 + vsp.getPos() && mouseY < i * 50 +110 + vsp.getPos())
      {
        fill(70)
        if (mouseIsPressed)
          fill(50)
      }

      rectMode(CORNERS)
      rect(360, i * 50 + 75, 340 - textWidth(state), i * 50 +110, 10)

      textAlign(RIGHT);
      fill(100, 180, 255);
      
      text(state, 350, i * 50 + 100);

      addSpace = addSpace + 50;
    }
    for (let i = 0; i < this.viewPals.person.length; i++) {
      // My Friend

      rectMode(CORNER)
      noStroke()
      fill(120, 80, 38)
      rect(15, i * 50 + 76 + this.viewPals.both.length * 50, 80 + textWidth(this.viewPals.person[i].name), 35, 15)
      
      textAlign(CENTER);
      fill(this.assignColor(this.viewPals.person[i].name));
      ellipse(35, i * 50 + 93 + this.viewPals.both.length * 50, 25, 25);
      fill(255);
      textSize(17);
      textStyle(NORMAL);
      text(
        this.viewPals.person[i].name.charAt(0),
        35,
        i * 50 + 98 + this.viewPals.both.length * 50,
      );

      noStroke();
      fill(255);
      textStyle(NORMAL);
      textAlign(LEFT);
      textSize(20);

      text(this.viewPals.person[i].name, 70, i * 50 + 100 + this.viewPals.both.length * 50);

      textAlign(RIGHT);
      fill(100, 180, 255);

      let state = ""
      if (peopleList.findIfFriend(this.thisUser.id, this.viewPals.person[i].id) &&
          peopleList.findIfFriend(this.viewPals.person[i].id, this.thisUser.id))
        state = "Pals!"
      else if (peopleList.findIfFriend(this.thisUser.id, this.viewPals.person[i].id))
        state = "Following"
      else
        state = "Follow"
      
      fill(60)
      if (mouseX > 340 - textWidth(state) && mouseX < 360 && mouseY > i * 50 + 75 + this.viewPals.both.length * 50  + vsp.getPos() && mouseY < i * 50 +110 + this.viewPals.both.length * 50 + vsp.getPos())
      {
        fill(70)
        if (mouseIsPressed)
          fill(50)
      }

      rectMode(CORNERS)
      rect(360, i * 50 + 75 + this.viewPals.both.length * 50, 340 - textWidth(state), i * 50 +110 + this.viewPals.both.length * 50, 10)

      textAlign(RIGHT);
      fill(100, 180, 255);
      text(state, 350, i * 50 + 100 + this.viewPals.both.length * 50);

      addSpace = addSpace + 50;
    }
    for (let i = 0; i < this.viewPals.current.length; i++) {
      // My Friend

      rectMode(CORNER)
      noStroke()
      fill(80)
      rect(15, i * 50 + 76 + (this.viewPals.both.length + this.viewPals.person.length) * 50, 80 + textWidth(this.viewPals.current[i].name), 35, 15)
      
      textAlign(CENTER);
      fill(this.assignColor(this.viewPals.current[i].name));
      ellipse(
        35,
        i * 50 + 93 + (this.viewPals.both.length + this.viewPals.person.length) * 50,
        25,
        25,
      );
      fill(255);
      textSize(17);
      textStyle(NORMAL);
      text(
        this.viewPals.current[i].name.charAt(0),
        35,
        i * 50 + 98 + (this.viewPals.both.length + this.viewPals.person.length) * 50,
      );

      noStroke();
      fill(255);
      textStyle(NORMAL);
      textAlign(LEFT);
      textSize(20);

      text(
        this.viewPals.current[i].name,
        70,
        i * 50 + 100 + (this.viewPals.both.length + this.viewPals.person.length) * 50,
      );

      let state = ""
      if (peopleList.findIfFriend(this.thisUser.id, this.viewPals.current[i].id) &&
          peopleList.findIfFriend(this.viewPals.current[i].id, this.thisUser.id))
        state = "Pals!"
      else if (peopleList.findIfFriend(this.thisUser.id, this.viewPals.current[i].id))
        state = "Following"
      else
        state = "Follow"

      fill(60)
      if (mouseX > 340 - textWidth(state) && mouseX < 360 && mouseY > i * 50 + 75 + (this.viewPals.both.length + this.viewPals.person.length) * 50  + vsp.getPos() && mouseY < i * 50 +110 + (this.viewPals.both.length + this.viewPals.person.length) * 50 + vsp.getPos())
      {
        fill(70)
        if (mouseIsPressed)
          fill(50)
      }
        
      rectMode(CORNERS)
      rect(360, i * 50 + 75 + (this.viewPals.both.length + this.viewPals.person.length) * 50, 340 - textWidth(state), i * 50 +110 + (this.viewPals.both.length + this.viewPals.person.length) * 50, 10)
      
      textAlign(RIGHT);
      fill(100, 180, 255);
      text(
        state,
        350,
        i * 50 + 100 + (this.viewPals.both.length + this.viewPals.person.length) * 50,
      );

      addSpace = addSpace + 50;
    }
    pop();
    vsp.display();

    vsp.changeSize(
      this.viewPals.both.length + this.viewPals.person.length + this.viewPals.current.length,
      addSpace,
    );
  }

  //wrap text is for typing inside of boxes. If a sentance is too long and goes outside of the boundaries, it will move it to a new line.
  wrapText(tex, x, y, maxWidth, lineHeight) {
    let words = tex.split(" ");
    let line = "";

    for (let i = 0; i < words.length; i++) {
      let currentWord = words[i];
      let currentWidth = textWidth(currentWord);

      if (currentWidth > maxWidth) {
        // If the word is longer than the maxWidth, break it into segments
        let segments = this.splitLongWord(currentWord, maxWidth);
        for (let segment of segments) {
          let testLine = line + segment + " ";
          let testWidth = textWidth(testLine.trim());
          if (testWidth > maxWidth && line !== "") {
            // Draw the line if it exceeds maxWidth
            text(line.trim(), x, y);
            line = segment + " "; // Start a new line
            y += lineHeight; // Move to the next line
          } else {
            line = testLine;
          }
        }
      } else {
        let testLine = line + currentWord + " ";
        let testWidth = textWidth(testLine.trim());
        if (testWidth > maxWidth && line !== "") {
          // Draw the line if it exceeds maxWidth
          text(line.trim(), x, y);
          line = currentWord + " "; // Start a new line
          y += lineHeight; // Move to the next line
        } else {
          line = testLine;
        }
      }
    }
    text(line.trim(), x, y); // Draw the last line
    this.hite = y; // Update the hite property
  }

  //wrapText(this.words, 50, 110, width - 100, 20)

  viewProfile() {
    //if the user is signed in, swich to account page
    if (this.isAccount == true) {
      this.page = "account";
    }
  }

  seeNewPost() {
    this.postPageView = "Newest";
    this.page = "posts";
    this.postsDisplaying = null;
  }

  async mouseRelease() {
    if (dist(mouseX, mouseY, 25, 575) < 10) {
      //if clicked on debug circle
      if (this.page == "debug") {
        //if already on debug page
        if (this.isAccount == false) {
          //if the user is signed in, bring them to the home page
          this.page = "start";
        } else {
          //if not signed in, bring them to the start page
          this.page = "home";
        }
      } else {
        //if not on the debug page, go to debug page
        this.page = "debug";
        boop();
      }
    }

    if (this.isAccount == true) {
      //if signed in
      if (this.page == "home") {
        if (300 < mouseY && mouseY < 330) {
          if (75 < mouseX && mouseX < 125) {
            //if clicks on posts
            this.page = "postType";
          }

          if (150 < mouseX && mouseX < 230) {
            tp = new PostCreator(this.id, 0, this.username, " ", null, 200);
            //if clicks "make post"
            this.page = "makePost";
          }

          if (260 < mouseX && mouseX < 320) {
            this.thisPerson = this.id;
            //if clicks account page
            this.page = "account";
          }
        }

        for (let i = 0; i < 3; i++) {
          if (dist(mouseX, mouseY, i * 125 + 75, 565) < 30) {
            peopleList.friendPerson(this.id, this.recommends[i]);
          }
        }
      }

      if (this.page == "account" && this.thisPerson != this.id) {
        if (mouseX > 45 && mouseX < 195 && mouseY > 165 && mouseY < 195) {
          let personFriend = peopleList.getPerson(this.thisPerson);
          print(this.thisPerson,peopleList.findIfFriend(this.id, personFriend))
          if (peopleList.findIfFriend(this.id, this.thisPerson) == true)  {
            peopleList.unfriendPerson(this.id, personFriend);
          } else {
            peopleList.friendPerson(this.id, personFriend);
          }
          //follow button
        }
      }

      if (this.page == "delete1")
      {
        //rect(width/2, height/2, 275, 125, 10)
        //rect(width/2, height/2+ 90, 200, 40, 10)
        if (mouseX > width/2 - 275/2 && mouseX < width/2 + 275/2 && mouseY > height/2 - 125/2 && mouseY < height/2 + 125/2)
        {
          this.page = "account"
        }
        else if (mouseX > width/2 - 200/2 && mouseX < width/2 + 200/2 && mouseY > height/2 + 70 && mouseY < height/2 + 110)
        {
          //here theo
          this.isAccount = false;
          this.page = "start"
          db.method("delete",[this.username,this.password])
          peopleList.removePerson(this.thisUser)
        }
      }

      if (this.page == "search")
      {
        let names = []

        if (this.searchFor.length > 0)
        {
          names = peopleList.getName(this.searchFor)
        }

        if (mouseX > 250 && mouseX < 350) {
          for (let i = 0;i < names.length; i++) {
            if (
              mouseY > i * 50 + 80 &&
              mouseY < i * 50 + 100) {
              if (peopleList.findIfFriend(this.thisUser.id, names[i].id) == true)
              {
                peopleList.unfriendPerson(this.thisUser.id, names[i].id)
              }
              else if (peopleList.findIfFriend(this.thisUser.id, names[i].id) == false)
              {
                print(names[i])
                peopleList.friendPerson(this.thisUser.id, names[i])
              }
            }
          }
        }

        if (mouseX > 50 && mouseX < 150)
        {
          for (let i = 0; i < names.length; i++)
            {
              if (mouseY > i * 50 + 80 &&
                  mouseY < i * 50 + 100)
              {
                this.thisPerson = names[i].id;
                this.page = "account"
              }
            }
        }
      }

      if (this.page == "viewPals") {

        if (mouseX > 250 && mouseX < 350) {
          for (let i = 0;i < this.viewPals.master.length; i++) {
            if (
              mouseY > i * 50 + 80 + vsp.getPos() &&
              mouseY < i * 50 + 100 + vsp.getPos()
            ) {
              if (i < this.viewPals.both.length) {
                peopleList.unfriendPerson(this.thisUser.id, this.viewPals.master[i]);
              } else if (i < this.viewPals.both.length + this.viewPals.person.length) {
                peopleList.unfriendPerson(this.thisUser.id, this.viewPals.master[i]);
              }
              else {
                peopleList.friendPerson(this.thisUser.id, this.viewPals.master[i])
              }
            }
          }
        }

        if (mouseX > 50 && mouseX < 150)
        {
          for (let i = 0;i < this.viewPals.master.length; i++)
            {
              if (mouseY > i * 50 + 80 + vsp.getPos() &&
                  mouseY < i * 50 + 100 + vsp.getPos())
              {
                this.thisPerson = this.viewPals.master[i].id;
                this.page = "account"
              }
            }
        }
      }

      if (this.page == "account") {
        if (mouseX > 205 && mouseX < 355 && mouseY > 165 && mouseY < 195) {
          this.page = "viewPals";
        }

        if (mouseX > 45 && mouseX < 195 && mouseY > 165 && mouseY < 195)
        {
          this.page = "delete1";
        }
      }

      if (this.page == "postType") {
        if (
          mouseX > width / 2 - 75 &&
          mouseX < width / 2 + 75 &&
          mouseY > height / 2 - 115 &&
          mouseY < height / 2 - 85
        ) {
          //top
          this.postPageView = "ForYou";
          this.page = "posts";
          this.postsDisplaying = null;
        }

        if (
          mouseX > width / 2 - 75 &&
          mouseX < width / 2 + 75 &&
          mouseY > height / 2 - 65 &&
          mouseY < height / 2 - 35
        ) {
          //middle
          this.postPageView = "Popular";
          this.page = "posts";
          this.postsDisplaying = null;
        }

        if (
          mouseX > width / 2 - 75 &&
          mouseX < width / 2 + 75 &&
          mouseY > height / 2 - 15 &&
          mouseY < height / 2 + 15
        ) {
          //bottom
          this.postPageView = "Newest";
          this.page = "posts";
          this.postsDisplaying = null;
        }
      }

      //can access message, posts, account, and create posts

      if (dist(mouseX, mouseY, 25, 25) < 30)
      {
        if (this.page != "search")
        {
          this.searchFor = ""
          this.tempSize = 0
          this.tempSizeInc = 1
          this.page = "search"
        }
        else if (this.page == "search")
        {
          this.page = this.pagePrev
        }
      }
      
      if (this.page != "home") {
        if (dist(mouseX, mouseY, 375, 25) < 15) {
          this.page = "home";
        }

        if (dist(mouseX, mouseY, 300, 575) < 15) {
          this.thisPerson = this.id;
          this.page = "account";
        }

        if (dist(mouseX, mouseY, 100, 575) < 15) {
          this.page = "postType";
        }

        if (mouseX > 180 && mouseX < 220 && mouseY > 560 && mouseY < 590) {
          tp = new PostCreator(this.id, 0, this.username, " ", null, 200);

          this.page = "makePost";
        }
      }
    }

    if (this.page == "signin") {
      if (dist(mouseX, mouseY, width / 2, 70) < 30) {
        this.page = "start";
      }

      if (mouseX > 100 && mouseX < 300 && mouseY > 135 && mouseY < 165) {
        this.typing = 1;
        return false;
      }
      if (mouseX > 100 && mouseX < 300 && mouseY > 235 && mouseY < 265) {
        this.typing = 2;
        return false;
      }
      if (mouseX > 100 && mouseX < 300 && mouseY > 335 && mouseY < 365) {
        this.typing = 3;
        return false;
      }

      if (mouseX > 100 && mouseX < 300 && mouseY > 430 && mouseY < 470) {
        if (this.username != "" && this.password != "" && this.age != "") {
          this.page = "petType";
        }
        this.typing = 0;
        return true;
      }
    }

    if (this.page == "login") {
      if (dist(mouseX, mouseY, width / 2, 80) < 30) {
        this.page = "start";
      }

      if (mouseX > 100 && mouseX < 300 && mouseY > 235 && mouseY < 265) {
        this.typing = 1;
        return false;
      }
      if (mouseX > 100 && mouseX < 300 && mouseY > 335 && mouseY < 365) {
        this.typing = 2;
        return false;
      }

      if (mouseX > 100 && mouseX < 300 && mouseY > 430 && mouseY < 470) {
        if (this.username != "" && this.password != "") {
          //if correct u and p
          peopleList.localLogin();
        }
        this.typing = 0;
        return true;
      }
    }

    //rect(200, 150, 200, 25, 5);
    //rect(200, 250, 200, 25, 5);
    //rect(200, 350, 200, 25, 5);

    if (this.page == "hobbies") {
      if (
        mouseX > 135 &&
        mouseX < 265 &&
        mouseY > 105 &&
        mouseY < 135 &&
        this.hobbys.length == 3
      ) {
        if (this.isAccount == false) {
          /*this.thisUser = new Person(
            this.id,
            this.username,
            "Loading",
            this.pet,
            this.hobbies,
          );
          this.thisPerson = this.username;
          */
          peopleList.createPerson(
            [1, this.username, this.age, this.pet, this.hobbys],
            [this.username, this.password],
          );

          //allFriend(person);
        }
        this.page = "buffer";
        this.isAccount = true;
        // create account
        return;
      }

      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 5; j++) {
          if (
            mouseX > i * 175 + 37.5 &&
            mouseX < i * 175 + 37.5 + 150 &&
            mouseY > j * 75 + 150 &&
            mouseY < j * 75 + 160 + 50
          ) {
            if (this.hobbySelect[i * 5 + j] == true) {
              this.hobbys.splice(this.hobbies[i * 5 + j], 1);
              this.hobbySelect[i * 5 + j] = false;
            } else if (this.hobbys.length < 3) {
              this.hobbys.push(this.hobbies[i * 5 + j]);
              this.hobbySelect[i * 5 + j] = true;
            }
          }
        }
      }
    }

    if (this.page == "petType") {
      if (
        mouseX > 135 &&
        mouseX < 265 &&
        mouseY > 105 &&
        mouseY < 135 &&
        this.pet != ""
      ) {
        this.page = "hobbies";
        return;
      }

      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 5; j++) {
          if (
            mouseX > i * 175 + 37.5 &&
            mouseX < i * 175 + 37.5 + 150 &&
            mouseY > j * 75 + 150 &&
            mouseY < j * 75 + 160 + 50
          ) {
            if (this.pets[i * 5 + j] == this.pet) {
              this.pet = "";
            } else if (this.pet == "") {
              this.pet = this.pets[i * 5 + j];
            }
          }
        }
      }
    }
  }

  runMethod(method, args) {
    if (method == "correctLogin") {
      this.isAccount = true;
      this.page = "home";
      this.thisUser = args;
      this.id = args.id;
      this.thisPerson = args.id;
    }
    if (method == "correctSignup") {
      this.isAccount = true;
      this.page = "home";
      this.thisUser = args;
      this.id = args.id;
      this.thisPerson = args.id;
    }
    if (method == "signupFail") {
      this.page = "signin";
      this.failedToSignUp = true;
      this.failedToSignUpReason = "User taken >:(";
      this.username = "";
      this.password = "";
    }
    if (method == "loginFail") {
      // login failed
      this.failedToLogIn = true;
      this.failedToLogInReason =
        "Username and/or password does\nnot match account in our system.";
    }
  }

  updateUIPost(po) {
    for (let i = 0; i < this.postsDisplaying.length; i++) {
      if (this.postsDisplaying[i].id == po.id) {
        this.postsDisplaying[i] = po;
      }
    }
  }
}

function keyTyped() {
  if (ui.get("page") == "signin") if (key != "Enter") ui.addToKey(key);

  if (ui.get("page") == "login") if (key != "Enter") ui.addToKey(key);

  if (ui.get("page") == "search" && key != "Enter")
    ui.addToKey(key)

  if (tp != null) if (key != "Enter") tp.addToKey(key);
}

function keyPressed() {
  keyPressedM();
  if (keyCode == BACKSPACE) {
    if (ui.get("page") == "signin") {
      ui.backspace();
    }
    if (ui.get("page") == "login") {
      ui.backspace();
    }

    if (ui.get("page") == "search")
      ui.backspace()

    if (tp != null) tp.backspace();
  }
}

function mouseReleased() {
  ui.mouseRelease();
  // if (post != null && ui.get("postsPage") == true)             post.mouseRelease();

  if (ui.get("page") == "makePost") tp.mouseRelease();

  if (ui.get("postsDisplaying") != null && ui.get("page") == "posts") {
    for (let i = 0; i < ui.get("postsDisplaying").length; i++) {
      ui.get("postsDisplaying")[i].mouseRelease();
    }
  }
}

function mouseWheel(event) {
  // Change the background color
  // based on deltaY.

  if (ui.get("postsDisplaying") != null) {
    for (let i = 0; i < ui.get("postsDisplaying").length; i++) {
      if (event.deltaY > 0) {
        ui.get("postsDisplaying")[i].down();
      } else if (event.deltaY < 0) {
        ui.get("postsDisplaying")[i].up();
      }
    }
  }

  if (event.deltaY > 0) {
    vs1.scroll("down");
  } else if (event.deltaY < 0) {
    vs1.scroll("up");
  }

  if (event.deltaY > 0) {
    vsp.scroll("down");
  } else if (event.deltaY < 0) {
    vsp.scroll("up");
  }
}

class PostCreator extends Post {
  constructor(id, who, words, img, likes) {
    super(id, who, words, img, likes);

    this.hite = 85;

    this.yscroll = 0;

    this.next = null;

    this.typing = false;
  }

  display() {
    push();
    translate(0, 100);
    textAlign(LEFT);

    rectMode(CORNER);
    fill(40);
    noStroke();
    rect(25, 25, width - 50, this.hite, 20);

    fill(ui.assignColor(this.who));
    ellipse(65, 60, 40, 40);

    textAlign(CENTER);
    fill(255);
    textSize(25);
    text(this.who.charAt(0), 65, 68);

    rectMode(CORNER);
    fill(50);
    textSize(20);
    rect(95, 40, textWidth(this.who) + 20, 35, 10);

    rectMode(CORNER);
    fill(50);
    if (
      mouseX > 40 &&
      mouseX < 360 &&
      mouseY > 190 &&
      mouseY < 190 + this.hite - 80
    )
      fill(60);
    if (this.typing) stroke(100, 180, 255);

    rect(40, 90, 320, this.hite - 80, 10);

    noStroke();
    textAlign(LEFT);
    textStyle(BOLD);
    fill(200);
    textSize(15);

    this.wrapText(this.words, 50, 110, width - 100, 20);

    textAlign(LEFT);
    textStyle(BOLD);
    fill(100, 180, 255);
    noStroke();
    textSize(20);
    text(this.who, 105, 65);

    rectMode(CENTER);
    noStroke();

    fill(20);
    rect(200, this.hite + 80, 150, 50, 10);

    push();
    fill(100, 180, 255);
    if (
      mouseX > 125 &&
      mouseX < 275 &&
      mouseY > 100 + this.hite + 45 &&
      mouseY < 100 + this.hite + 95
    ) {
      translate(0, 3);

      if (mouseIsPressed) {
        translate(0, 2);
      }
    }

    rect(200, this.hite + 70, 150, 50, 10);

    fill(50);
    textAlign(CENTER);
    textSize(25);

    text("POST", 200, this.hite + 80);

    fill(255);
    textAlign(CENTER);
    textSize(25);

    text("POST", 200, this.hite + 77);

    pop();
    pop();
  }

  mouseRelease() {
    if (
      mouseX > 40 &&
      mouseX < 360 &&
      mouseY > 190 &&
      mouseY < 190 + this.hite - 80
    ) {
      this.typing = true;
    } else this.typing = false;

    if (
      mouseX > 125 &&
      mouseX < 275 &&
      mouseY > 100 + this.hite + 45 &&
      mouseY < 100 + this.hite + 95
    ) {
      this.typing = false;
      let personA = peopleList.getPerson(this.id);
      if (personA != null && this.words != " ") {
        personA.createPost(this.words);
        ui.seeNewPost();
      }
    }

    //rect(40, 90, 320, this.hite - 80, 10);
  }

  addToKey(k) {
    if (this.typing == true && this.key == ENTER) {
      print("do");
      this.splitLongWord("", width - 100);
    } else if (this.typing == true) this.words += k;
  }

  backspace() {
    if (this.typing == true) {
      this.words = this.words.substr(0, this.words.length - 1);
    }
  }
}

function VScrollbar(xp, yp, sw, sh, l) {
  this.swidth = sw; // width and height of bar
  this.sheight = sh - 15;
  var heighttowidth = sh - sw;
  this.ratio = (sh / heighttowidth) * 2;
  this.xpos = xp - this.swidth / 2; // x and y position of bar
  this.ypos = yp;
  this.spos = this.ypos + 5; // Set slider position to the top
  this.newspos = this.spos;
  this.sposMin = this.ypos - 0.1; // max and min values of slider
  this.sposMax = 500;
  this.loose = l; // how loose/heavy
  this.over = false; // is the mouse over the slider?
  this.locked = false;
  this.itemAmount = 0;

  this.downFix = 0;

  this.update = function () {
    if (this.overEvent()) {
      this.over = true;
    } else {
      this.over = false;
    }
    if (mouseIsPressed && this.over) {
      this.locked = true;
    }
    if (!mouseIsPressed) {
      this.locked = false;
    }
    if (this.locked) {
      this.newspos = constrain(
        mouseY - this.swidth / 2,
        this.sposMin,
        this.sposMax,
      );
    }
    if (abs(this.newspos - this.spos) > 1) {
      this.spos = this.spos + (this.newspos - this.spos) / this.loose;
    }

    if (this.spos <= this.sposMin + 2 && this.sposMin < 5) {
      this.spos = 0;
    }

    //print(this.spos, this.sposMin, this.sposMax, this.swidth, this.ratio);
  };

  this.up = function () {
    // Move the slider up by reducing its ypos
    this.newspos = constrain(this.spos - 30, this.sposMin, this.sposMax);
  };

  this.down = function () {
    // Move the slider down by increasing its ypos
    this.newspos = constrain(this.spos + 30, this.sposMin, this.sposMax);
  };

  this.constrain = function (val, minv, maxv) {
    return min(max(val, minv), maxv);
  };

  this.overEvent = function () {
    if (
      mouseX > this.xpos - 5 &&
      mouseX < this.xpos - 5 + this.swidth &&
      mouseY > this.ypos &&
      mouseY < this.ypos + this.sheight
    ) {
      return true;
    } else {
      return false;
    }
  };

  this.display = function () {
    noStroke();
    fill(204);
    rect(this.xpos, this.ypos, this.swidth, this.sheight);
    if (this.over || this.locked) {
      fill(0, 0, 0);
    } else {
      fill(102, 102, 102);
    }
    rect(
      this.xpos,
      this.spos + this.sheight / this.itemAmount / 2,
      this.swidth,
      this.sheight / this.itemAmount,
    );
  };

  this.getPos = function () {
    // Convert spos to be values between
    // 0 and the total height of the scrollbar
    return -(this.spos - this.ypos) * this.ratio;
  };

  this.changeSize = function (numElements, boxSize) {
    // Adjust scrollbar size based on the number of elements and box size
    //print(this.spos, this.sposMax, numElements);
    this.sheight = boxSize;
    this.sposMin = 0;
    this.ratio = numElements / 2;
    this.sposMax = boxSize / this.ratio;
    this.itemAmount = numElements;

    if (this.sheight < 0) {
      this.sheight = this.sheight * -1;
    }
    if (this.sposMax < 0) {
      this.sposMax = this.sposMax * -1;
    }
  };

  this.overEvent = function () {
    if (
      mouseX > this.xpos - 5 &&
      mouseX < this.xpos - 5 + this.swidth &&
      mouseY > this.ypos &&
      mouseY < this.ypos + this.sheight
    ) {
      return true;
    } else {
      return false;
    }
  };

  this.scroll = function (dir) {
    if (dir === "up") {
      this.newspos = constrain(this.spos - 30, this.sposMin, this.sposMax);
    } else if (dir === "down") {
      this.newspos = constrain(this.spos + 30, this.sposMin, this.sposMax);
    }
  };

  this.resetY = function () {
    this.ypos = 0;
    this.spos = this.ypos;
    this.newspos = constrain(this.spos, this.sposMin, this.sposMax);
  };
}
