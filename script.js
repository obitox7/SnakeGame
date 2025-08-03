console.log("running");
let screen = document.getElementById("screen");
let head = document.getElementById("head");
let w = screen.offsetWidth;
let h = screen.offsetHeight;
let y = parseInt(head.style.top) || 0;
let x = parseInt(head.style.left) || 0;
let count = 2;
let idx = 1;
let path = [];
let bodies = [];
let foodx = "";
let foody = "";
let food = "";

function position() {
    head.style.top = `${y}px`;
    head.style.left = `${x}px`;
    path.push({ x, y });

    if (path.length > count) {
        path.splice(0, path.length - count);
    }
    
    colide();
}

let first = "";
let second = "";
let third = "";
let fourth = "";
right();
genfood();
function up() {
    clearInterval(second);
    clearInterval(third);
    clearInterval(fourth);
    clearInterval(first);

    first = setInterval(() => {
        if (y > 0) {
            y--;
            position();
        } else {
            clearInterval(first);
        }
    }, 20);
}
function down() {
    clearInterval(first);
    clearInterval(third);
    clearInterval(fourth);
    clearInterval(second);
    second = setInterval(() => {
        if (y !== h - 20) {
            y++;
            position();
        } else {
            clearInterval(second);
        }
    }, 20);
}
function left() {
    clearInterval(second);
    clearInterval(first);
    clearInterval(fourth);
    clearInterval(third);
    third = setInterval(() => {
        if (x > 0) {
            x--;
            position();
        } else {
            clearInterval(third);
        }
    }, 20);
}
function right() {
    clearInterval(second);
    clearInterval(third);
    clearInterval(first);
    clearInterval(fourth);

    fourth = setInterval(() => {
        if (x !== w - 20) {
            x++;
            position();
        } else {
            clearInterval(fourth);
        }
    }, 20);
}
function genfood() {
    let r1 = w - 20;
    let r2 = h - 20;
    foodx = Math.floor(Math.random() * r1);
    foody = Math.floor(Math.random() * r2);
    food = document.createElement("div");
    screen.appendChild(food);
    food.classList.add("food");
    food.style.top = `${foody}px`;
    food.style.left = `${foodx}px`;
}
function eat() {
    screen.removeChild(food);
    genfood();
    grow();
}
function colide() {
    let diffx = Math.abs(foodx - path[0].x);
    let diffy = Math.abs(foody - path[0].y);
    if (diffx < 20 && diffy < 20) {
        console.log("eat");
        eat();
    }
}
function grow() {
    count++;
    let body = document.createElement("div");
    screen.appendChild(body);
    body.classList.add("body");
    bodies.push("body");
}
console.log(path[1].x);
console.log(idx, count);
console.log("end");
