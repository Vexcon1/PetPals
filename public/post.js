class Post {
  constructor(id, pid, who, words, img, likes) {
    this.id = id;
    this.postId = pid;
    this.who = who;
    this.words = words;
    this.img = img;
    this.likes = likes;
    this.liked = false;
    this.likesUser = [];
    this.preLoad = false;

    this.hite = 85;

    this.yscroll = 0;
  }

  get(data_name) {
    return this[data_name];
  }
  set(data_name, data_set) {
    this[data_name] = data_set;
  }

  update(a) {
    var Pos = vs1.getPos();
    this.yscroll = Pos + a;
    //this.yscrollIndex = a
    this.display();
    this.load();
  }

  load() {
    if (this.preLoad == false) {
      this.preLoad = true;
      if (this.likesUser.includes(ui.id)) {
        this.liked = true;
      }
    }
  }

  display() {
    push();
    translate(0, this.yscroll);
    textAlign(LEFT);

    rectMode(CORNER);
    fill(40);
    noStroke();
    rect(25, 25, width - 50, this.hite, 10);

    fill(ui.assignColor(this.who));
    ellipse(65, 60, 40, 40);

    textAlign(CENTER);
    fill(255);
    textStyle(NORMAL);
    textSize(30);
    text(this.who.charAt(0), 65, 71);

    textAlign(LEFT);
    textStyle(BOLD);
    textSize(20);
    rectMode(CORNER);
    fill(50);
    if (
      mouseX > 95 &&
      mouseX < 95 + textWidth(this.who) + 20 &&
      mouseY > 40 + this.yscroll &&
      mouseY < 40 + this.yscroll + 35
    )
      fill(60);
    rect(95, 40, textWidth(this.who) + 20, 35, 10);

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

    textAlign(RIGHT);
    noStroke();
    fill(200);

    text(this.likes, 320, 66);

    pop();
  }

  getWrapTextValue(tex, maxWidth, lineHeight) {
    let words = tex.split(" ");
    let line = "";
    let newHitee = 110;

    for (let i = 0; i < words.length; i++) {
      let currentWord = words[i];
      let segments = this.splitLongWord(currentWord, maxWidth);

      for (let segment of segments) {
        let testLine = line + segment + " ";
        let testWidth = textWidth(testLine.trim());

        if (testWidth > maxWidth) {
          // Draw the line if it exceeds maxWidth
          line = segment + " "; // Start a new line
          newHitee += lineHeight; // Update newHitee with lineHeight
        } else {
          line = testLine;
        }
      }
    }
    return newHitee;
  }

  wrapText(tex, x, y, maxWidth, lineHeight) {
    if (tex != null) {
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
  }

  splitLongWord(word, maxWidth) {
    let segments = [];
    let currentSegment = "";
    for (let i = 0; i < word.length; i++) {
      currentSegment += word[i];
      if (textWidth(currentSegment) > maxWidth) {
        segments.push(currentSegment.slice(0, -1));
        currentSegment = word[i];
      }
    }
    segments.push(currentSegment);
    return segments;
  }
  mouseRelease() {
    if (this.id != ui.get("thisUser").get("id")) {
      if (dist(mouseX, mouseY, 340, 60 + this.yscroll) < 15) {
        if (this.liked == false) {
          this.liked = true;
          this.likes++;
          peopleList.likePost(ui.id, this.id, this.postId);
        } else if (this.liked == true) {
          this.liked = false;
          this.likes--;
          peopleList.unlikePost(ui.id, this.id, this.postId);
        }
      }
    }

    textStyle(BOLD);
    textSize(20);
    fill(50);
    if (
      mouseX > 95 &&
      mouseX < 95 + textWidth(this.who) + 20 &&
      mouseY > 40 + this.yscroll &&
      mouseY < 40 + this.yscroll + 35
    ) {
      ui.set("thisPerson",this.id);
      ui.viewProfile();
    }
  }

  up() {
    //this.yscroll += 20;
  }

  down() {
    //this.yscroll -= 20;
  }

  getHitee() {
    return this.getWrapTextValue(this.words, width - 100, 15);
  }
}
