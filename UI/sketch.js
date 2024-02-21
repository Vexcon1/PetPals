let ui;

class UI {
  constructor() {
    this.isAccount = false;

    this.loginPage = false;
    this.hobbiesPage = true
    this.postsPage = false;
    if (this.isAccount) {
      this.loginPage = false;
      this.postsPage = true;
    }
    this.messagingPage = false;
    this.makePostsPage = false;
    this.accountPage = false;

    this.typing = 0;

    this.username = "";
    this.pet = "";
    this.age = "";
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
  }

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
        this.postsPage = true;
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
    textStyle(BOLDITALIC);
    textSize(20);
    text("Create Account", 200, 456);
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
  
  runHobbiesPage()
  {
    background(30)
    
    textAlign(CENTER)
    textStyle(ITALIC)
    noStroke()
    fill(200)
    textSize(20)
    text("Pick your three favourite", 197, 50)
    
    
    fill(20)
    textSize(40)
    textStyle(BOLD)
    text("HOBBIES", 200, 95)
    fill(100, 180, 255)
    text("HOBBIES", 200, 90)
    
    
    for (let i = 0; i < 2; i++)
      {
        for (let j = 0; j < 5; j++)
          {
            rectMode(CORNER)
            noStroke()
            fill(20)
            rect(i*175+37.5, j * 75 + 160, 150, 50, 5)
            fill(50)
            rect(i*175+37.5, j * 75 + 150, 150, 50, 5)
            
            if (mouseX > i*175+37 && mouseX < i*175+213 && mouseY > j * 75 + 150 && mouseY < j*75+225)
              {
                
              }
          }
      }
  }

  runPostsPage() {
    background(30);
  }

  mouseRelease() {
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
  }
}

function setup() {
  createCanvas(400, 600);
  
  ui = new UI();
}

function draw() {
  background(220);

  ui.update();
}

function keyTyped() {
  if (key != "Enter") ui.addToKey(key);
}

function keyPressed() {
  if (keyCode == BACKSPACE) {
    ui.backspace();
  }
}

function mouseReleased() {
  ui.mouseRelease();
}
