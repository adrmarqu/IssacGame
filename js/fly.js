export var flies;
export var keyGroup;
export var keySpawned = false;

export function preload() 
{
	this.load.spritesheet('fly', 'assets/sprites/fly.png', { frameWidth: 32, frameHeight: 32 });
	this.load.image('key', 'assets/sprites/key.png');
}

export function create() 
{
	keySpawned = false;

	if (!this.anims.exists('flyAnim')) 
	{
		this.anims.create({
			key: 'flyAnim',
			frames: this.anims.generateFrameNumbers('fly', { start: 0, end: 1 }),
			frameRate: 8,
			repeat: -1
		});
	}

	flies = this.physics.add.group();
	keyGroup = this.physics.add.group();

	var spawnPoints = [
		{ x: 200, y: 150 },
		{ x: 450, y: 150 },
		{ x: 200, y: 280 },
		{ x: 450, y: 280 }
	];

	spawnPoints.forEach((pos) => {
		var enemy = flies.create(pos.x, pos.y, 'fly');
		enemy.play('flyAnim');
		enemy.setCollideWorldBounds(true);
		enemy.setBounce(1);
		enemy.health = 3;
		enemy.body.setSize(20, 20);
	});
}

export function update(target) 
{
	if (!target || !target.body || !target.active || !flies) 
	{
		return;
	}

	flies.getChildren().forEach((enemy) => {
		if (enemy && enemy.active && enemy.body) 
		{
			this.physics.moveToObject(enemy, target, 60);
		}
	});
}

export function hitEnemy(enemy, scene) 
{
	if (!enemy || !enemy.active) 
	{
		return;
	}

	enemy.health--;
	enemy.setTint(0xff0000);

	setTimeout(() => {
		if (enemy && enemy.active && enemy.clearTint) 
		{
			enemy.clearTint();
		}
	}, 100);

	if (enemy.health <= 0) 
	{
		var ex = enemy.x;
		var ey = enemy.y;
		enemy.destroy();

		var remaining = flies.getChildren().filter((f) => f.active).length;
		if (remaining === 0 && !keySpawned && scene) 
		{
			keySpawned = true;
			var key = keyGroup.create(ex, ey, 'key');
			key.setScale(1.2);
			key.setBounce(0.5);
			key.setCollideWorldBounds(true);
		}
	}
}
