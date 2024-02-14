let ui;

class UI {
  constructor() {
    this.isAccount = false;

    this.loginPage = true;
    this.postsPage = false;
    if (this.isAccount) {
      this.loginPage = false;
      this.postsPage = true;
    }
    this.messagingPage = false;
    this.makePostsPage = false;
    this.accountPage = false;
  }

  update() {
    if (this.loginPage) {
      this.runLogPage();
    }
    
    if (this.postsPage) {
      this.runPostsPage();
    }
    
    this.runBottomMenu()
  }
  
  runBottomMenu()
  {
    rectMode(CENTER);
    noStroke()
    fill(40)
    rect(200, 575, 400, 50)
    
    stroke(100, 180, 255)
    strokeWeight(2)
    
    if (mouseX > 180 && mouseX < 220 && mouseY > 560 && mouseY < 590)
      {
        stroke(230, 240, 255)
        strokeWeight(2)
      } else {
        
        stroke(100, 180, 255)
        strokeWeight(2)
      }
    rect(200, 575, 35, 27, 5)
    line(200, 568, 200, 582)
    line(190, 575, 210, 575)
    
    if (dist(mouseX, mouseY, 300, 575) < 15)
      {
        stroke(230, 240, 255)
        strokeWeight(2)
      } else {
        
        stroke(100, 180, 255)
        strokeWeight(2)
      }
    
    ellipse(300, 570, 10, 10)
    ellipse(300, 589, 20, 20)
    
    noStroke()
    rect(300, 595, 30, 15)
    
    if (dist(mouseX, mouseY, 100, 575) < 15)
      {
        stroke(230, 240, 255)
        strokeWeight(2)
      } else {
        
        stroke(100, 180, 255)
        strokeWeight(2)
      }
    
    triangle(105, 575, 90, 568, 90, 582)
  }

  runLogPage() {
    rectMode(CENTER);
    textAlign(CENTER);
    background(30);

    noStroke();
    fill(200);
    textStyle(NORMAL);
    textSize(15);
    text("Name (First and Last)", 200, 130);

    noFill();
    stroke(200);
    rect(200, 150, 200, 25, 5);

    noStroke();
    fill(200);
    textStyle(NORMAL);
    textSize(15);
    text("Pet Animal", 200, 230);

    noFill();
    stroke(200);
    rect(200, 250, 200, 25, 5);

    noStroke();
    fill(200);
    textStyle(NORMAL);
    textSize(15);
    text("other", 200, 330);

    noFill();
    stroke(200);
    rect(200, 350, 200, 25, 5);

    if (mouseX > 100 && mouseX < 300 && mouseY > 430 && mouseY < 470) {
      if (mouseIsPressed == true)
        {
          this.postsPage = true
          this.loginPage = false
        }
      noFill();
      stroke(200);
      rect(200, 450, 204, 44, 5);
      fill(200);
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
  
  runPostsPage()
  {
    background(30)
  }
  
  updateText() {
  let newText = this.value();
  let lines = newText.split('\n');
  let formattedText = '';
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    while (line.length > maxCharsPerLine) {
      formattedText += line.substring(0, maxCharsPerLine) + '\n';
      line = line.substring(maxCharsPerLine);
    }
    formattedText += line + '\n';
  }
  
  inputText = formattedText;
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