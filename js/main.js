import { Game } from './game.js';

const config={
	type: Phaser.AUTO,
	width: 400,
	height: 300,
	pixelArt: true,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
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