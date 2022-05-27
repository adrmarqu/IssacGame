import * as isaac from './player.js';
import * as keys from './keys.js';

export class Game extends Phaser.Scene {
	
	constructor() {
		super({ key: 'game' });
	}

	preload() 
	{
		this.load.image('tiles', 'tileset/tiles.png');
		this.load.tilemapTiledJSON('map', 'assets/tilemap/map.json');

		isaac.preload.call(this)
	}
	
	create() 
	{
		this.add.sprite(0,0,'tiles');

		var map = this.make.tilemap({key: 'map'});
		var tileset = map.addTilesetImage('Basement', 'tiles');

		var ground = map.createLayer('Ground', tileset);
		var decoration = map.createLayer('Decoration', tileset);
		var wall = map.createLayer('Wall', tileset);

		isaac.create.call(this);
		keys.create.call(this);

		this.physics.add.collider(isaac.player, wall);
		
	}

	update() 
	{
		isaac.update.call(this);
	}

}