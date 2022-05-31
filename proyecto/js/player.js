import * as keys from './keys.js';

export var player;
export var playerSpeed;
export var tear;

export function preload() 
{
	this.load.spritesheet('player','assets/animations/player.png', { frameWidth: 94, frameHeight: 64 });
	this.load.image('bullet', 'assets/sprites/tear.png');
} 
 
export function create() 
{
	player = this.physics.add.sprite(400,300,'player');
	player.body.setSize(30, 40, true)
	player.state = 0;
	playerSpeed = 200;

	this.cameras.main.startFollow(player);

	tearList = this.physics.add.group();

	this.anims.create({
		key: 'idleDown',
		frames: this.anims.generateFrameNumbers('player', { frames: [ 1 ] }),
		frameRate: 1
    });

	this.anims.create({
		key: 'idleLeft',
		frames: this.anims.generateFrameNumbers('player', { frames: [ 4 ] }),
		frameRate: 1
    });

	this.anims.create({
		key: 'idleRight',
		frames: this.anims.generateFrameNumbers('player', { frames: [ 7 ] }),
		frameRate: 1
    });

	this.anims.create({
		key: 'idleUp',
		frames: this.anims.generateFrameNumbers('player', { frames: [ 10 ] }),
		frameRate: 1
    });

	this.anims.create({
		key: 'UpAnim',
		frames: this.anims.generateFrameNumbers('player', { frames: [ 9, 10, 11 ] }),
		frameRate: 3
    });

	this.anims.create({
		key: 'DownAnim',
		frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 1, 2 ] }),
		frameRate: 3
    });
	
	this.anims.create({
		key: 'LeftAnim',
		frames: this.anims.generateFrameNumbers('player', { frames: [ 3, 4, 5 ] }),
		frameRate: 3
    });

	this.anims.create({
		key: 'RightAnim',
		frames: this.anims.generateFrameNumbers('player', { frames: [ 6, 7, 8 ] }),
		frameRate: 3
    });
}

export function update() 
{
	controlsPlayer.call(this);
}

function controlsPlayer() 
{
	// Player state --> 1- mirando arriba, 2- mirando abajo, 3- mirando izquierda, 4- mirando derecha

	if (keys.Up.isDown) 
	{
		player.play('UpAnim', true);
		player.setVelocityY(-playerSpeed);
		player.state = 1;
	}
	else if (keys.Down.isDown) 
	{
		player.play('DownAnim', true);
		player.setVelocityY(playerSpeed);
		player.state = 2;
	}
	else 
	{
		player.setVelocityY(0);
		idlePlayer.call(this);
	}

	if (keys.Left.isDown) 
	{
		player.play('LeftAnim', true);
		player.setVelocityX(-playerSpeed);
		player.state = 3;
	}
	else if (keys.Right.isDown) 
	{
		player.play('RightAnim', true);
		player.setVelocityX(playerSpeed);
		player.state = 4;
	}
	else 
	{
		player.setVelocityX(0);
		idlePlayer.call(this);
	}

	if (keys.Shoot.isDown) 
	{
		PlayerShoot.call(this);
	}
}
 
function idlePlayer() 
{
	if (player.state == 1) 
	{
		player.play('idleUp', true);
	}
	else if (player.state == 2) 
	{
		player.play('idleDown', true);
	}
	else if (player.state == 3) 
	{
		player.play('idleLeft', true);
	}
	else if (player.state == 4) 
	{
		player.play('idleRight', true);
	}
}

function PlayerShoot() 
{
	console.log("Hola");

	tear = this.tearList.create(player.x, player.y, 'bullet');

	if (player.state == 1) 
	{
		tear.setVelocityY(100);
	}
	else if (player.state == 2) 
	{
		tear.setVelocityY(-100);
	}
	else if (player.state == 3) 
	{
		tear.setVelocityX(100);
	}
	else if (player.state == 4) 
	{
		tear.setVelocityX(-100);
	}
}