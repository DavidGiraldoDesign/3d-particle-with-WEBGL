let canvas;
let particles = [];

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);

    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    for (let i = 0; i < 100; i++) {
        particles[i] = new Particle(random(0, windowWidth), random(0, windowHeight), 5, 255, 255, 255);
    }
}
let r = 0;

function draw() {

    background(0);
    
   

    //newCursor();

    push();
    translate(0, 0);
    ambientMaterial(250);
    r++;
    rotateX(radians(r));
    fill(255);
    rect(0, 0, 50,50);
    var locX = mouseX - width / 2;
    var locY = mouseY - height / 2;

    pointLight(250, 250, 250, locX, locY, 50);
    ambientMaterial(250);
    noStroke();
    sphere(25);
    particles.forEach((p, i) => {
        displayParicles(p.getX(), p.getY(), p.getSize(), p.getColor(), false, true);
        p.change(mouseX, mouseY);
        p.move();
    });
    pop();
    // noFill();
    // stroke(255, 0, 0);
    // rect(0, 0, 50, 80);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor() {
    push();
    translate(-windowWidth / 2, -windowHeight / 2);
    noStroke();
    fill(255);
    ellipse(pmouseX, pmouseY, 10, 10);

    pop();
}

function displayParicles(x, y, s, rgb, hasStroke, hasFill) {

    if (hasStroke == true) {
        stroke(color(rgb[0], rgb[1], rgb[2]));
    } else {
        noStroke();
    }
    if (hasFill == true) {
        // fill(color(rgb[0], rgb[1], rgb[2]));
    } else {
        noStroke();
    }
    // rect(x, y, s, s);
    push();
    translate(-windowWidth / 2, -windowHeight / 2);
    var locX = mouseX - width / 2;
    var locY = mouseY - height / 2;
    pointLight(250, 250, 250, locX, locY, 50);
    ambientMaterial(250);

    translate(x, y);
    sphere(s);
    pop();
}

function mousePressed() {
    particles.forEach(p => {
        p.setDetectedTouch(true);
    });
}

function mouseReleased() {
    particles.forEach(p => {
        p.setDetectedTouch(false);
    });
}