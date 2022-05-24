export class Player extends Phaser.Scene {
	

	constructor() {
		super({key: 'player'});
	}




	preload() {
		//this.load.spritesheet('Player','assets/animaciones/robin/Stand.png', { frameWidth: 32, frameHeight: 32 });
	
		scene = this;
	}
	
	create() {

		createAnimationPlayer();
		createPlayer();
	}

	createAnimationPlayer() {
		
		/*scene.anims.create({
			key: 'idlePlayer',
			frames: scene.anims.generateFrameNumbers('idle'),
			frameRate: 50,
			repeat: -1
		});*/
	}
	
	createPlayer() {
	
	}
	
	UpdatePlayer() {
	
	}
	
	createBullet() {
	
	}
	
	updateBullet() {
	
	}
	
	inputPlayer() {
	
	}
	
	animationPlayer() {
	
	}
}