import * as keys from './keys.js';

export var player;
export var playerSpeed;

export var healthT;
export var bombT;
export var keyT;

var shootTime;
var bombTime;

export function preload() 
{
	this.load.spritesheet('player','assets/animations/player.png', { frameWidth: 94, frameHeight: 64 });
	this.load.image('bullet', 'assets/sprites/tear.png');
} 
 
export function create() 
{
	createPlayer.call(this);
	cretaeInventory.call(this);
	createAnimationPlayer.call(this);
}

function createPlayer() 
{
	player = this.physics.add.sprite(400,300,'player');
	player.body.setSize(30, 40, true)
	player.state = 0;
	playerSpeed = 200;
	player.health = 5;
	player.bombs = 3;
	player.keys = 0;

	shootTime = 0;
	bombTime = 0;

	this.cameras.main.startFollow(player);

	this.tearList = this.physics.add.group();
}

function createAnimationPlayer()
{
	this.anims.create({
		key: 'UpAnim',
		frames: this.anims.generateFrameNumbers('player', { frames: [ 9, 10, 11 ] }),
		frameRate: 8
    });

	this.anims.create({
		key: 'DownAnim',
		frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 1, 2 ] }),
		frameRate: 8,
		repeat: -1
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

function cretaeInventory()
{
	healthT = this.add.text(210, 160, 'Health: ' + player.health, { fontsize: '32px', fill: '#FFF' });
	bombT = this.add.text(210, 185, 'Bombs: ' + player.bombs, { fontsize: '32px', fill: '#FFF' });
	keyT = this.add.text(210, 210, 'Keys: ' + player.keys, { fontsize: '32px', fill: '#FFF' });
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
		player.setVelocityY(-playerSpeed);
		player.state = 1;
		animationPlayer.call(this);
	}
	else if (keys.Down.isDown) 
	{
		player.setVelocityY(playerSpeed);
		player.state = 2;
		animationPlayer.call(this);
	}
	else 
	{
		player.setVelocityY(0);
	}

	if (keys.Left.isDown) 
	{
		player.setVelocityX(-playerSpeed);
		player.state = 3;
		animationPlayer.call(this);
	}
	else if (keys.Right.isDown) 
	{
		player.setVelocityX(playerSpeed);
		player.state = 4;
		animationPlayer.call(this);
	}
	else 
	{
		player.setVelocityX(0);
	}

	if (keys.Shoot.isDown && shootTime > 30) 
	{
		shootTime = 0;
		playerShoot.call(this);
	}

	if (keys.Bomb.isDown && bombTime > 50 && player.bombs > 0) 
	{
		bombTime = 0;
		useBomb.call(this);
	}

	bombTime++;
	shootTime++;
}

function animationPlayer() 
{
	if (player.state == 1) 
	{
		player.play('UpAnim', true);
	}
	else if (player.state == 2) 
	{
		player.play('DownAnim', true);
	}
	else if (player.state == 3) 
	{
		player.play('LeftAnim', true);
	}
	else if (player.state == 4) 
	{
		player.play('RightAnim', true);
	}
}

function playerShoot() 
{
	var tear = this.tearList.create(player.x, player.y, 'bullet');

	if (player.state == 1) 
	{
		tear.setVelocityY(-250);
	}
	else if (player.state == 2) 
	{
		tear.setVelocityY(250);
	}
	else if (player.state == 3) 
	{
		tear.setVelocityX(-250);
	}
	else if (player.state == 4) 
	{
		tear.setVelocityX(250);
	}
}

export function lostLife()
{
	player.health--;

	if (player.health <= 0)
	{
		console.log("You lost");
	}
}

function useBomb()
{
	player.bombs--;
	bombT.setText('Bombs: ' + player.bombs);
}

export function getBomb()
{
	player.bombs++;
	bombT.setText('Bombs: ' + player.bombs);
}

export function getKey()
{
	player.keys++;
	keyT.setText('Keys: ' + player.keys);
}