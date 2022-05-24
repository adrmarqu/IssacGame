import { Game } from './game.js';

const config={
	type: Phaser.AUTO,
	width: 400,
	height: 300,
	scene: [Game],
	physics:{
		default:'arcade',
		arcade:{
			gravity:{y:0},
			debug: false
		}
	}
}

var game=new Phaser.Game(config);