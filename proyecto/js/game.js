import * as player from './player.js';
import * as keys from './keys.js';

export class Game extends Phaser.Scene {
	
	constructor() {
		super({ key: 'game' });
	}

	preload() 
	{
		this.load.image('tiles', 'assets/tilemap/tiles.png');
		this.load.tilemapTiledJSON('map', 'assets/tilemap/map.json');

		player.preload.call(this)
	}
	
	create() 
	{
		this.add.sprite(0,0,'tiles');

		var map = this.make.tilemap({key: 'map'});
		var tileset = map.addTilesetImage('Basement', 'tiles');

		var ground = map.createLayer('Ground', tileset);
		var decoration = map.createLayer('Decoration', tileset);
		var wall = map.createLayer('Wall', tileset);

		player.create.call(this);
		keys.create.call(this);
		
	}

	update() 
	{
		player.update.call(this);
	}

}