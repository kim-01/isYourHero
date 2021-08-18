
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.1 (Phaser v2.6.2)


/**
 * preload.
 */
function preload() {
	
	Phaser.State.call(this);
	
}
this.ready = false;
/** @type Phaser.State */
var preload_proto = Object.create(Phaser.State.prototype);
preload.prototype = preload_proto;
preload.prototype.constructor = preload;

this.ready = false;
preload.prototype.init = function () {
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#000000';
};

preload.prototype.preload = function () {
	this.preloadBar = this.add.sprite(200,250,'preloading');
	this.load.setPreloadSprite(this.preloadBar);
	this.load.pack('images', 'assets/pack.json');
	this.load.pack('audio', 'assets/pack.json');
	this.load.onLoadComplete.add(this.loadComplete, this);
};
preload.prototype.loadComplete = function () {
	this.ready = true;
};

preload.prototype.update = function () {
	if (this.ready === true) {
		this.game.state.start("mainDoor");
	}
};

/* --- end generated code --- */
// -- user code here --
