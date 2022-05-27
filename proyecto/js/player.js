import * as keys from './keys.js';

export var player;
export var playerSpeed;

export function preload() 
{
	this.load.spritesheet('player','assets/animations/player.png', { frameWidth: 94, frameHeight: 64 });
}

export function create() 
{
	player = this.physics.add.sprite(400,300,'player');
	player.body.setSize(30, 40, true)
	player.state = 0;
	playerSpeed = 200;

	this.cameras.main.startFollow(player);

	this.anims.create({
		key: 'idle',
		frames: this.anims.generateFrameNumbers('player', { frames: [ 1 ] }),
		frameRate: 1
    });

	this.anims.create({
		key: 'UpAnim',
		frames: this.anims.generateFrameNumbers('player', { frames: [ 9, 10, 11 ] }),
		frameRate: 8
    });

	this.anims.create({
		key: 'DownAnim',
		frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 1, 2 ] }),
		frameRate: 8
    });
	
	this.anims.create({
		key: 'LeftAnim',
		frames: this.anims.generateFrameNumbers('player', { frames: [ 3, 4, 5 ] }),
		frameRate: 8
    });

	this.anims.create({
		key: 'RightAnim',
		frames: this.anims.generateFrameNumbers('player', { frames: [ 6, 7, 8 ] }),
		frameRate: 8
    });
}

export function update() 
{
	// Player state --> 0- idle, 1- mirando arriba, 2- mirando abajo, 3- mirando izquierda, 4- mirando derecha

	if (keys.Up.isDown) {
		player.setVelocityY(-playerSpeed);
		player.state = 1;
		
	}
	else if (keys.Down.isDown) {
		player.setVelocityY(playerSpeed);
		player.state = 2;
	}
	else {
		player.setVelocityY(0);
		player.state = 0;
	}

	if (keys.Left.isDown) {
		player.setVelocityX(-playerSpeed);
		player.state = 3;
	}
	else if (keys.Right.isDown) {
		player.setVelocityX(playerSpeed);
		player.state = 4;
	}
	else {
		player.setVelocityX(0);
		player.state = 0;
	}
	animationPlayer.call(this);
}

function animationPlayer() 
{
	if (player.state == 1) {
		player.play('UpAnim', true);
	}
	else if (player.state == 2) {
		player.play('DownAnim', true);
	}
	else if (player.state == 3) {
		player.play('LeftAnim', true);
	}
	else if (player.state == 4) {
		player.play('RightAnim', true);
	}
	else {
		player.play('idle', true);
	}
}