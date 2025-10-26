let mySound;

let poem = ['gentle blood', 'scything grasses', 'every stop pulled in an organ', 'sacred care'];
let div1, div2, div3;
let img1, img2, img3, img4;

let counter = 0;

var audio = document.getElementById("myAudio");
audio.autoplay=true;
audio.loop = true;

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('iloveyou');


    if (counter == 0) {
        img1 = createImg(
            'images/001.jpg',
            'nightingales'
          );
    }

}

function draw() {

}

function mouseClicked() {



    if (counter == 0) {
        removeElements();
        img1 = createImg(
            'images/001.jpg',
            'nightingales'
          );
    }

    if (counter == 1) {
        removeElements();
        div1 = createDiv(poem[0]);
    }

    if (counter == 2){
        removeElements();
        img2 = createImg(
            'images/002.jpg',
            'nightingales'
          );
    }

    if (counter == 3) {
        removeElements();
        div2 = createDiv(poem[1]);
    }

    if (counter == 4){
        removeElements();
        img3 = createImg(
            'images/003.jpg',
            'nightingales'
          );
    }

    if (counter == 5) {
        removeElements();
        div3 = createDiv(poem[2]);
    }

    if (counter == 6){
        removeElements();
        img4 = createImg(
            'images/004.jpg',
            'nightingales'
          );
    }

    if (counter == 7) {
        removeElements();
        div3 = createDiv(poem[3]);
    }


    console.log(counter)
    counter++;

    if (counter > 7){
        counter = 0;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}