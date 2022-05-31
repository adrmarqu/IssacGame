import * as isaac from './player.js';
import * as keys from './keys.js';
import * as issacMap from './map.js';

export class Game extends Phaser.Scene {
	
	constructor() {
		super({ key: 'game' });
	}
 
	preload() 
	{
		issacMap.preload.call(this);
		isaac.preload.call(this);
	}
	
	create() 
	{	
		issacMap.create.call(this);
		isaac.create.call(this);
		keys.create.call(this);

		this.physics.add.collider(isaac.player, issacMap.wall);
	}

	update() 
	{
		isaac.update.call(this);
	}

}