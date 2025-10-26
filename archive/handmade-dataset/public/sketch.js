var socket;
var printing = false;


//moment data

var iAm;
var youAre;
var feelingInMyChest;
var whatISmell;
var youAreToMe;

var margin = 400;


//orb
let points;
let triangles;
var palette;
var paper;
var colors;
var lent;

function wipe() {
    points = [];

    blendMode(BLEND);
    background("#000000");
    image(paper, 0, 0);

    iAm.value() = "";
    youAre.value() = "";
    feelingInMyChest.value() = "";
    whatISmell.value() = "";
    youAreToMe.value() = "";


}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight)
    cnv.parent('sketch');
    //socket = io.connect('http://localhost:3000');
    socket = io.connect('https://damp-stream-62424.herokuapp.com/');
    socket.on('mouse', newDrawing);
    socket.on('moment', newMoment);


    setInterval(wipe, 600000);
    init();
    background("#000000");
    image(paper, 0, 0);

    fill(255);

    createSpan("I am ").parent('momentDiv');
    iAm = createInput().parent('momentDiv');;
    iAm.changed(emitMoment).parent('momentDiv');;
    createP().parent('momentDiv');;

    createSpan("You are ").parent('momentDiv');
    youAre = createInput().parent('momentDiv');
    youAre.changed(emitMoment).parent('momentDiv');
    createP().parent('momentDiv');

    createSpan("I feel ").parent('momentDiv')
    feelingInMyChest = createInput().parent('momentDiv');
    feelingInMyChest.changed(emitMoment).parent('momentDiv');
    createSpan(" in my chest").parent('momentDiv');
    createP().parent('momentDiv');

    createSpan("I smell ").parent('momentDiv');
    whatISmell = createInput().parent('momentDiv');
    whatISmell.changed(emitMoment).parent('momentDiv');
    createP().parent('momentDiv');

    createSpan("You are ").parent('momentDiv');
    youAreToMe = createInput().parent('momentDiv');
    youAreToMe.changed(emitMoment).parent('momentDiv');
    createSpan(" to me").parent('momentDiv');
    createP().parent('momentDiv');


}


function init() {
    palette = []
    palette = createCols(URL[int(random(URL.length))])
    points = []
    points.push([width / 2 - 50, height / 2], [width / 2 + 50, height / 2], [width / 2, height / 2 - 50]);
    colors = []
    colors.push(shuffle(palette)[0]);
    triangles = []
    triangles = Delaunay.triangulate(points);
    paper = null
    createpaper();
    lent = 1
}


function newDrawing(data) {

    blendMode(BLEND);
    points.push([data.x, data.y]);
    triangles = Delaunay.triangulate(points);
    let delta = triangles.length - lent
    for (let z = 0; z < delta; z++) {
        colors.push(shuffle(palette)[0]);
    }
    lent = triangles.length;

    for (let i = 0; i < triangles.length; i++) {
        let pt1 = triangles[i][0]
        let pt2 = triangles[i][1]
        let pt3 = triangles[i][2]
        fill(colors[i])
        stroke(colors[i])
        beginShape();
        vertex(points[pt1][0], points[pt1][1]);
        vertex(points[pt2][0], points[pt2][1]);
        vertex(points[pt3][0], points[pt3][1]);
        endShape(CLOSE);
    }

    blendMode(SOFT_LIGHT)
    tint(255, 100);
    blendMode(SCREEN)
    image(paper, 0, 0);
    image(paper, 0, 0);
    blendMode(OVERLAY)
    background(0, 50)


}



function mousePressed() {

    if (mouseX > 600 || mouseY > 230) {

        blendMode(BLEND);
        points.push([mouseX, mouseY]);
        triangles = Delaunay.triangulate(points);
        let delta = triangles.length - lent
        for (let z = 0; z < delta; z++) {
            colors.push(shuffle(palette)[0]);
        }
        lent = triangles.length;

        var data = {
            x: mouseX,
            y: mouseY
        }

        socket.emit('mouse', data);



        for (let i = 0; i < triangles.length; i++) {
            let pt1 = triangles[i][0]
            let pt2 = triangles[i][1]
            let pt3 = triangles[i][2]
            fill(colors[i])
            stroke(colors[i])
            beginShape();
            vertex(points[pt1][0], points[pt1][1]);
            vertex(points[pt2][0], points[pt2][1]);
            vertex(points[pt3][0], points[pt3][1]);
            endShape(CLOSE);
        }

        blendMode(SOFT_LIGHT)
        tint(255, 100);
        blendMode(SCREEN)
        image(paper, 0, 0);
        image(paper, 0, 0);
        blendMode(OVERLAY)
        background(0, 50)

    }
}

const URL = [
    "https://coolors.co/000000-292929-474747-7a7a7a-adadad-d6d6d6-ffffff"
]

function createCols(url) {
    let slaIndex = url.lastIndexOf("/");
    let colStr = url.slice(slaIndex + 1);
    let colArr = colStr.split("-");
    for (let i = 0; i < colArr.length; i++) colArr[i] = "#" + colArr[i];
    return colArr;
}

function createpaper() {
    paper = createGraphics(width, height);
    //paper.fill("#F6F2E9")
    //paper.rect(0,0,width,height)
    paper.noStroke();
    paper.fill(255, 50);
    for (let i = 0; i < 500000; i++) {
        let x = random(paper.width);
        let y = random(paper.height);
        paper.circle(x, y, random(0.5, 1));
    }
}

function draw() {}

function newMoment(thisMoment) {
    fill(255);
    textSize(random(30, 70));
    blendMode(DIFFERENCE)

    if (thisMoment.iAm !== "I am ") {
        text(thisMoment.iAm, random(0, width - margin), random(0, height - 70));
    }

    if (thisMoment.youAre !== "You are ") {
        text(thisMoment.youAre, random(0, width - margin), random(0, height - 70));
    }

    if (thisMoment.feelingInMyChest !== "I feel  in my chest") {
        text(thisMoment.feelingInMyChest, random(0, width - margin), random(0, height - 70));
    }

    if (thisMoment.whatISmell !== "I smell ") {
        text(thisMoment.whatISmell, random(0, width - margin), random(0, height - 70));
    }

    if (thisMoment.youAreToMe !== "You are  to me") {
        text(thisMoment.youAreToMe, random(0, width - margin), random(0, height - 70));
    }
}


function emitMoment() {

    var thisMoment = {
        iAm: "I am " + iAm.value(),
        youAre: "You are " + youAre.value(),
        feelingInMyChest: "I feel " + feelingInMyChest.value() + " in my chest",
        whatISmell: "I smell " + whatISmell.value(),
        youAreToMe: "You are " + youAreToMe.value() + " to me"
    }
    fill(0);
    stroke(255)
    strokeWeight(2)
    textSize(random(30, 70));
    blendMode(DIFFERENCE)

    if (thisMoment.iAm !== "I am ") {
        text(thisMoment.iAm, random(0, width - margin), random(0, height - 70));
    }

    if (thisMoment.youAre !== "You are ") {
        text(thisMoment.youAre, random(0, width - margin), random(0, height - 70));
    }

    if (thisMoment.feelingInMyChest !== "I feel  in my chest") {
        text(thisMoment.feelingInMyChest, random(0, width - margin), random(0, height - 70));
    }

    if (thisMoment.whatISmell !== "I smell ") {
        text(thisMoment.whatISmell, random(0, width - margin), random(0, height - 70));
    }

    if (thisMoment.youAreToMe !== "You are  to me") {
        text(thisMoment.youAreToMe, random(0, width - margin), random(0, height - 70));
    }

    socket.emit('moment', thisMoment)
}

function display() {
    socket.emit('print');

    socket.on('print', function () {
        background(255, 20);
        console.log('print');
        window.print();
    })
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    blendMode(BLEND);
    background("#000000")
    triangles = Delaunay.triangulate(points);
    let delta = triangles.length - lent
    for (let z = 0; z < delta; z++) {
        colors.push(shuffle(palette)[0]);
    }
    lent = triangles.length;

    var data = {
        x: mouseX,
        y: mouseY
    }

    socket.emit('mouse', data);



    for (let i = 0; i < triangles.length; i++) {
        let pt1 = triangles[i][0]
        let pt2 = triangles[i][1]
        let pt3 = triangles[i][2]
        tint(255, 50)
        fill(colors[i])
        stroke(colors[i])
        beginShape();
        vertex(points[pt1][0], points[pt1][1]);
        vertex(points[pt2][0], points[pt2][1]);
        vertex(points[pt3][0], points[pt3][1]);
        endShape(CLOSE);
    }

    blendMode(SOFT_LIGHT)
    tint(255, 100);
    blendMode(SCREEN)
    image(paper, 0, 0);
    image(paper, 0, 0);
    blendMode(OVERLAY)
    background(0, 50)
}