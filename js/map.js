export var map;
export var tileset;
export var ground;
export var decoration;
export var wall;

export function preload() 
{
	this.load.image('tiles', 'tileset/tiles.png');
	this.load.tilemapTiledJSON('map', 'assets/tilemap/map.json');
}

export function create()
{
	map = this.make.tilemap({key: 'map'});
	tileset = map.addTilesetImage('Basement', 'tiles');
	
	ground = map.createLayer('Ground', tileset);
	decoration = map.createLayer('Decoration', tileset);
	wall = map.createLayer('Wall', tileset);
	wall.setCollisionByProperty({ collides: true });

	this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
	this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
}