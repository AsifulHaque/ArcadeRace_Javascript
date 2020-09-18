//Get HTML DIV  ----------------------------------------------------
const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

//console.log(score);

startScreen.addEventListener('click', start);

//VARIABLE  ----------------------------------------------------
let player = {speed: 5, score: 0};
let keys = {ArrowUp : false, ArrowDown : false, ArrowLeft : false, ArrowRight : false};

//register input
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

//FUNCTIONS ----------------------------------------------------
function keyDown(e){
	e.preventDefault();
	keys[e.key] = true;
//	console.log(keys);
}

function keyUp(e){
	e.preventDefault();
	keys[e.key] = false;
//	console.log(keys);
}

function isCollide(a, b){
	aRect = a.getBoundingClientRect();
	bRect = b.getBoundingClientRect();

	return !((aRect.top > bRect.bottom) ||
					 (aRect.bottom < bRect.top) ||
				 	 (aRect.right < bRect.left) ||
					 (aRect.left > bRect.right));
}
function moveLines(){
	let lines = document.querySelectorAll('.lines');
	lines.forEach(function(item){

		if(item.y >= 700){
			item.y -= 750
		}
	item.y += player.speed;
	item.style.top = item.y + "px"})
}
//END GAME
function endGame(){
	player.start = false;
	startScreen.classList.remove('hide');
	startScreen.innerHTML = "Game Over <br>Score : " + (player.score + 1) +
	"<br>Press here to Restart" ;
}



//Move enemy cars
function moveEnemy(car){
	let enemy = document.querySelectorAll('.enemy');
	enemy.forEach(function(item){
		if(isCollide(car, item)){
			endGame();
		}
		if(item.y >= 750){
			item.y = -350;
			item.style.left = Math.floor(Math.random() * 350) + "px";
		}
	item.y += player.speed + 3;
	item.style.top = item.y + "px"})
}

function gamePlay(){
//	console.log("GameStarted");
	let car = document.querySelector('.car');
	let road = gameArea.getBoundingClientRect();


	if(player.start){
		moveLines();
		moveEnemy(car);
		if(keys.ArrowUp && player.y > (road.top + 70)){ player.y -= player.speed}
		if(keys.ArrowDown && player.y < (road.height - 80)){ player.y += player.speed}
		if(keys.ArrowLeft && player.x > 0){ player.x -= player.speed}
		if(keys.ArrowRight && player.x < (road.width - 50)){ player.x += player.speed}

		car.style.top = player.y + "px";
		car.style.left = player.x + "px";
	window.requestAnimationFrame(gamePlay);
	player.score++; //add score
	score.innerText = "Score: " + player.score;
	//Increase player speed with time
	// player.speed = player.score / 100;
	switch (player.score) {
		case 500: player.speed += 2;
		break;
		case 1000: player.speed += 2;
		break;
		case 1500: player.speed +=1;
		break;
		case 2000: player.speed +=1;
		break;
		case 3000: player.speed +=1;
		break;
		case 4000: player.speed +=1;
		break;
		// case 5000: player.speed +=1;
		// break;
		default:
		}
	}
}

function start(){
	// gameArea.classList.remove('hide');
	startScreen.classList.add('hide');
	gameArea.innerHTML = "";

	player.start = true;
	player.score = 0;
	player.speed = 5; // reset the default speed
	window.requestAnimationFrame(gamePlay);

	for(x=0; x<5; x++){
	let roadLine = document.createElement('div');
	roadLine.setAttribute('class', 'lines');
	roadLine.y = x*150;
	roadLine.style.top = roadLine.y + "px";
	gameArea.appendChild(roadLine);
	}
	let car = document.createElement('div');
	car.setAttribute('class', 'car');
	gameArea.appendChild(car);

	player.x = car.offsetLeft;
	player.y = car.offsetTop;

	//Create Enemy Cars
	for(x=0; x<3; x++){
	let enemyCar = document.createElement('div');
	enemyCar.setAttribute('class', 'enemy');
	enemyCar.y = ((x+1) * 350) * -1;
	enemyCar.style.top = enemyCar.y + "px";
	enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
	// enemyCar.style.backgroundColor = randomColor();
	gameArea.appendChild(enemyCar);
	}
}
function randomColor(){
	function c(){
		let hex = Math.floor(Math.random() * 256).toString(16);
		return ("0" + String(hex)).substr(-2);
	}
	return "#"+c()+c()+c();
}
