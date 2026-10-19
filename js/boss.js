import * as isaac from './player.js';
import * as fly from './fly.js';

export var bossGroup;
export var bossTearGroup;
export var bossActive = false;
export var bossHealth = 20;
export var maxBossHealth = 20;

var bossSprite;
var bossBar;
var bossBarBg;
var bossText;
var spawnEvent;
var shootEvent;
var moveEvent;

export function preload() 
{
}

export function create() 
{
	bossGroup = this.physics.add.group();
	bossTearGroup = this.physics.add.group();
	bossActive = false;
	bossSprite = null;
	bossBar = null;
	bossBarBg = null;
	bossText = null;
	spawnEvent = null;
	shootEvent = null;
	moveEvent = null;
}

export function spawnBoss(scene) 
{
	if (bossActive) 
	{
		return;
	}

	bossActive = true;
	bossHealth = maxBossHealth;

	bossSprite = bossGroup.create(336, 150, 'fly');
	bossSprite.setScale(2.5);
	bossSprite.play('flyAnim');
	bossSprite.setCollideWorldBounds(true);
	bossSprite.setBounce(1);
	bossSprite.body.setSize(24, 24);
	bossSprite.setVelocity(60, 40);

	bossText = scene.add.text(200, 260, 'DUKE OF FLIES', { fontSize: '11px', fill: '#FFF', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0);
	bossBarBg = scene.add.rectangle(200, 275, 204, 10, 0x333333).setScrollFactor(0);
	bossBar = scene.add.rectangle(200, 275, 200, 8, 0xCC0000).setScrollFactor(0);

	shootEvent = scene.time.addEvent({
		delay: 2000,
		loop: true,
		callback: () => {
			if (!bossActive || !bossSprite || !bossSprite.active) 
			{
				return;
			}
			var tear = bossTearGroup.create(bossSprite.x, bossSprite.y, 'bullet');
			tear.setTint(0xff3333);
			scene.physics.moveToObject(tear, isaac.player, 160);
		}
	});

	spawnEvent = scene.time.addEvent({
		delay: 4000,
		loop: true,
		callback: () => {
			if (!bossActive || !bossSprite || !bossSprite.active) 
			{
				return;
			}
			var minion = fly.flies.create(bossSprite.x, bossSprite.y, 'fly');
			minion.play('flyAnim');
			minion.setCollideWorldBounds(true);
			minion.setBounce(1);
			minion.health = 2;
			minion.body.setSize(20, 20);
		}
	});

	moveEvent = scene.time.addEvent({
		delay: 2500,
		loop: true,
		callback: () => {
			if (!bossActive || !bossSprite || !bossSprite.active) 
			{
				return;
			}
			bossSprite.setVelocity(Phaser.Math.Between(-80, 80), Phaser.Math.Between(-80, 80));
		}
	});
}

export function hitBoss(damage, scene) 
{
	if (!bossActive || !bossSprite || !bossSprite.active) 
	{
		return;
	}

	bossHealth -= damage || 1;
	bossSprite.setTint(0xff0000);

	setTimeout(() => {
		if (bossSprite && bossSprite.active && bossSprite.clearTint) 
		{
			bossSprite.clearTint();
		}
	}, 100);

	if (bossBar) 
	{
		var pct = Math.max(0, bossHealth / maxBossHealth);
		bossBar.width = 200 * pct;
	}

	if (bossHealth <= 0) 
	{
		bossActive = false;
		if (bossSprite && bossSprite.active) 
		{
			bossSprite.destroy();
		}

		if (shootEvent) 
		{
			shootEvent.destroy();
			shootEvent = null;
		}
		if (spawnEvent) 
		{
			spawnEvent.destroy();
			spawnEvent = null;
		}
		if (moveEvent) 
		{
			moveEvent.destroy();
			moveEvent = null;
		}
		if (bossBar) 
		{
			bossBar.destroy();
			bossBar = null;
		}
		if (bossBarBg) 
		{
			bossBarBg.destroy();
			bossBarBg = null;
		}
		if (bossText) 
		{
			bossText.destroy();
			bossText = null;
		}

		scene.add.text(200, 140, 'VICTORY!\nBOSS DEFEATED', {
			fontSize: '22px',
			fill: '#FFD700',
			align: 'center',
			fontStyle: 'bold'
		}).setOrigin(0.5).setScrollFactor(0);
	}
}
