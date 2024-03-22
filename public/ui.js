let tp;

let post;

class UI {
  constructor() {
    this.isAccount = false;

    this.startPage = true;
    this.signInPage = false;
    this.loginPage = false
    this.hobbiesPage = false;
    this.petTypePage = false;
    this.postTypePage = false;
    this.postsPage = false;
    this.messagingPage = false;
    this.textPage = false;
    this.makePostPage = false;
    this.accountPage = false;
    this.debugPage = false;
    this.bufferPage = false

    this.postPageView = "ForYou";

    this.typing = 0;

    this.id = "";
    this.username = "";
    this.pet = "";
    this.password = "";
    this.age = "";
    this.hobbys = [];
    this.thisPerson = this.id;

    this.postsDisplaying = null;

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
    if (this.debugPage) {
      this.runDebugPage();
      return;
    }

    if (this.startPage) {
      this.runStartPage();
    }
    
    if (this.loginPage) {
      this.runLogPage();
    }
    
    if (this.signInPage) {
      this.runSignPage();
    }

    if (this.hobbiesPage) {
      this.runHobbiesPage();
    }

    if (this.bufferPage) {
      this.runBufferPage();
    }

    if (this.petTypePage) {
      this.runPetSelectionPage();
    }

    if (this.postsPage) {
      this.runPostsPage();
    }

    if (this.postTypePage) {
      this.runPostTypePage();
    }

    if (this.messagingPage) {
      this.runMessagingPage();
    }

    if (this.textPage) {
      this.runTextPage();
    }

    if (this.makePostPage) {
      this.runMakePostPage();
    }

    if (this.accountPage) {
      this.runAccountPage();
    }

    this.runBottomMenu();
  }

  runDebugPage() {
    rectMode(CENTER);
    textAlign(CENTER);
    background(30);
    this.runBottomMenu();
    drawNodeList();
    testShowAll();
  }

  runBottomMenu() {
    fill(255, 0, 0);
    ellipse(15, 15, 20, 20);

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
      stroke(230, 240, 255);
      strokeWeight(2);
    } else {
      stroke(100, 180, 255);
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

    fill(40);

    stroke(200);
    if (dist(mouseX, mouseY, 370, 25) < 25) stroke(100, 180, 255);
    strokeWeight(3);

    rect(370, 25, 40, 25, 5);

    stroke(40);
    line(368, 35, 357, 45);

    stroke(200);

    if (dist(mouseX, mouseY, 370, 25) < 25) stroke(100, 180, 255);

    line(360, 38, 357, 45);
    line(370, 38, 357, 45);
  }

  runStartPage()
  {
    background(30);

    imageMode(CENTER)
    image(img, width/2, height/2 - 35, 200, 200)

    noStroke()
    fill(255);
    textStyle(BOLD)
    textAlign(CENTER);
    textSize(40);
    text("Welcome to", width/2, height/2 - 150);

    textSize(20);
    text("sign up", 250, 400)
    
    fill(100, 180, 255)
    text("log in", 150, 400)
    if (mouseIsPressed && dist(mouseX, mouseY, 150, 400) < 20) {
      this.startPage = false;
      this.loginPage = true;
    }

    if (mouseIsPressed && dist(mouseX, mouseY, 250, 400) < 20) {
      this.startPage = false;
      this.signInPage = true;
    }
  }

  runMessagingPage() {
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

  runBufferPage
  {
    background(30);

    noFill();
    stroke(100, 180, 255)
    strokeWeight(3)


    translate(width/2, height/2)
    rotate(cos(millis()/1000))
    // Bottom-right.
    arc(0, 0, 50, 50, 0, HALF_PI)

    push()
    rotate(tan(millis()/6000))
    // Bottom-left.
    arc(0, 0, 60, 60, HALF_PI, PI);
    pop()

    rotate(cos(millis()/1000))
    // Top-left.
    arc(0, 0, 70, 70, PI, PI + QUARTER_PI);

    rotate(tan(millis()/5000))
    // Top-right.
    arc(0, 0, 80, 80, PI + QUARTER_PI, TWO_PI);
  }

  runSignPage() {
    rectMode(CENTER);
    textAlign(CENTER);
    background(30);

    imageMode(CENTER)
    image(img, width/2, 70, 60, 60)
    
    noStroke();
    fill(200);
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
    fill(200);
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

    if (this.username == "" || this.password == "" || this.age == "") {
      noFill();
      stroke(200, 150, 150);
      rect(200, 450, 204, 44, 5);
      fill(200, 100, 100);
    } else {
      noFill();
      stroke(100, 255, 100);
      rect(200, 450, 204, 44, 5);
      fill(200);
    }

    noStroke();
    textStyle(BOLD);
    textSize(20);
    text("Next", 200, 456);
  }

  addToKey(k) {
    if (this.typing == 1 && textWidth(this.username) < 275) this.username += k;
    if (this.typing == 2 && textWidth(this.password) < 275) this.password += k;
    if (this.typing == 3 && textWidth(this.age) < 20 && key >= 0 && key <= 9)
      this.age += k;
  }

  backspace() {
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
    rectMode(CENTER);
    textAlign(CENTER);
    background(30);

     noStroke();

    imageMode(CENTER)
    image(img, width/2, 80, 60, 60)
    
    textSize(40)
    fill(100, 180, 255)
    text("LOG IN", width/2, 150)
    
    fill(200)
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
    fill(200);
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
      stroke(200, 150, 150);
      rect(200, 450, 204, 44, 5);
      fill(200, 100, 100);
    } else {
      noFill();
      stroke(100, 255, 100);
      rect(200, 450, 204, 44, 5);
      fill(200);
    }

    noStroke();
    textStyle(BOLD);
    textSize(20);
    text("Next", 200, 456);
  }

  runPostTypePage() {
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
        addSizeVs = addSizeVs - i * 130 + addhitee;
      }
      vs1.changeSize(this.postsDisplaying.length, addSizeVs);
    } else {
      vs1.changeSize(0);
      vs1.resetY();
    }

    if (this.postPageView == "Newest") {
      if (this.postsDisplaying == null) {
        this.postsDisplaying = peopleList.createAllPostList();
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
        this.postsDisplaying = peopleList.createNewsFeed(me);
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
      // print(this.postsDisplaying)
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
    background(30);

    tp.update();
  }

  runAccountPage() {
    let thisName = "";

    //find the person

    thisName = peopleList.getPerson(this.thisPerson);

    background(30);

    rectMode(CENTER);
    noStroke();

    fill(35);
    rect(width / 2, 80, width, 160);

    fill(100, 180, 255);

    ellipse(50, 50, 60, 60);

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

    if (this.thisPerson != this.id) {
      rectMode(CENTER);

      fill(40);
      rect(120, 180, 150, 30, 5);
      rect(280, 180, 150, 30, 5);

      fill(100, 180, 250);

      textStyle(BOLD);
      textSize(20);

      text("MESSAGE", 280, 187);

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

        text("FRIENDS", 120, 187);
      }
    }

    rectMode(CENTER);
    textAlign(LEFT)
    fill(40);
    rect(240, 120, 300, 70, 5);

    textSize(30)
    textStyle(NORMAL);
    fill(180);
    this.wrapText(
      int(thisName.get("age")) +
        " year old, proud " +
        thisName.get("pet") +
        " owner",
      100, 115, 270, 30
    );
  }

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
    this.signInPage = false;
    this.hobbiesPage = false;
    this.postsPage = false;
    this.postTypePage = false;
    this.makePostPage = false;
    this.messagingPage = false;
    this.accountPage = true;
    this.textPage = false;
  }

  async mouseRelease() {
    if (dist(mouseX, mouseY, 15, 15) < 10) {
      this.debugPage = !this.debugPage;
    }

    if (this.isAccount == true) {
      if (this.accountPage && this.thisPerson != this.id) {
        if (mouseX > 45 && mouseX < 195 && mouseY > 165 && mouseY < 195) {
          let personFriend = peopleList.getPerson(this.thisPerson);
          print(personFriend);
          peopleList.friendPerson(this.id, personFriend);
          //follow button
        }
      }

      if (this.postTypePage) {
        if (
          mouseX > width / 2 - 75 &&
          mouseX < width / 2 + 75 &&
          mouseY > height / 2 - 115 &&
          mouseY < height / 2 - 85
        ) {
          //top
          this.postPageView = "ForYou";
          this.postsPage = true;
          this.postTypePage = false;
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
          this.postsPage = true;
          this.postTypePage = false;
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
          this.postsPage = true;
          this.postTypePage = false;
          this.postsDisplaying = null;
        }
      }

      //can access message, posts, account, and create posts
      if (dist(mouseX, mouseY, 370, 25) < 25) {
        this.signInPage = false;
        this.hobbiesPage = false;
        this.postsPage = false;
        this.postTypePage = false;
        this.makePostPage = false;
        this.accountPage = false;
        this.messagingPage = true;
        this.textPage = false;
      }

      if (dist(mouseX, mouseY, 300, 575) < 15) {
        this.signInPage = false;
        this.hobbiesPage = false;
        this.postsPage = false;
        this.postTypePage = false;
        this.makePostPage = false;
        this.messagingPage = false;
        this.thisPerson = this.id;
        this.accountPage = true;
        this.textPage = false;
      }

      if (dist(mouseX, mouseY, 100, 575) < 15) {
        this.signInPage = false;
        this.hobbiesPage = false;
        this.postsPage = false;
        this.postTypePage = true;
        this.makePostPage = false;
        this.accountPage = false;
        this.messagingPage = false;
        this.textPage = false;
      }

      if (mouseX > 180 && mouseX < 220 && mouseY > 560 && mouseY < 590) {
        this.signInPage = false;
        this.hobbiesPage = false;
        this.postsPage = false;
        this.postTypePage = false;
        this.accountPage = false;
        this.messagingPage = false;
        this.textPage = false;

        tp = new PostCreator(this.id, this.username, " ", null, 200);

        this.makePostPage = true;
      }
    }

    if (this.signInPage) {
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
          this.petTypePage = true;
          this.signInPage = false;
        }
        this.typing = 0;
        return true;
      }
    }

    if (this.loginPage) {
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


          // 
        }
        this.typing = 0;
        return true;
      }
    }

    //rect(200, 150, 200, 25, 5);
    //rect(200, 250, 200, 25, 5);
    //rect(200, 350, 200, 25, 5);

    if (this.hobbiesPage) {
      if (
        mouseX > 135 &&
        mouseX < 265 &&
        mouseY > 105 &&
        mouseY < 135 &&
        this.hobbys.length == 3
      ) {
        if (this.isAccount == false) {
          this.thisPerson = new Person(this.id, this.username, "Loading", this.pet, this.hobbies)
          peopleList.createPerson([1, this.username, this.age, this.pet],[this.username,this.password])
          //allFriend(person);
          print("do action");
        }
        this.hobbiesPage = false;
        this.bufferPage = true;
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

    if (this.petTypePage) {
      if (
        mouseX > 135 &&
        mouseX < 265 &&
        mouseY > 105 &&
        mouseY < 135 &&
        this.pet != ""
      ) {
        this.petTypePage = false;
        this.hobbiesPage = true;
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

  updateUIPost(po) {
    for (let i = 0; i < this.postsDisplaying.length; i++) {
      if (this.postsDisplaying[i].id == po.id) {
        this.postsDisplaying[i] = po;
      }
    }
  }
}

function keyTyped() {
  if (ui.signInPage == true) if (key != "Enter") ui.addToKey(key);

  if (ui.loginPage == true) if (key != "Enter") ui.addToKey(key);

  if (tp != null) if (key != "Enter") tp.addToKey(key);
}

function keyPressed() {
  keyPressedM();
  if (keyCode == BACKSPACE) {
    if (ui.signInPage == true) {
      ui.backspace();
    }
    if (ui.loginPage == true) {
      ui.backspace();
    }

    if (tp != null) tp.backspace();
  }
}

function mouseReleased() {
  ui.mouseRelease();
  if (post != null) post.mouseRelease();

  if (tp != null) tp.mouseRelease();

  if (ui.postsDisplaying != null) {
    for (let i = 0; i < ui.postsDisplaying.length; i++) {
      ui.postsDisplaying[i].mouseRelease();
    }
  }
}

function mouseWheel(event) {
  // Change the background color
  // based on deltaY.
  if (ui.postsPage == true && post != null) {
    if (event.deltaY > 0) {
      post.down();
    } else if (event.deltaY < 0) {
      post.up();
    }
  }
  if (ui.postsDisplaying != null) {
    for (let i = 0; i < ui.postsDisplaying.length; i++) {
      if (event.deltaY > 0) {
        ui.postsDisplaying[i].down();
      } else if (event.deltaY < 0) {
        ui.postsDisplaying[i].up();
      }
    }
  }

  if (event.deltaY > 0) {
    vs1.down();
  } else if (event.deltaY < 0) {
    vs1.up();
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
    textAlign(LEFT);

    rectMode(CORNER);
    fill(40);
    noStroke();
    rect(25, 25, width - 50, this.hite, 20);

    fill(100, 180, 255);
    ellipse(65, 60, 40, 40);

    rectMode(CORNER);
    fill(50);
    textSize(20);
    rect(95, 40, textWidth(this.who) + 20, 35, 10);

    rectMode(CORNER);
    fill(50);
    if (
      mouseX > 40 &&
      mouseX < 360 &&
      mouseY > 90 &&
      mouseY < 90 + this.hite - 80
    )
      fill(60);
    if (this.typing) stroke(100, 180, 255);

    rect(40, 90, 320, this.hite - 80, 10);

    noStroke();
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
      mouseY > this.hite + 45 &&
      mouseY < this.hite + 95
    ) {
      translate(0, 3);
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
  }

  mouseRelease() {
    if (
      mouseX > 40 &&
      mouseX < 360 &&
      mouseY > 90 &&
      mouseY < 90 + this.hite - 80
    ) {
      this.typing = true;
    } else this.typing = false;

    if (
      mouseX > 125 &&
      mouseX < 275 &&
      mouseY > this.hite + 45 &&
      mouseY < this.hite + 95
    ) {
      this.typing = false;
      print(this.id);
      let personA = peopleList.getPerson(this.id);
      allFriend(personA);
      if (personA != null) {
        personA.createPost(this.words);
      }
    }

    //rect(40, 90, 320, this.hite - 80, 10);
  }

  addToKey(k) {
    if (this.typing == true) this.words += k;
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
  this.spos = this.ypos; // Set slider position to the top
  this.newspos = this.spos;
  this.sposMin = this.ypos; // max and min values of slider
  this.sposMax = this.ypos + this.sheight - this.swidth;
  this.loose = l; // how loose/heavy
  this.over = false; // is the mouse over the slider?
  this.locked = false;
  this.itemAmount = 0;

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
      mouseX > this.xpos &&
      mouseX < this.xpos + this.swidth &&
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

  this.changeSize = function (numElements, extraSize) {
    // Adjust scrollbar size based on the number of elements
    var scrollbarHeight = this.sheight;
    var scrollbarWidth = this.swidth;
    var heighttowidth = scrollbarHeight - scrollbarWidth;
    var lengt = this.sheight / numElements;
    this.ratio = numElements;
    this.spoxMin = 0;
    this.sposMax = this.sheight;
    this.itemAmount = numElements;
  };

  this.resetY = function () {
    this.ypos = 0;
    this.spos = this.ypos;
    this.newspos = constrain(this.spos, this.sposMin, this.sposMax);
  };
}
