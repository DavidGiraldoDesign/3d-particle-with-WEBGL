class Particle {

    constructor(x, y, s, r, g, b) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.r = r;
        this.g = g;
        this.b = b;

        this.location = createVector(this.x, this.y);
        this.velocity = createVector(this.x, this.y);
        this.acceleration = 0;
        this.avoidTarget = 0;
        this.avoidAcceleration = 0;
        this.speed = 2
        this.target = 0;
        this.targetX = random(0, windowWidth);
        this.targetY = random(0, windowHeight);
        this.changeTime = random(0, 60);
        this.detectedTouch = false;
        this.mouseIsNear = false;
        this.changeRate = Math.floor(Math.random() * Math.floor(20));
    }
    change(mx, my) {
        if (this.detectedTouch === true && dist(mouseX, mouseY, this.getX(), this.getY()) < 200) {
            this.mouseIsNear = true;
            this.speed = 4;
            this.mapMouseDistToColor();
            this.targetX = mx;
            this.targetY = my;

        } else {
            this.mouseIsNear = false;
            this.speed = 2;
            this.turnToWhite();
            if (new Date().getSeconds() % this.changeRate === 0) {
                this.targetX = random(0, windowWidth);
                this.targetY = random(0, windowHeight);
            } else {
                this.targetX = random(0, windowWidth);
                this.targetY = random(0, windowHeight);
            }
        }
    }

    move() {
        this.target = createVector(this.targetX, this.targetY);
        if (this.mouseIsNear === true) {
            this.acceleration = p5.Vector.sub(this.location, this.target);

        } else {
            this.acceleration = p5.Vector.sub(this.target, this.location);
        }
        this.acceleration.setMag(0.1);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.speed);
        this.location.add(this.velocity);
        this.x = this.location.x;
        this.y = this.location.y;
    }

    avoidOther(xOther, yOther) {
        if (dist(this.x, this.y, xOther, yOther) < this.s) {
            this.avoidTarget = createVector(xOther, yOther);
            this.avoidAcceleration = p5.Vector.sub(this.location, this.avoidTarget);
            this.avoidAcceleration.setMag(5);
            this.velocity.add(this.avoidAcceleration);
            this.velocity.limit(10);
            this.location.add(this.velocity);
            this.x = this.location.x;
            this.y= this.location.y;
        }
    }

    mapMouseDistToColor() {
        let mouseDist = dist(mouseX, mouseY, this.x, this.y);
         this.r = map(mouseDist,0,200,255,0);
        this.g = map(mouseDist, 0, 200, 10, 255);
        this.b = map(mouseDist, 0, 200, 80, 255);
    }

    turnToWhite() {
        if (this.r < 255) {
            this.r += 5;
        }

        if (this.g < 255) {
            this.g += 5;
        }

        if (this.b < 255) {
            this.b += 5;
        }
    }

    setDetectedTouch(isTouch) {
        this.detectedTouch = isTouch;
    }

    getX() {

        return this.x;
    }
    getY() {

        return this.y;
    }

    getSize() {
        return this.s;
    }

    getColor() {
        return [this.r, this.g, this.b];
    }


}