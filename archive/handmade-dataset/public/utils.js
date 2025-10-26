function keyTyped() {
	if (keyCode == DOWN_ARROW){
		save(random(10000)+".png");
	}
	if (keyCode == UP_ARROW){
		let fs = fullscreen();
		fullscreen(!fs);
	}
}