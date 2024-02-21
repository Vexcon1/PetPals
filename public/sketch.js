// Use the file input to select multiple images
// to load and display.
let input;
let images = [];

function setup() {
  // Create a file input and place it beneath
  // the canvas. Allow it to load multiple files.
  input = createFileInput(handleImage, true);
  input.position(0, 100);
}

function draw() {
  background(200);

  // Draw the images if loaded. Each image
  // is drawn 20 pixels lower than the
  // previous image.
  images.forEach((img, index) => {
    let y = index * 20;
    image(img, 0, y, width, height);
  });
}

// Create an image if the file is an image,
// then add it to the images array.
function handleImage(file) {
  if (file.type === 'image') {
    let img = createImg(db.get("untitled (3).png"), '');
    print(file.name,file.data)
   // db.set(file.name,file.data)
    //db.saveData()

    img.hide();
    images.push(img);
  }
}