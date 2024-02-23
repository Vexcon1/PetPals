class Post {
  constructor(_id, who, words, img, likes) {
    this.id = _id
    this.who = who;
    this.words = words;
    this.img = img;
    this.likes = likes;
    this.liked = false;
    this.likesUser = []

    this.hite = 85;

    this.yscroll = 100;

    this.next = null
  }

  get(data_name)
  {
    return this[data_name]
  }

  set(data_name, data_set)
  {
    this[data_name] = data_set
  }

  update() {
    this.display();
  }

  display() {
    push();
    translate(0, this.yscroll);
    textAlign(LEFT)

    rectMode(CORNER);
    fill(40);
    noStroke();
    rect(25, 25, width - 50, this.hite, 20);

    fill(100, 180, 255);
    ellipse(65, 60, 40, 40);

    rectMode(CORNER);
    fill(50);
    textSize(20);
    rect(95, 40, textWidth(this.who) + 30, 35, 10);

    rectMode(CORNER);
    fill(50);
    rect(40, 90, 320, this.hite - 80, 10);

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

    fill(50);
    stroke(255);
    strokeWeight(3);

    if (dist(mouseX, mouseY, 340, 60 + this.yscroll) < 15) {
      stroke(255, 100, 100);
    }
    if (this.liked) {
      fill(255, 100, 100);
      stroke(255, 100, 100);
    }

    ellipse(346, 55, 12, 12);
    ellipse(334, 55, 12, 12);

    push();
    noStroke();
    quad(340, 53, 350, 57, 340, 70, 330, 57);
    pop();

    line(340, 70, 330, 60);
    line(340, 70, 350, 60);

    pop();
  }

  wrapText(tex, x, y, maxWidth, lineHeight) {
    let words = tex.split(" ");
    let line = "";

    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + " ";
      let testWidth = textWidth(testLine);
      if (testWidth > maxWidth && i > 0) {
        text(line, x, y); // Draw the line
        line = words[i] + " "; // Start a new line
        y += lineHeight; // Move to the next line
      } else {
        line = testLine;
      }
    }
    text(line, x, y); // Draw the last line
    this.hite = y;
  }

  mouseRelease() {
    if (dist(mouseX, mouseY, 340, 60 + this.yscroll) < 15) {
      if (this.liked == false) {
        this.liked = true;
      } else if (this.liked == true) {
        this.liked = false;
      }
    }
  }

  up() {
    this.yscroll += 20;
  }

  down() {
    this.yscroll -= 20;
  }
}