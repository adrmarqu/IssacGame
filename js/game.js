import * as isaac from './player.js';
import * as keys from './keys.js';
import * as issacMap from './map.js';
import * as fly from './fly.js';
import * as boss from './boss.js';

var door;
var doorLocked = true;
var isEnteringBoss = false;
var controlsHint;

export class Game extends Phaser.Scene {
	
	constructor() {
		super({ key: 'game' });
	}
 
	preload() 
	{
		this.load.image('door_closed', 'assets/sprites/door_closed.png');
		this.load.image('door_open', 'assets/sprites/door_open.png');
		issacMap.preload.call(this);
		isaac.preload.call(this);
		fly.preload.call(this);
		boss.preload.call(this);
	}
	
	create() 
	{	
		this.cameras.main.resetFX();

		doorLocked = true;
		isEnteringBoss = false;

		issacMap.create.call(this);
		isaac.create.call(this);
		keys.create.call(this);
		fly.create.call(this);
		boss.create.call(this);

		door = this.physics.add.sprite(336, 54, 'door_closed');
		door.setScale(1.2);
		door.setImmovable(true);
		door.body.setSize(44, 40);
		door.setDepth(1);

		controlsHint = this.add.text(200, 285, 'WASD: Move  |  SPACE: Shoot  |  Q/E: Bomb', {
			fontSize: '10px',
			fill: '#BBB'
		}).setOrigin(0.5).setScrollFactor(0);
		controlsHint.setDepth(100);
		controlsHint.setStroke('#000000', 3);

		this.physics.add.collider(isaac.player, issacMap.wall);
		this.physics.add.collider(fly.flies, issacMap.wall);
		this.physics.add.collider(fly.flies, fly.flies);

		this.physics.add.collider(boss.bossGroup, issacMap.wall);
		this.physics.add.collider(boss.bossTearGroup, issacMap.wall, (tear) => {
			tear.destroy();
		});

		this.physics.add.collider(isaac.tearList, issacMap.wall, (tear) => {
			tear.destroy();
		});

		this.physics.add.overlap(isaac.tearList, fly.flies, (tear, enemy) => {
			tear.destroy();
			fly.hitEnemy(enemy, this);
		});

		this.physics.add.overlap(isaac.player, fly.flies, () => {
			isaac.lostLife.call(this);
		});

		this.physics.add.overlap(isaac.player, fly.keyGroup, (p, key) => {
			isaac.getKey();
			key.destroy();
		});

		this.physics.add.overlap(isaac.tearList, boss.bossGroup, (tear) => {
			tear.destroy();
			boss.hitBoss(1, this);
		});

		this.physics.add.overlap(isaac.player, boss.bossGroup, () => {
			isaac.lostLife.call(this);
		});

		this.physics.add.overlap(isaac.player, boss.bossTearGroup, (p, tear) => {
			tear.destroy();
			isaac.lostLife.call(this);
		});

		this.physics.add.overlap(isaac.player, door, () => {
			if (doorLocked && isaac.player.keys > 0) 
			{
				doorLocked = false;
				isaac.player.keys--;
				isaac.keyT.setText('Keys: ' + isaac.player.keys);
				door.setTexture('door_open');
			}
			else if (!doorLocked && !isEnteringBoss) 
			{
				enterBossRoom.call(this);
			}
		});
	}

	update() 
	{
		if (!isaac.player || !isaac.player.body || !isaac.player.active) 
		{
			return;
		}
		isaac.update.call(this);
		fly.update.call(this, isaac.player);
	}

}

function enterBossRoom() 
{
	if (isEnteringBoss || boss.bossActive) 
	{
		return;
	}

	isEnteringBoss = true;

	if (door) 
	{
		door.disableBody(true, false);
	}

	this.cameras.main.fade(300, 0, 0, 0);
	this.time.delayedCall(300, () => {
		isaac.player.setPosition(336, 340);
		if (door) 
		{
			door.destroy();
		}
		if (fly.flies) 
		{
			fly.flies.clear(true, true);
		}
		this.cameras.main.fadeIn(300, 0, 0, 0);
		boss.spawnBoss(this);
	});
}