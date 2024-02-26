

let post;

let tp;

class UI {
  constructor() {

    this.isAccount = true;

    this.loginPage = true;
    this.hobbiesPage = false;
    this.postsPage = false;
    if (this.isAccount) {
      this.loginPage = false;
      this.postsPage = true;
    }
    this.messagingPage = false;
    this.makePostPage = false;
    this.accountPage = false;

    this.typing = 0;

    this.id = "";
    this.username = "";
    this.pet = "";
    this.age = "";
    this.hobbys = [];

    this.postsDisplaying = []

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
  }

  get(data_name) {
    return this[data_name]
  }
  set(data_name,data_set) {
    this[data_name] = data_set
  }

  update() {    
    if (this.loginPage) {
      this.runLogPage();
    }

    if (this.hobbiesPage) {
      this.runHobbiesPage();
    }

    if (this.postsPage) {
      this.runPostsPage();
    }

    if (this.messagingPage) {
      this.runMessagingPage();
    }

    if (this.makePostPage) {
      this.runMakePostPage();
    }

    this.runBottomMenu();
  }

  runBottomMenu() {
    rectMode(CENTER);
    noStroke();
    fill(40);
    rect(200, 575, 400, 50);

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
    rect(300, 595, 30, 15);

    if (dist(mouseX, mouseY, 100, 575) < 15) {
      stroke(230, 240, 255);
      strokeWeight(2);
    } else {
      stroke(100, 180, 255);
      strokeWeight(2);
    }

    triangle(105, 575, 90, 568, 90, 582);

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

  runMessagingPage() {}

  runLogPage() {
    rectMode(CENTER);
    textAlign(CENTER);
    background(30);

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
    text("Pet Animal", 200, 230);

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
    if (this.pet != null) text(this.pet, 200, 255);

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

    if (mouseX > 100 && mouseX < 300 && mouseY > 430 && mouseY < 470) {
      if (
        mouseIsPressed == true &&
        this.username != "" &&
        this.pet != "" &&
        this.age != ""
      ) {
        post = new Post(ui.id, ui.username, "Hello World!", null, 573);
        this.hobbiesPage = true;
        this.loginPage = false;
      }

      if (this.username == "" || this.pet == "" || this.age == "") {
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
    } else {
      fill(100, 180, 255);
      noStroke();
      rect(200, 450, 200, 40, 5);
      fill(30, 25, 40);
    }

    noStroke();
    textStyle(BOLD);
    textSize(20);
    text("Next", 200, 456);
  }

  addToKey(k) {
    if (this.typing == 1 && textWidth(this.username) < 275) this.username += k;
    if (this.typing == 2 && textWidth(this.pet) < 275) this.pet += k;
    if (this.typing == 3 && textWidth(this.age) < 20 && key >= 0 && key <= 9)
      this.age += k;
  }

  backspace() {
    if (this.typing == 1) {
      this.username = this.username.substr(0, this.username.length - 1);
    }

    if (this.typing == 2) {
      this.pet = this.pet.substr(0, this.pet.length - 1);
    }

    if (this.typing == 3) {
      this.age = this.age.substr(0, this.age.length - 1);
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
      )
        fill(80, 160, 230);
      else if (mouseX > 135 && mouseX < 265 && mouseY > 105 && mouseY < 135)
        fill(90, 170, 240);
      else fill(100, 180, 255);
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
          fill(50, 90, 125);
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

  runPostsPage() {
    background(30);

    if (post != null) post.update(i * 130);
    
    for (let i=0; i < this.postsDisplaying.length; i++) {
      this.postsDisplaying[i].update(i * 130)
    }
  }

  runMakePostPage()
  {
    background(30)
    
  }

  mouseRelease() {
    if (this.isAccount == true) {
      //can access message, posts, account, and create posts
      if (dist(mouseX, mouseY, 370, 25) < 25) {
        this.loginPage = false;
        this.hobbiesPage = false;
        this.postsPage = false;
        this.makePostPage = false;
        this.accountPage = false;
        this.messagingPage = true;
      }

      if (dist(mouseX, mouseY, 300, 575) < 15) {
        this.loginPage = false;
        this.hobbiesPage = false;
        this.postsPage = false;
        this.makePostPage = false;
        this.messagingPage = false;
        this.accountPage = true;
      }

      if (dist(mouseX, mouseY, 100, 575) < 15) {
        this.loginPage = false;
        this.hobbiesPage = false;
        this.postsPage = true;
        this.makePostPage = false;
        this.accountPage = false;
        this.messagingPage = false;
      }

      if (mouseX > 180 && mouseX < 220 && mouseY > 560 && mouseY < 590) {
        this.loginPage = false;
        this.hobbiesPage = false;
        this.postsPage = false;
        this.accountPage = false;
        this.messagingPage = false;

        tp = new PostCreator(this.username, " ", null, 200)

        this.makePostPage = true;
      }
    }

    if (this.loginPage) {
      if (mouseX > 100 && mouseX < 300 && mouseY > 135 && mouseY < 165) {
        this.typing = 1;
        return;
      }
      if (mouseX > 100 && mouseX < 300 && mouseY > 235 && mouseY < 265) {
        this.typing = 2;
        return;
      }
      if (mouseX > 100 && mouseX < 300 && mouseY > 335 && mouseY < 365) {
        this.typing = 3;
        return;
      }

      this.typing = 0;
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
        this.hobbiesPage = false;
        this.postsPage = true;
        this.isAccount = true
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
  }

  createUIPost(po) {
    this.postsDisplaying.push(po)
    for (let i=0; i < this.postsDisplaying.length; i++) {
      this.postsDisplaying[i].fixSpace(i * 130)
    }
  }

  updateUIPost(po) {
    for (let i=0; i < this.postsDisplaying.length; i++) {
      if (this.postsDisplaying[i].id == po.id) {
        this.postsDisplaying[i] = po.id
      }
    }
  }
}


function keyTyped() {
  if (ui.loginPage == true)
  if (key != "Enter") ui.addToKey(key);

  if (tp != null)
  if (key != "Enter") tp.addToKey(key);
}

function keyPressed() {
  if (keyCode == BACKSPACE) {
    if (ui.loginPage == true)
    ui.backspace();
    
    if (tp != null)
      tp.backspace();

    for (let i=0; i < ui.postsDisplaying.length; i++) {
      ui.postsDisplaying[i].backspace();
    }
  }
}

function mouseReleased() {
  ui.mouseRelease();
  if (post != null)
  post.mouseRelease();

  if (tp != null)
    tp.mouseRelease()

  for (let i=0; i < ui.postsDisplaying.length; i++) {
    ui.postsDisplaying[i].mouseRelease();
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
  for (let i=0; i < ui.postsDisplaying.length; i++) {
    if (event.deltaY > 0) {
         ui.postsDisplaying[i].down();
    } else if (event.deltaY < 0) {
         ui.postsDisplaying[i].up();
    }
  }
}

class PostCreator extends Post
{
  constructor(who, words, img, likes, hitee) {
    super(who, words, img, likes)

    this.hite = 85;

    this.yscroll = 0;

    this.next = null;

    this.typing = false
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
    if (mouseX > 40 && mouseX < 360 && mouseY > 90 && mouseY < 90+this.hite -80)
      fill(60)
    if (this.typing)
      stroke(100, 180, 255)

    rect(40, 90, 320, this.hite - 80, 10);

    noStroke()
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

    rectMode(CENTER)
    noStroke()

    fill(20)
    rect(200, this.hite + 80, 150, 50, 10)

    push()
    fill(100, 180, 255)
    if(mouseX > 125 && mouseX < 275 && mouseY > this.hite + 45 && mouseY < this.hite + 95)
      {
        translate(0, 3)

        if (mouseIsPressed)
          {
            translate(0, 2)
          }
      }

    rect(200, this.hite + 70, 150, 50, 10)

    fill(50)
    textAlign(CENTER)
    textSize(25)

    text("POST", 200, this.hite+80)

    fill(255)
    textAlign(CENTER)
    textSize(25)

    text("POST", 200, this.hite+77)

    pop()

  }

  mouseRelease() {
    if (mouseX > 40 && mouseX < 360 && mouseY > 90 && mouseY < 90+this.hite - 80)
      {
        this.typing = true
      }
    else 
      this.typing = false

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