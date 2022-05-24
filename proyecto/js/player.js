export class Player extends Phaser.Scene {
	
	constructor() {
		super({key: 'player'});
	}

	var playerSpeed;

	preload() {
		this.load.spritesheet('idle','assets/animaciones/player/idle.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('left','assets/animaciones/player/idle.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('right','assets/animaciones/player/idle.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('up','assets/animaciones/player/idle.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('down','assets/animaciones/player/idle.png', { frameWidth: 32, frameHeight: 32 });
	}
	
	create() {
		
		player = this.create(100,150,'Player');
		player.maxVida = 5;
		player.vida = player.maxVida;
		playerSpeed = 100;

		this.physics.add.collider(player, walls);
		this.cameras.main.startFollow(player);

		tearList = scene.physics.add.group();
		bombList = scene.physics.add.group();

		scene.anims.create({
			key: 'idlePlayer',
			frames: scene.anims.generateFrameNumbers('idle'),
			frameRate: 50,
			repeat: -1
		});

		scene.anims.create({
			key: 'upPlayer',
			frames: scene.anims.generateFrameNumbers('up'),
			frameRate: 50,
			repeat: -1
		});

		scene.anims.create({
			key: 'downPlayer',
			frames: scene.anims.generateFrameNumbers('down'),
			frameRate: 50,
			repeat: -1
		});

		scene.anims.create({
			key: 'leftPlayer',
			frames: scene.anims.generateFrameNumbers('left'),
			frameRate: 50,
			repeat: -1
		});

		scene.anims.create({
			key: 'rightPlayer',
			frames: scene.anims.generateFrameNumbers('right'),
			frameRate: 50,
			repeat: -1
		});

		player.play('idlePlayer', true));
	}
	
	createTear() {
	
	}

	updateTear() {
	
	}

	createBomb() {

	}

	updateBomb() {

	}

	update() {
		inputPlayer();
	}
	
	inputPlayer() {

		// Player state --> 0- idle, 1- mirando arriba, 2- mirando abajo, 3- mirando izquierda, 4- mirando derecha

		if (keys.Up.isDown) {
			player.moveY = -1;
			player.state = 1;
			
		}
		else if (keys.Down.isDown) {
			player.moveY = 1;
			player.state = 2;
		}
		else {
			player.moveY = 0;
			player.state = 0;
		}

		if (keys.Left.isDown) {
			player.moveX = -1;
			player.state = 3;
		}
		else if (keys.Right.isDown) {
			player.moveX = 1;
			player.state = 4;
		}
		else {
			player.moveX = 0;
			player.state = 0;
		}

		if (keys.pointer.isDown) {
			updateTear();
		}

		animationPlayer();

		player.dir = new Phaser.Math.Vector2( player.moveX, player.moveY);
		player.dir.normalize();
		player.setVelocityX(playerSpeed*player.dir.x);
		player.setVelocityY(playerSpeed*player.dir.y);
		
	}
	
	animationPlayer() {
		if (player.state == 1) {
			player.play('upPlayer', true);
		}
		else if (player.state == 2) {
			player.play('downPlayer', true));
		}
		else if (player.state == 3) {
			player.play('leftPlayer', true));
		}
		else if (player.state == 4) {
			player.play('rightPlayer', true));
		}
		else {
			player.play('idlePlayer', true));
		}
	}
}