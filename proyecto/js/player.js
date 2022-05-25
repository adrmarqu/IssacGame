import * as keys from './keys.js';

var player;
var playerSpeed;

export function preload() {
	
	this.load.image('bomb', 'assets/sprites/bomb.png');

	/*this.load.spritesheet('idle','assets/animaciones/player/idle.png', { frameWidth: 32, frameHeight: 32 });
	this.load.spritesheet('left','assets/animaciones/player/idle.png', { frameWidth: 32, frameHeight: 32 });
	this.load.spritesheet('right','assets/animaciones/player/idle.png', { frameWidth: 32, frameHeight: 32 });
	this.load.spritesheet('up','assets/animaciones/player/idle.png', { frameWidth: 32, frameHeight: 32 });
	this.load.spritesheet('down','assets/animaciones/player/idle.png', { frameWidth: 32, frameHeight: 32 });
	*/
}

export function create() 
{
	player = this.physics.add.sprite(400,300,'bomb');
	player.setOrigin(1);
	player.state = 0;
	playerSpeed = 100;
	
}

export function update() 
{
	// Player state --> 0- idle, 1- mirando arriba, 2- mirando abajo, 3- mirando izquierda, 4- mirando derecha

	if (keys.Up.isDown) {
		player.moveY = -1;
		player.state = 1;
		
	}
	else if (keys.Down.isDown) {
		player.moveY = 1;
		player.state = 2;
	}
	else {
		player.moveY = 0;
		player.state = 0;
	}

	if (keys.Left.isDown) {
		player.moveX = -1;
		player.state = 3;
	}
	else if (keys.Right.isDown) {
		player.moveX = 1;
		player.state = 4;
	}
	else {
		player.moveX = 0;
		player.state = 0;
	}


	//animationPlayer();

	player.dir = new Phaser.Math.Vector2(player.moveX, player.moveY);
	player.dir.normalize();
	player.setVelocityX(playerSpeed * player.dir.x);
	player.setVelocityY(playerSpeed * player.dir.y);
}

/*animationPlayer() {
	if (player.state == 1) {
		player.play('upPlayer', true);
	}
	else if (player.state == 2) {
		player.play('downPlayer', true);
	}
	else if (player.state == 3) {
		player.play('leftPlayer', true);
	}
	else if (player.state == 4) {
		player.play('rightPlayer', true);
	}
	else {
		player.play('idlePlayer', true);
	}
}*/