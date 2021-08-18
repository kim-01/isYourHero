
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.1 (Phaser v2.6.2)


/**
 * sapporo.
 */
function sapporo() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var sapporo_proto = Object.create(Phaser.State.prototype);
sapporo.prototype = sapporo_proto;
sapporo.prototype.constructor = sapporo;

sapporo.prototype.init = function () {
	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#82dadc';
	current_spot = "sapporo";	
};

/** 사진 */
var sp_bear; 					// 맥주공장 사진
var sp_odori; 					// 오도리 사진
var sp_city; 					// 시청사 사진
var sp_tvtower; 				// 티비타워 사진
var sp_clock; 					// 시계탑 사진

/** 좌표버튼 */
var bear_btn; 					// 맥주공장 좌표버튼
var odori_btn;					// 오도리 좌표버튼
var city_btn; 					// 시청사 좌표버튼
var tvtower_btn;				// 티비타워 좌표버튼
var clock_btn; 					// 시계탑 좌표버튼

/** 확대 사진 */
var bear_zum; 					// 맥주공장 확대
var odori_zum;					// 오도리 확대
var city_zum; 					// 시청사 확대
var tvtower_zum; 				// 티비타워 확대
var clock_zum;					// 시계탑 확대

/** 각각 관광지 이미지의 확대여부에 대한 변수 */
var bear_iszum = null;	
var odori_iszum = null;
var city_iszum = null;
var tvtower_iszum = null;
var clock_iszum = null;

/** 기타 소재 */
var sp_toStore; 					// 상점이동버튼
var sp_confmove; 					// 페이지 이동시 묻는 창
var sp_yesbtn;
var sp_nobtn;
var sp_msgwrite;
var sp_bgm;							// 배경음악

/** 별점 표현 */
var sp_stars;						// 그룹별
var sp_samount;						// 남은 별 갯수
var sp_smax = 3;					// 최대 별 갯수

/** 지표 클릭 여부 확인 - 페이지 이동 Flag */
var bear_clicked = false;		// 맥주공장
var odori_clicked = false;		// 오도리
var city_clicked = false;		// 시청사
var tvtower_clicked = false;	// 티비타워
var clock_clicked = false;		// 시계탑


sapporo.prototype.preload = function () {
	
	this.load.pack('images', 'assets/pack.json');
	this.load.pack('audio', 'assets/pack.json');
	
};

sapporo.prototype.create = function () {
	var _hokkaidoMap = this.add.sprite(0, 0, 'hokkaidoMap');
	_hokkaidoMap.scale.setTo(1.6099999994069742, 1.4404761730792635);
	
	sp_toStore=this.add.button(643.0, 446.0, 'btn_store',sp_gotoStore, this, 0, 1, 0, 1);
	sp_toStore.scale.setTo(0.8,0.8);
	sp_toStore.inputEnabled=true;
	
	clock_btn = this.add.button(139.0, 327.0, 'sp_ct_click', thumbClock, this, 2, 1, 0);
	clock_btn.scale.setTo(0.35, 0.35);
	clock_btn.input.useHandCursor = true;
	
	odori_btn = this.add.button(350.0, 250.0, 'sp_op_click', thumbOdori, this, 2, 1, 0);
	odori_btn.scale.setTo(0.35, 0.35);
	odori_btn.input.useHandCursor = true;
	
	tvtower_btn = this.add.button(435.0,370, 'sp_st_click', thumbTvtower, this, 2, 1, 0);
	tvtower_btn.scale.setTo(0.35, 0.35);
	tvtower_btn.input.useHandCursor = true;
	
	bear_btn = this.add.button(380.0, 100.0, 'sp_sb_click' ,thumbBear, this, 2, 1, 0);
	bear_btn.scale.setTo(0.35, 0.35);
	bear_btn.input.useHandCursor = true;
	
	city_btn = this.add.button(283.0, 381.0, 'sp_ch_click' ,thumbCity, this, 2, 1, 0);
	city_btn.scale.setTo(0.35, 0.35);
	city_btn.input.useHandCursor = true;
	
	
	//확대사진
	sp_clock = this.game.add.sprite(107.0, 243.0, 'sp_ct_thumb');
	sp_clock.scale.setTo(0.1, 0.1);
	sp_clock.visible = false;
	
	sp_odori = this.game.add.sprite(377.0, 204.0, 'sp_op_thumb');
	sp_odori.scale.setTo(0.1, 0.1);
	sp_odori.visible=false;
	
	sp_tvtower = this.game.add.sprite(410.0, 356.0, 'sp_st_thumb');
	sp_tvtower.scale.setTo(0.1, 0.1);
	sp_tvtower.visible=false;
	
	sp_bear= this.game.add.sprite(354.0, 62.0, 'sp_sb_thumb');
	sp_bear.scale.setTo(0.1, 0.1);
	sp_bear.visible=false;
	
	sp_city = this.game.add.sprite(260.0, 303.0, 'sp_ch_thumb');
	sp_city.scale.setTo(0.1, 0.1);
	sp_city.visible=false;
	
	
	// 클릭시 사진확대 및 팝업 좌표 설정
	
	// 맥주
	bear_zum = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'sp_sb_thumb');
	bear_zum.alpha = 0.8;
	bear_zum.anchor.set(0.5);
	bear_zum.inputEnabled = true;
	bear_zum.events.onInputDown.add(bearZoom, this);
	bear_zum.scale.set(0.5);  //확대사진 사이즈
	bear_zum.visible = false;

	// 오도리
	odori_zum = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'sp_op_thumb');
	odori_zum.alpha = 0.8;
	odori_zum.anchor.set(0.5);
	odori_zum.inputEnabled = true;
	odori_zum.events.onInputDown.add(odoriZoom, this);
	odori_zum.scale.set(0.5); // 확대사진 사이즈
	odori_zum.visible = false;

	// 시청사
	city_zum = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'sp_ch_thumb');
	city_zum.alpha = 0.8;
	city_zum.anchor.set(0.5);
	city_zum.inputEnabled = true;
	city_zum.events.onInputDown.add(cityZoom, this);
	city_zum.scale.set(0.5); //확대사진 사이즈
	city_zum.visible = false;

	// 티비타워
	tvtower_zum = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'sp_st_thumb');
	tvtower_zum.alpha = 0.8;
	tvtower_zum.anchor.set(0.5);
	tvtower_zum.inputEnabled = true;
	tvtower_zum.events.onInputDown.add(tvtowerZoom, this);
	tvtower_zum.scale.set(0.5); //확대사진 사이즈
	tvtower_zum.visible = false;

	// 시게탑
	clock_zum = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'sp_ct_thumb');
	clock_zum.alpha = 0.8;
	clock_zum.anchor.set(0.5);
	clock_zum.inputEnabled = true;
	clock_zum.events.onInputDown.add(clockZoom, this);
	clock_zum.scale.set(0.5); //확대사진 사이즈
	clock_zum.visible = false;
	
	
	//메시지창
	sp_confmove = this.add.sprite(173.0, 287.0, 'popup');
	sp_confmove.scale.setTo(1.5, 1.0);
	sp_confmove.alpha = 0.7;
	sp_confmove.visible = false;
	
	//아니오 버튼
	sp_nobtn = this.game.add.button(550.0, 360.0, 'btn_nope', sp_cancel,this,0,1,0,1);
	sp_nobtn.scale.setTo(0.4, 0.4);
	sp_nobtn.inputEnabled = true;
	sp_nobtn.visible = false;
	
	
	//네 바튼
	sp_yesbtn = this.game.add.button(490.0, 360.0, 'btn_yes',  sp_changePlace,this,0,1,0,1);
	sp_yesbtn.scale.setTo(0.4, 0.4);
	sp_yesbtn.inputEnabled = true;
	sp_yesbtn.visible = false;

	// bgm
	sp_bgm = this.add.audio('SelectArea');
	sp_bgm.play();
	sp_bgm.loopFull();
	
	sp_exit = this.game.add.button(7.0, 2.0, 'btn_exit',sp_goJapanMap, this, 0, 1, 0, 1);
	sp_exit.scale.setTo(0.4, 0.4);
	sp_exit.inputEnabled=true;
	sp_exit.input.useHandCursor=true;
	
	
	//메시지
	sp_msgwrite = this.add.text(190,320,'', {font : "bold 25px Arial", fill : "#000000", align : "left"});
	
	//별그룹
	sp_stars=this.add.group();
	

	
	/** 각 관광지 지표에 별점 찍기 */ 
	// 별의 갯수는 3최대개 /  60점 미만이면 빈 별만 3개
	//맥주공장	
	if (sp_sb_rs >= 60) {
		sp_samount = Math.round(sp_sb_rs - 60) / 10;
		if (sp_samount > 3 && sp_samount <= 4) {
			sp_samount = 3;
		} else if (sp_samount > 0 && sp_samount <= 3) {
			sp_samount = Math.round(sp_sb_rs - 60) / 10;
		} else {
			sp_samount = 0;
		}
		for (var i = 0; i < sp_samount; i++) {
			var starr = sp_stars.create(380.0 + (i * 30), 70, 'stars(36x36)', 0);
			starr.scale.setTo(0.7, 0.7);
		}
		for (var i = 0; i < sp_smax - sp_samount; i++) {
			var starr = sp_stars.create(440 - (i * 30), 70, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	} else if (sp_sb_rs < 60) {
		// 60점 밑이면 빈별세개찍히게
		for (var i = 0; i < 3; i++) {
			var starr = sp_stars.create(440 - (i * 30), 70, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	}
	
	// 시게탑 점수
	if (sp_ct_rs >= 60) {
		sp_samount = Math.round(sp_ct_rs - 60) / 10;
		if (sp_samount > 3 && sp_samount <= 4) {
			sp_samount = 3;
		} else if (sp_samount > 0 && sp_samount <= 3) {
			sp_samount = Math.round(sp_ct_rs - 60) / 10;
		} else {
			sp_samount = 0;
		}
		for (var i = 0; i < sp_samount; i++) {
			var starr = sp_stars.create(140.0 + (i * 30), 300, 'stars(36x36)', 0);
			starr.scale.setTo(0.7, 0.7);
		}
		for (var i = 0; i < ok_smax - sp_samount; i++) {
			var starr = sp_stars.create(200 - (i * 30), 300, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	} else if (sp_ct_rs < 60) {
		for (var i = 0; i < 3; i++) {
			var starr = sp_stars.create(200 - (i * 30), 300, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	}
	
  	// 티비타워 점수
	if (sp_st_rs >= 60) {
		sp_samount = Math.round(sp_st_rs - 60) / 10;
		if (sp_samount > 3 && sp_samount <= 4) {
			sp_samount = 3;
		} else if (sp_samount > 0 && sp_samount <= 3) {
			sp_samount = Math.round(sp_st_rs - 60) / 10;
		} else {
			sp_samount = 0;
		}
		for (var i = 0; i < sp_samount; i++) {
			var starr = sp_stars.create(435 + (i * 30), 345, 'stars(36x36)', 0);
			starr.scale.setTo(0.7, 0.7);
		}
		for (var i = 0; i < ok_smax - sp_samount; i++) {
			var starr = sp_stars.create(495 - (i * 30), 345, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	} else if (sp_st_rs < 60) {
		for (var i = 0; i < 3; i++) {
			var starr = sp_stars.create(495 - (i * 30), 345, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	}
	
	// 시청사 점수
	if (sp_ch_rs >= 60) {
		sp_samount = Math.round(sp_ch_rs - 60) / 10;
		if (sp_samount > 3 && sp_samount <= 4) {
			sp_samount = 3;
		} else if (sp_samount > 0 && sp_samount <= 3) {
			sp_samount = Math.round(sp_ch_rs - 60) / 10;
		} else {
			sp_samount = 0;
		}
		for (var i = 0; i < sp_samount; i++) {
			var starr = sp_stars.create(295 + (i * 30), 350, 'stars(36x36)', 0);
			starr.scale.setTo(0.7, 0.7);
		}
		for (var i = 0; i < ok_smax - sp_samount; i++) {
			var starr = sp_stars.create(345 - (i * 30), 350, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	} else if (sp_ch_rs < 60) {
		for (var i = 0; i < 3; i++) {
			var starr = sp_stars.create(345 - (i * 30), 350, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	}
	
	// 오도리 점수
	if (sp_op_rs >= 60) {
		sp_samount = Math.round(sp_op_rs - 60) / 10;
		if (sp_samount > 3 && sp_samount <= 4) {
			sp_samount = 3;
		} else if (sp_samount > 0 && sp_samount <= 3) {
			sp_samount = Math.round(sp_op_rs - 60) / 10;
		} else {
			sp_samount = 0;
		}
		for (var i = 0; i < sp_samount; i++) {
			var starr = sp_stars.create(350 + (i * 30), 220, 'stars(36x36)', 0);
			starr.scale.setTo(0.7, 0.7);
		}
		for (var i = 0; i < ok_smax - sp_samount; i++) {
			var starr = sp_stars.create(410 - (i * 30), 220, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	} else if (sp_op_rs < 60) {
		for (var i = 0; i < 3; i++) {
			var starr = sp_stars.create(410 - (i * 30), 220, 'stars(36x36)', 1);
			starr.scale.setTo(0.7, 0.7);
		}
	}
};

/** 해당 지표를 클릭하면 확대 사진을 보여주는 함수 */
function thumbBear() {
	bear_zum.visible = true;
	sp_bear.visible = false;
	odori_btn.visible = false;
	city_btn.visible = false;
	tvtower_btn.visible = false;
	clock_btn.visible = false;
	sp_stars.visible = false;

	// 위에있는 popup 사이즈와 같게 해줘야한다.
	if ((bear_iszum !== null && bear_iszum.isRunning) || bear_zum.scale.x === 0.5 && bear_zum.scale.y === 0.5) {
		return;
	}
	bear_iszum = this.game.add.bear_iszum(bear_zum.scale).to({x : 0.5, y : 0.8}, 1000, Phaser.Easing.Elastic.Out, true);
}

function thumbOdori() {
	odori_zum.visible = true;
	sp_odori.visible = false;
	bear_btn.visible = false;
	city_btn.visible = false;
	tvtower_btn.visible = false;
	clock_btn.visible = false;
	sp_stars.visible = false;
	
	if ((odori_iszum !== null && odori_iszum.isRunning) || odori_zum.scale.x === 0.5) {
		return;
	}
	odori_iszum = this.game.add.odori_iszum(odori_zum.scale).to({x : 1, y : 1}, 1000, Phaser.Easing.Elastic.Out, true);
}

function thumbCity() {
	city_zum.visible = true;
	sp_city.visible = false;
	bear_btn.visible = false;
	odori_btn.visible = false;
	tvtower_btn.visible = false;
	clock_btn.visible = false;
	sp_stars.visible = false;
	
	if ((city_iszum !== null && city_iszum.isRunning) || city_zum.scale.x === 0.5 && city_zum.scale.y === 0.5) {
		return;
	}
	city_iszum = this.game.add.city_iszum(city_zum.scale).to({x : 1,	y : 1}, 1000, Phaser.Easing.Elastic.Out, true);
}

function thumbTvtower() {
	tvtower_zum.visible = true;
	sp_tvtower.visible = false;
	bear_btn.visible = false;
	odori_btn.visible = false;
	city_btn.visible = false;
	clock_btn.visible = false;
	sp_stars.visible = false;
	
	if ((tvtower_iszum !== null && tvtower_iszum.isRunning) || tvtower_zum.scale.x === 0.5) {
		return;
	}
	tvtower_iszum = this.game.add.tvtower_iszum(tvtower_zum.scale).to({x : 1, y : 1}, 1000, Phaser.Easing.Elastic.Out, true);
}

function thumbClock() {
	clock_zum.visible = true;
	bear_btn.visible = false;
	odori_btn.visible = false;
	city_btn.visible = false;
	tvtower_btn.visible = false;
	sp_stars.visible = false;
	
	if ((clock_iszum !== null && clock_iszum.isRunning) || clock_zum.scale.x === 0.5 || clock_zum.scale.y === 0.5) {
		return;
	}
	clock_iszum = this.game.add.clock_iszum(clock_zum.scale).to({x : 1, y : 1}, 1000, Phaser.Easing.Elastic.Out, true);
}


/** 확대사진 클릭시 메시지창 보여주는 함수 */
function bearZoom(item) {
	episodeKey = 'sp_sb';
	sp_confmove.visible = true;
	sp_msgwrite.visible = true;
	sp_nobtn.visible = true;
	sp_yesbtn.visible = true;
	if (item.x == this.game.world.centerX && item.y == this.game.world.centerY) {
		bear_clicked = true;
		bear_zum.visible = false;
		sp_msgwrite.setText("サッポロビール博物館に\n行きましょう！", true);
	} 
	else {
		bear_zum.visible = false;
		sp_bear.visible = true;
	}
}

function odoriZoom(item) {
	episodeKey = 'sp_op';
	sp_confmove.visible = true;
	sp_msgwrite.visible = true;
	sp_nobtn.visible = true;
	sp_yesbtn.visible = true;
	if (item.x == this.game.world.centerX && item.y == this.game.world.centerY) {
		odori_clicked =  true;
		odori_zum.visible = false;
		sp_msgwrite.setText("大通公園に行きましょう！", true);
	} 
	else {
		odori_zum.visible = false;
		sp_odori.visible = true;
	}
}

function cityZoom(item) {
	episodeKey = 'sp_ct';
	sp_confmove.visible = true;
	sp_msgwrite.visible = true;
	sp_nobtn.visible = true;
	sp_yesbtn.visible = true;
	if (item.x == this.game.world.centerX && item.y == this.game.world.centerY) {
		city_clicked =  true;
		city_zum.visible = false;
		sp_msgwrite.setText("札幌市役所に行きましょう！", true);
	} 
	else {
		city_zum.visible = false;
		sp_city.visible = true;
	}
}

function tvtowerZoom(item) {
	episodeKey = 'sp_st';
	sp_confmove.visible = true;
	sp_msgwrite.visible = true;
	sp_nobtn.visible = true;
	sp_yesbtn.visible = true;
	if (item.x == this.game.world.centerX && item.y == this.game.world.centerY) {
		tvtower_clicked =  true;
		tvtower_zum.visible = false;
		sp_msgwrite.setText("さっぽろテレビ塔に行きましょう！", true);
	} 
	else {
		tvtower_zum.visible = false;
		sp_tvtower.visible = true;
	}
}

function clockZoom(item) {
	episodeKey = 'sp_ch';
	sp_confmove.visible = true;
	sp_msgwrite.visible = true;
	sp_nobtn.visible = true;
	sp_yesbtn.visible = true;
	if (item.x == this.game.world.centerX && item.y == this.game.world.centerY) {
		clock_clicked =  true;
		clock_zum.visible = false;
		sp_msgwrite.setText("札幌市時計台に行きましょう！", true);
	} 
	else {
		clock_zum.visible = false;
		sp_clock.visible = true;
	}
}

/* no 버튼 눌렀을 때 */
function sp_cancel() {
	sp_confmove.visible = false;
	sp_msgwrite.visible = false;
	sp_yesbtn.visible = false;
	sp_nobtn.visible = false;
	bear_btn.visible = true;
	odori_btn.visible = true;
	city_btn.visible = true;
	tvtower_btn.visible = true;
	clock_btn.visible = true;
	sp_stars.visible = true;
}

/* yes버튼 눌렀을 때 페이지 이동 함수 */
function sp_changePlace(){
	sp_bgm.pause();
	sp_bgm.destroy(true);
	stageName = "札幌";
	if (odori_clicked == true) {
		this.game.state.start("fieldModule");
	} 
	else if(city_clicked == true) {
		this.game.state.start("fieldModule");
	}
	else if(tvtower_clicked == true){
		this.game.state.start("fieldModule");
	}
	else if(clock_clicked == true){
		this.game.state.start("fieldModule");
	}
	else if(bear_clicked == true){
		this.game.state.start("fieldModule");
	}
	else{
		this.game.state.start("japanMap");
	}
}

function sp_goJapanMap(){
	sp_bgm.pause();
	sp_bgm.destroy(true);
	this.game.state.start("japanMap");
}

// 상점이동페이지
function sp_gotoStore() {
	sp_bgm.pause();
	sp_bgm.destroy(true);
	this.game.state.start("store");
}

