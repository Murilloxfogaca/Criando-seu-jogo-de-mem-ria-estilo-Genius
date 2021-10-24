let order = [];
let clickedOrder = [];
let score = 0;

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');


let shuffleOrder = () => {
	let colorOrder =  Math.floor(Math.random() * 4);
	order[order.length] = colorOrder;
	clickedOrder = [];

	for (let i in order) {
		let elementColor = createColorElement(order[i]);
		lightColor(elementColor, Number(i)+ 1);
	}
}

let lightColor = (element, number) => {
	number = number * 500;
	setTimeout(() => {
		element.classList.add('selected');
	}, number - 250);

	setTimeout(() => {
		element.classList.remove('selected');
	}, number);
}

// Checa se a ordem está certa
let checkOrder = () => {
	for (let i in clickedOrder) {
		if(clickedOrder[i] != order[i]){
			gameOver();
			break;
		}
	}

	if(clickedOrder.length == order.length){
		alert('Pontuação: ' + score + '\nVocê acertou! iniciando próximo nível');
		nextLevel();
	}
}


let click = (color) => {
	clickedOrder[clickedOrder.length] = color;
	createColorElement(color).classList.add('selected'); 

	setTimeout(() => {
		createColorElement(color).classList.remove('selected');
		checkOrder();
	}, 250);

}

//função para retornar a cor
let createColorElement = (color) => {
	switch (color) {
	    case 0:
		    return green;
	    break;
	  	case 1:
		    return red;
	   	break;
		case 2:
		    return yellow;
	 	break;
	   	case 3:
	   		return blue;
	   	break;
	  	default:
	  		console.log('erro na aplicação');
	    break;
	}
}

// função para o próximo nível do jogo
let nextLevel = (lastPlay = false) => {
	score++;
	if (lastPlay) {
		score = score - 2
	}

	if (score === 40) { gameWinner(); }
	shuffleOrder();
}


// função para gamer over
let gameOver = () => {
	nextLevel(true);
	alert('Pontuação: '+ score + '\n Você perdeu o jogo! \n Clique em Ok para iniciar um novo jogo');
	order = [];
	clickedOrder = [];

	playGame();
}

// função para gamer over
let gameWinner = () => {
	alert('Parabéns, você ganhou o jogo');
	order = [];
	clickedOrder = [];

	playGame();
}

// inicia o jogo
let playGame = () => {
	alert('Bem vindo ao Gênesis! Iniciando um novo jogo');
	score = 0;

	nextLevel();
}

// eventos de click
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// iniciar o jogo
playGame();
