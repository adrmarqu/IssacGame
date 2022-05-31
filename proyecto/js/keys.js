export var pointer
export var Up
export var Down
export var Left
export var Right
export var Shoot

export function create()
{
	pointer = this.input.activePointer
	Up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	Down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	Shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
} 