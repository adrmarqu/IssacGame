import * as keys from './keys.js';
import * as fly from './fly.js';
import * as boss from './boss.js';

export var player;
export var playerSpeed;

export var healthT;
export var bombT;
export var keyT;
export var tearList;

var shootTime;
var bombTime;
var canTakeDamage = true;

export function preload() 
{
	this.load.spritesheet('player','assets/animations/player.png', { frameWidth: 94, frameHeight: 64 });
	this.load.image('bullet', 'assets/sprites/tear.png');
	this.load.image('bomb', 'assets/sprites/bomb.png');
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
	player.body.setSize(30, 40, true);
	player.setCollideWorldBounds(true);
	player.state = 0;
	playerSpeed = 200;
	player.health = 5;
	player.bombs = 3;
	player.keys = 0;

	canTakeDamage = true;
	shootTime = 0;
	bombTime = 0;

	this.cameras.main.startFollow(player);

	tearList = this.physics.add.group();
	this.tearList = tearList;
}

function createAnimationPlayer()
{
	if (this.anims.exists('UpAnim')) 
	{
		return;
	}

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
	healthT = this.add.text(10, 10, 'Health: ' + player.health, { fontSize: '14px', fill: '#FFF' });
	healthT.setScrollFactor(0);
	healthT.setDepth(100);
	healthT.setStroke('#000000', 3);

	bombT = this.add.text(10, 28, 'Bombs: ' + player.bombs, { fontSize: '14px', fill: '#FFF' });
	bombT.setScrollFactor(0);
	bombT.setDepth(100);
	bombT.setStroke('#000000', 3);

	keyT = this.add.text(10, 46, 'Keys: ' + player.keys, { fontSize: '14px', fill: '#FFF' });
	keyT.setScrollFactor(0);
	keyT.setDepth(100);
	keyT.setStroke('#000000', 3);
}

export function update() 
{
	controlsPlayer.call(this);
}

function controlsPlayer() 
{
	if (!player || player.health <= 0) 
	{
		return;
	}

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

	if ((keys.Bomb.isDown || keys.BombE.isDown) && bombTime > 50 && player.bombs > 0) 
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
	var tear = tearList.create(player.x, player.y, 'bullet');

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
	else 
	{
		tear.setVelocityY(250);
	}
}

export function lostLife()
{
	if (!canTakeDamage || player.health <= 0)
	{
		return;
	}

	canTakeDamage = false;
	player.health--;

	if (healthT)
	{
		healthT.setText('Health: ' + player.health);
	}

	player.setTint(0xff0000);

	setTimeout(() => {
		if (player && player.clearTint)
		{
			player.clearTint();
		}
	}, 200);

	setTimeout(() => {
		if (player && player.health > 0)
		{
			canTakeDamage = true;
		}
	}, 1000);

	if (player.health <= 0)
	{
		canTakeDamage = false;
		player.setVelocity(0, 0);
		player.setTint(0x555555);

		var gameOverText = this.add.text(200, 150, 'GAME OVER', {
			fontSize: '28px',
			fill: '#FF0000',
			fontStyle: 'bold'
		}).setOrigin(0.5).setScrollFactor(0);
		gameOverText.setDepth(200);

		this.time.delayedCall(1000, () => {
			this.scene.restart();
		});
	}
}

function useBomb()
{
	player.bombs--;
	bombT.setText('Bombs: ' + player.bombs);

	var bomb = this.physics.add.sprite(player.x, player.y, 'bomb');
	bomb.setScale(0.35);

	var flashInterval = setInterval(() => {
		if (bomb && bomb.active) 
		{
			bomb.setTint(bomb.isTinted ? 0xffffff : 0xff0000);
		}
	}, 250);

	setTimeout(() => {
		clearInterval(flashInterval);
		if (bomb && bomb.active) 
		{
			this.cameras.main.shake(150, 0.01);

			if (fly && fly.flies) 
			{
				fly.flies.getChildren().forEach((enemy) => {
					if (enemy && enemy.active) 
					{
						var dist = Phaser.Math.Distance.Between(bomb.x, bomb.y, enemy.x, enemy.y);
						if (dist < 90) 
						{
							fly.hitEnemy(enemy, this);
							fly.hitEnemy(enemy, this);
							fly.hitEnemy(enemy, this);
						}
					}
				});
			}

			if (boss && boss.bossActive && boss.bossGroup) 
			{
				boss.bossGroup.getChildren().forEach((b) => {
					if (b && b.active) 
					{
						var dist = Phaser.Math.Distance.Between(bomb.x, bomb.y, b.x, b.y);
						if (dist < 100) 
						{
							boss.hitBoss(5, this);
						}
					}
				});
			}

			var distToPlayer = Phaser.Math.Distance.Between(bomb.x, bomb.y, player.x, player.y);
			if (distToPlayer < 70) 
			{
				lostLife.call(this);
			}

			bomb.destroy();
		}
	}, 2000);
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