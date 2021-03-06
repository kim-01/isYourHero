
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.1 (Phaser v2.6.2)


/**
 * kyoto.
 */
function kyoto() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var kyoto_proto = Object.create(Phaser.State.prototype);
kyoto.prototype = kyoto_proto;
kyoto.prototype.constructor = kyoto;

kyoto.prototype.init = function () {
	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';
	current_spot = "kyoto";
};


/** 사진 */
var kt_arasi; 					// 아라시 사진
var kt_silver; 					// 은각사 사진
var kt_gold; 					// 금각사 사진
var kt_husimi; 					// 후시미 사진
var kt_temple; 					// 청수사 사진

/** 좌표버튼 */
var arasi_btn; 					// 아라시야마 좌표버튼
var silver_btn;					// 운걱서 좌표버튼
var gold_btn; 					// 금각사 좌표버튼
var husimi_btn;					// 후시미이나리 좌표버튼
var temple_btn; 				// 청수사 좌표버튼

/** 확대 사진 */
var arasi_zum; 					// 아라시야마 확대
var silver_zum;					// 운걱서 확대
var gold_zum; 					// 금각사 확대
var husimi_zum; 				// 후시미이나리 확대
var temple_zum;					// 청수사 확대

/** 각각 관광지 이미지의 확대여부에 대한 변수 */
var arasi_iszum = null;	
var silver_iszum = null;
var gold_iszum = null;
var husimi_iszum = null;
var temple_iszum = null;

/** 기타 소재 */
var kt_toStore; 					// 상점이동버튼
var kt_confmove; 					// 페이지 이동시 묻는 창
var kt_yesbtn;
var kt_nobtn;
var kt_msgwrite;
var kt_bgm;	

/** 별점 표현 */
var kt_stars;						// 그룹별
var kt_samount;						// 남은 별 갯수
var kt_smax = 3;					// 최대 별 갯수

/** 지표 클릭 여부 확인 - 페이지 이동 Flag */
var arasi_clicked = false;			// 아라시야마
var silver_clicked = false;			// 운걱서
var gold_clicked = false;			// 금각사
var husimi_clicked = false;			// 후시미이나리
var temple_clicked = false;			// 청수사


kyoto.prototype.preload = function () {
	
	this.load.pack('images', 'assets/pack.json');
	this.load.pack('audio', 'assets/pack.json');
	
};

kyoto.prototype.create = function () {
	var _kyotoMap = this.add.sprite(0.0, 0.0, 'kyotoMap');
	_kyotoMap.scale.setTo(1.3163935024542592, 1.514999942283);
	
	// bgm
	kt_bgm = this.add.audio('SelectArea');
	kt_bgm.play();
	kt_bgm.loopFull();
	
	kt_toStore=this.add.button(640.0, 440.0, 'btn_store', kt_gotoStore, this, 0, 1, 0, 1);;
	kt_toStore.scale.setTo(0.9, 0.9);

	arasi_btn = this.add.button(426.0, 272.0, 'kt_as_click',thumbArasi, this, 0, 1, 0, 1);
	arasi_btn.scale.setTo(0.35, 0.35);
	arasi_btn.inputEnabled=true;
	
	silver_btn = this.add.button(226.0, 231.0, 'kt_kk_click',thumbSilver, this, 0, 1, 0, 1);
	silver_btn.scale.setTo(0.35, 0.35);
	silver_btn.inputEnabled=true;
	
	husimi_btn = this.add.button(122.0, 203.0, 'kt_hm_click',thumbHusimi, this, 0, 1, 0, 1);
	husimi_btn.scale.setTo(0.35, 0.35);
	husimi_btn.inputEnabled=true;
	
	gold_btn = this.add.button(348.0, 154.0, 'kt_gk_click',thumbGold, this, 0, 1, 0, 1);
	gold_btn.scale.setTo(0.35, 0.35);
	gold_btn.inputEnabled=true;
	
	temple_btn = this.add.button(571.0, 240.0, 'kt_km_click',thumbTemple, this, 0, 1, 0, 1);
	temple_btn.scale.setTo(0.35, 0.35);
	temple_btn.inputEnabled=true;
	
	kt_arasi = this.add.sprite(428.0, 186.0, 'kt_as_thumb');
	kt_arasi.scale.setTo(0.1, 0.1);
	kt_arasi.visible = false;
	
	kt_silver = this.add.sprite(224.0, 152.0, 'kt_kk_thumb');
	kt_silver.scale.setTo(0.1, 0.1);
	kt_silver.visible = false;
	
	kt_husimi = this.add.sprite(109.0, 126.0, 'kt_hm_thumb');
	kt_husimi.scale.setTo(0.1, 0.1);
	kt_husimi.visible = false;

	kt_gold = this.add.sprite(343.0, 78.0, 'kt_gk_thumb');
	kt_gold.scale.setTo(0.1, 0.1);
	kt_gold.visible = false;
	
	kt_temple = this.add.sprite(570.0, 158.0, 'kt_km_thumb');
	kt_temple.scale.setTo(0.1, 0.1);
	kt_temple.visible = false;
	
	// 아라시
	arasi_zum = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'kt_as_thumb');
	arasi_zum.alpha = 0.8;
	arasi_zum.anchor.set(0.5);
	arasi_zum.inputEnabled = true;
	arasi_zum.events.onInputDown.add(arasiZoom, this);
	arasi_zum.scale.set(0.5);  //확대사진 사이즈
	arasi_zum.visible = false;

	// 은각사
	silver_zum = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'kt_kk_thumb');
	silver_zum.alpha = 0.8;
	silver_zum.anchor.set(0.5);
	silver_zum.inputEnabled = true;
	silver_zum.events.onInputDown.add(silverZoom, this);
	silver_zum.scale.set(0.5); // 확대사진 사이즈
	silver_zum.visible = false;

	// 금각사
	gold_zum = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'kt_gk_thumb');
	gold_zum.alpha = 0.8;
	gold_zum.anchor.set(0.5);
	gold_zum.inputEnabled = true;
	gold_zum.events.onInputDown.add(goldZoom, this);
	gold_zum.scale.set(0.5); //확대사진 사이즈
	gold_zum.visible = false;

	// 후시미
	husimi_zum = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'kt_hm_thumb');
	husimi_zum.alpha = 0.8;
	husimi_zum.anchor.set(0.5);
	husimi_zum.inputEnabled = true;
	husimi_zum.events.onInputDown.add(husimiZoom, this);
	husimi_zum.scale.set(0.5); //확대사진 사이즈
	husimi_zum.visible = false;

	// 청수사
	temple_zum = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'kt_km_thumb');
	temple_zum.alpha = 0.8;
	temple_zum.anchor.set(0.5);
	temple_zum.inputEnabled = true;
	temple_zum.events.onInputDown.add(templeZoom, this);
	temple_zum.scale.set(0.5); //확대사진 사이즈
	temple_zum.visible = false;
	
	kt_confmove = this.add.sprite(185,240, 'popup');
	kt_confmove.scale.setTo(1.5, 1.0);
	kt_confmove.alpha = 0.7;
	kt_confmove.visible = false;
	
	kt_msgwrite = this.add.text(220,260,'', {font : "bold 25px Arial", fill : "#000000", align : "left"});
	
	kt_exit = this.game.add.button(10.0, 10.0, 'btn_exit',kt_goJapanMap, this, 0, 1, 0, 1);
	kt_exit.scale.setTo(0.4, 0.4);
	kt_exit.inputEnabled=true;
	kt_exit.input.useHandCursor=true;
	
	kt_nobtn = this.game.add.button(565.0, 315.0, 'btn_nope',kt_cancel,this,0,1,0,1);
	kt_nobtn.scale.setTo(0.4, 0.4);
	kt_nobtn.inputEnabled = true;
	kt_nobtn.visible = false;
	
	kt_yesbtn = this.game.add.button(505.0, 315.0, 'btn_yes',kt_changePlace,this,0,1,0,1);
	kt_yesbtn.scale.setTo(0.4, 0.4);
	kt_yesbtn.inputEnabled = true;
	kt_yesbtn.visible = false;
	
	//별그룹
	kt_stars=this.add.group();
	
	/** 각 관광지 지표에 별점 찍기 */ 
	// 별의 갯수는 3최대개 /  60점 미만이면 빈 별만 3개
	//아라시	
	if (kt_as_rs >= 60) {
		kt_samount = Math.round(kt_as_rs - 60) / 10;
		if (kt_samount > 3 && kt_samount <= 4) {
			kt_samount = 3;
		} else if (kt_samount > 0 && kt_samount <= 3) {
			kt_samount = Math.round(kt_as_rs - 60) / 10;
		} else {
			kt_samount = 0;
		}
		for (var i = 0; i < kt_samount; i++) {
			var starr = kt_stars.create(420 + (i * 30), 240, 'stars(36x36)', 0);
			starr.scale.setTo(0.7, 0.7);
		}
		for (var i = 0; i < kb_smax - kt_samount; i++) {
			var starr = kt_stars.create(480 - (i * 30), 240, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	} else if (kt_as_rs < 60) {
		// 60점 밑이면 빈별세개찍히게
		for (var i = 0; i < 3; i++) {
			var starr = kt_stars.create(480 - (i * 30), 240, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	}
	
	// 은각사
	if (kt_kk_rs >= 60) {
		kt_samount = Math.round(kt_kk_rs - 60) / 10;
		if (kt_samount > 3 && kt_samount <= 4) {
			kt_samount = 3;
		} else if (kt_samount > 0 && kt_samount <= 3) {
			kt_samount = Math.round(kt_kk_rs - 60) / 10;
		} else {
			kt_samount = 0;
		}
		for (var i = 0; i < kt_samount; i++) {
			var starr = kt_stars.create(345 + (i * 30), 115, 'stars(36x36)', 0);
			starr.scale.setTo(0.7, 0.7);
		}
		for (var i = 0; i < kt_smax - kt_samount; i++) {
			var starr = kt_stars.create(405 - (i * 30), 115, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	} else if (kt_kk_rs < 60) {
		for (var i = 0; i < 3; i++) {
			var starr = kt_stars.create(405 - (i * 30), 115, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	}
	
  	// 금각사
	if (kt_gk_rs >= 60) {
		kt_samount = Math.round(kt_gk_rs - 60) / 10;
		if (kt_samount > 3 && kt_samount <= 4) {
			kt_samount = 3;
		} else if (kt_samount > 0 && kt_samount <= 3) {
			kt_samount = Math.round(kt_gk_rs - 60) / 10;
		} else {
			kt_samount = 0;
		}
		for (var i = 0; i < kt_samount; i++) {
			var starr = kt_stars.create(230 + (i * 30), 195, 'stars(36x36)', 0);
			starr.scale.setTo(0.7, 0.7);
		}
		for (var i = 0; i < kt_smax - kt_samount; i++) {
			var starr = kt_stars.create(290 - (i * 30), 195, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	} else if (kt_gk_rs < 60) {
		for (var i = 0; i < 3; i++) {
			var starr = kt_stars.create(290 - (i * 30), 195, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	}
	
	// 후시미
	if (kt_hm_rs >= 60) {
		kt_samount = Math.round(kt_hm_rs - 60) / 10;
		if (kt_samount > 3 && kt_samount <= 4) {
			kt_samount = 3;
		} else if (kt_samount > 0 && kt_samount <= 3) {
			kt_samount = Math.round(kt_hm_rs - 60) / 10;
		} else {
			kt_samount = 0;
		}
		for (var i = 0; i < kt_samount; i++) {
			var starr = kt_stars.create(125 + (i * 30), 170, 'stars(36x36)', 0);
			starr.scale.setTo(0.7, 0.7);
		}
		for (var i = 0; i < kt_smax - kt_samount; i++) {
			var starr = kt_stars.create(185 - (i * 30), 170, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	} else if (kt_hm_rs < 60) {
		for (var i = 0; i < 3; i++) {
			var starr = kt_stars.create(185 - (i * 30), 170, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	}
	
	// 청수사
	if (kt_km_rs >= 60) {
		kt_samount = Math.round(kt_km_rs - 60) / 10;
		if (kt_samount > 3 && kt_samount <= 4) {
			kt_samount = 3;
		} else if (kt_samount > 0 && kt_samount <= 3) {
			kt_samount = Math.round(kt_km_rs - 60) / 10;
		} else {
			kt_samount = 0;
		}
		for (var i = 0; i < kt_samount; i++) {
			var starr = kt_stars.create(570 + (i * 30), 205, 'stars(36x36)', 0);
			starr.scale.setTo(0.7, 0.7);
		}
		for (var i = 0; i < kt_smax - kt_samount; i++) {
			var starr = kt_stars.create(630 - (i * 30), 205, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	} else if (kt_km_rs < 60) {
		for (var i = 0; i < 3; i++) {
			var starr = kt_stars.create(630- (i * 30), 205, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	}
	
};


/** 해당 지표를 클릭하면 확대 사진을 보여주는 함수 */
function thumbArasi() {
	arasi_zum.visible = true;
	kt_arasi.visible = false;
	silver_btn.visible = false;
	gold_btn.visible = false;
	husimi_btn.visible = false;
	temple_btn.visible = false;
	kt_stars.visible = false;

	// 위에있는 popup 사이즈와 같게 해줘야한다.
	if ((arasi_iszum !== null && arasi_iszum.isRunning) || arasi_zum.scale.x === 0.5 && arasi_zum.scale.y === 0.5) {
		return;
	}
	arasi_iszum = this.game.add.arasi_iszum(arasi_zum.scale).to({x : 0.5, y : 0.8}, 1000, Phaser.Easing.Elastic.Out, true);
}

function thumbSilver() {
	silver_zum.visible = true;
	kt_silver.visible = false;
	arasi_btn.visible = false;
	gold_btn.visible = false;
	husimi_btn.visible = false;
	temple_btn.visible = false;
	kt_stars.visible = false;
	
	if ((silver_iszum !== null && silver_iszum.isRunning) || silver_zum.scale.x === 0.5) {
		return;
	}
	silver_iszum = this.game.add.silver_iszum(silver_zum.scale).to({x : 1, y : 1}, 1000, Phaser.Easing.Elastic.Out, true);
}

function thumbGold() {
	gold_zum.visible = true;
	kt_gold.visible = false;
	arasi_btn.visible = false;
	silver_btn.visible = false;
	husimi_btn.visible = false;
	temple_btn.visible = false;
	kt_stars.visible = false;
	
	if ((gold_iszum !== null && gold_iszum.isRunning) || gold_zum.scale.x === 0.5 && gold_zum.scale.y === 0.5) {
		return;
	}
	gold_iszum = this.game.add.gold_iszum(gold_zum.scale).to({x : 1,	y : 1}, 1000, Phaser.Easing.Elastic.Out, true);
}

function thumbHusimi() {
	husimi_zum.visible = true;
	kb_port.visible = false;
	arasi_btn.visible = false;
	silver_btn.visible = false;
	gold_btn.visible = false;
	temple_btn.visible = false;
	kt_stars.visible = false;
	
	if ((husimi_iszum !== null && husimi_iszum.isRunning) || husimi_zum.scale.x === 0.5) {
		return;
	}
	husimi_iszum = this.game.add.husimi_iszum(husimi_zum.scale).to({x : 1, y : 1}, 1000, Phaser.Easing.Elastic.Out, true);
}

function thumbTemple() {
	temple_zum.visible = true;
	arasi_btn.visible = false;
	silver_btn.visible = false;
	gold_btn.visible = false;
	husimi_btn.visible = false;
	kt_stars.visible = false;
	
	if ((temple_iszum !== null && temple_iszum.isRunning) || temple_zum.scale.x === 0.5 || temple_zum.scale.y === 0.5) {
		return;
	}
	temple_iszum = this.game.add.temple_iszum(temple_zum.scale).to({x : 1, y : 1}, 1000, Phaser.Easing.Elastic.Out, true);
}


/** 확대사진 클릭시 메시지창 보여주는 함수 */
function arasiZoom(item) {
	episodeKey = 'kt_as';
	kt_confmove.visible = true;
	kt_msgwrite.visible = true;
	kt_nobtn.visible = true;
	kt_yesbtn.visible = true;
	if (item.x == this.game.world.centerX && item.y == this.game.world.centerY) {
		arasi_clicked = true;
		arasi_zum.visible = false;
		kt_msgwrite.setText("嵐山駅に行きましょう！", true);
	} 
	else {
		arasi_zum.visible = false;
		kt_arasi.visible = true;
	}
}

function silverZoom(item) {
	episodeKey = 'kt_kk';
	kt_confmove.visible = true;
	kt_msgwrite.visible = true;
	kt_nobtn.visible = true;
	kt_yesbtn.visible = true;
	if (item.x == this.game.world.centerX && item.y == this.game.world.centerY) {
		silver_clicked =  true;
		silver_zum.visible = false;
		kt_msgwrite.setText("銀閣寺に行きましょう！", true);
	} 
	else {
		silver_zum.visible = false;
		kt_silver.visible = true;
	}
}

function goldZoom(item) {
	episodeKey = 'kt_gk';
	kt_confmove.visible = true;
	kt_msgwrite.visible = true;
	kt_nobtn.visible = true;
	kt_yesbtn.visible = true;
	if (item.x == this.game.world.centerX && item.y == this.game.world.centerY) {
		gold_clicked =  true;
		gold_zum.visible = false;
		kt_msgwrite.setText("金閣寺に行きましょう！", true);
	} 
	else {
		gold_zum.visible = false;
		kt_gold.visible = true;
	}
}

function husimiZoom(item) {
	episodeKey = 'kt_hm';
	kt_confmove.visible = true;
	kt_msgwrite.visible = true;
	kt_nobtn.visible = true;
	kt_yesbtn.visible = true;
	if (item.x == this.game.world.centerX && item.y == this.game.world.centerY) {
		husimi_clicked =  true;
		husimi_zum.visible = false;
		kt_msgwrite.setText("伏見稲荷駅に行きましょう！", true);
	} 
	else {
		husimi_zum.visible = false;
		kb_port.visible = true;
	}
}

function templeZoom(item) {
	episodeKey = 'kt_km';
	kt_confmove.visible = true;
	kt_msgwrite.visible = true;
	kt_nobtn.visible = true;
	kt_yesbtn.visible = true;
	if (item.x == this.game.world.centerX && item.y == this.game.world.centerY) {
		temple_clicked =  true;
		temple_zum.visible = false;
		kt_msgwrite.setText("清水寺に行きましょう！", true);
	} 
	else {
		temple_zum.visible = false;
		kb_roco.visible = true;
	}
}

/* no 버튼 눌렀을 때 */
function kt_cancel() {
	kt_confmove.visible = false;
	kt_msgwrite.visible = false;
	kt_yesbtn.visible = false;
	kt_nobtn.visible = false;
	arasi_btn.visible = true;
	silver_btn.visible = true;
	gold_btn.visible = true;
	husimi_btn.visible = true;
	temple_btn.visible = true;
	kt_stars.visible = true;
}

/* yes버튼 눌렀을 때 페이지 이동 함수 */
function kt_changePlace(){
	kt_bgm.pause();
	kt_bgm.destroy(true);
	stageName = "京都";
	if (arasi_clicked == true) {
		this.game.state.start("fieldModule");
	} 
	else if(silver_clicked == true) {
		this.game.state.start("fieldModule");
	}
	else if(gold_clicked == true){
		this.game.state.start("fieldModule");
	}
	else if(husimi_clicked == true){
		this.game.state.start("fieldModule");
	}
	else if(temple_clicked == true){
		this.game.state.start("fieldModule");
	}
	else{
		this.game.state.start("japanMap");
	}
}

function kt_goJapanMap(){
	kt_bgm.pause();
	kt_bgm.destroy(true);
	this.game.state.start("japanMap");
}

// 상점이동페이지
function kt_gotoStore() {
	kt_bgm.pause();
	kt_bgm.destroy(true);
	this.game.state.start("store");
}


/* --- end generated code --- */
// -- user code here --
