export class Game extends Phaser.Scene {
	

	constructor() {
		super({key: 'game' });
	}

	preload() {
		
		this.load.image('background', 'assets/images/background.jpg');
	}
	
	create() {

		this.add.image(0, 0, 'background');

	}

}