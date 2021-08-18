// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.1 (Phaser v2.6.2)
/**
 * tokyo.
 */
function tokyo() {

	Phaser.State.call(this);

}

/** @type Phaser.State */
var tokyo_proto = Object.create(Phaser.State.prototype);
tokyo.prototype = tokyo_proto;
tokyo.prototype.constructor = tokyo;

tokyo.prototype.init = function() {

	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';
	current_spot = "tokyo";
};

/** 사진 */
var tokyo_asaksa; 					// 아사쿠사 사진
var tokyo_disneyland; 				// 디지니랜드 사진
var tokyo_odaiba; 					// 오다이바 사진
var tokyo_rainbow; 					// 레인보우브릿지 사진
var tokyo_tokyotower; 				// 도쿄타워 사진

/** 좌표버튼 */
var asaksa_btn; 					// 아사쿠사 지표
var disneyland_btn; 				// 디지니랜드 지표
var odaiba_btn; 					// 오다이바 지표
var rainbow_btn; 					// 레인보우 지표
var tokyotower_btn; 				// 도쿄타워 지표

/** 확대 사진 */
var asaksa_zum; 					// 아사쿠사 확대
var disneyland_zum; 				// 디지니랜드 확대
var odaiba_zum; 					// 오다이바 확대
var rainbow_zum; 					// 레인보우브릿지 확대
var tokyotower_zum; 				// 토쿄타워 확대

/** 각각 관광지 이미지의 확대여부에 대한 변수 */
var asaksa_iszum = null;
var disneyland_iszum = null;
var odaiba_iszum = null;
var rainbow_iszum = null;
var tokyotower_iszum = null;

/** 기타 소재 */
var tk_toStore; 					// 상점이동버튼
var tokyo_confmove; 				// 페이지 이동시 묻는 창
var tokyo_yesbtn;
var tokyo_nobtn;
var tokyo_msgwrite;
var tk_bgm;

/** 별점 표현 */
var tokyo_stars; 					// 그룹별 - 별 개수는 최대 3개
var tokyo_samount; 					// 갯수
var tk_smax = 3;					// 최대 별 갯수

/** 지표 클릭 여부 확인 - 페이지 이동 Flag */
var asakusa_clicked = false;		// 아사쿠사  
var disney_clicked = false;			// 디즈니랜드
var odaiba_clicked = false;			// 오다이바
var rainbow_clicked = false;		// 레인보우브릿지
var tokyotower_clicked = false;		// 도쿄타워

tokyo.prototype.create = function() {

	var tokyoMap = this.add.sprite(0.0, -3.0, 'tokyoMap(color)tree');
	tokyoMap.scale.setTo(1.0054000065495068, 0.8662857125865903);
	
	// 상점이동 버튼
	tk_toStore = this.game.add.button(642.0, 436.0, 'btn_store', tk_btnmove, this, 0, 1, 0, 1);
	tk_toStore.inputEnabled = true;

	tk_exit = this.game.add.button(1.0, 1.0, 'store_exit',tk_goJapanMap, this, 0, 1, 0, 1);
	tk_exit.scale.setTo(0.4, 0.4);
	tk_exit.inputEnabled=true;
	tk_exit.input.useHandCursor=true;
	
	/** 기타 소재 설정 */
	// 메세지 창
	tokyo_confmove = this.add.sprite(189.0, 317.0, 'popup');
	tokyo_confmove.scale.setTo(1.5, 1.0);
	tokyo_confmove.alpha = 0.7;
	tokyo_confmove.visible = false;

	// 네 버튼
	tokyo_yesbtn = this.game.add.button(510.0, 385.0, 'btn_yes',tk_changePlace, this, 0, 1, 0, 1);
	tokyo_yesbtn.scale.setTo(0.4, 0.4);
	tokyo_yesbtn.visible = false;
	tokyo_yesbtn.inputEnabled = true;

	// 아니오 버튼
	tokyo_nobtn = this.game.add.button(570.0, 385.0, 'btn_nope', tk_cancel, this, 0, 1, 0, 1);
	tokyo_nobtn.scale.setTo(0.4, 0.4);
	tokyo_nobtn.visible = false;
	tokyo_nobtn.inputEnabled = true;
	
	// 메세지
	tokyo_msgwrite = this.add.text(210, 360, '', {
		font : "bold 20px Arial",
		fill : "#000000",
		align : "left"
	});

	// 별 그룹
	tokyo_stars = this.add.group();

	/** 각 관광지 지표에 별점 찍기 */ 
	// 별의 갯수는 3최대개 /  60점 미만이면 빈 별만 3개
	// 도쿄타워
	if (tk_tt_rs >= 60) {
		tokyo_samount = Math.round(tk_tt_rs - 60) / 10;
		if (tokyo_samount > 3 && tokyo_samount <= 4) {
			tokyo_samount = 3;
		} else if (tokyo_samount > 0 && tokyo_samount <= 3) {
			tokyo_samount = Math.round(tk_tt_rs - 60) / 10;
		} else {
			tokyo_samount = 0;
		}
		for (var i = 0; i < tokyo_samount; i++) {
			var starr = tokyo_stars.create(265 + (i * 30), 245, 'stars(36x36)',0);
			starr.scale.setTo(0.7, 0.7);
		}
		for (var i = 0; i < tk_smax - tokyo_samount; i++) {
			var starr = tokyo_stars.create(325 - (i * 30), 245, 'stars(36x36)',1);
			starr.scale.setTo(0.7, 0.7);
		}
	} else if (tk_tt_rs < 60) {
		for (var i = 0; i < 3; i++) {
			var starr = tokyo_stars.create(325 - (i * 30), 245, 'stars(36x36)',1);
			starr.scale.setTo(0.7, 0.7);
		}
	}

	// 오다이바
	if (tk_od_rs >= 60) {
		tokyo_samount = Math.round(tk_od_rs - 60) / 10;

		if (tokyo_samount > 3 && tokyo_samount <= 4) {
			tokyo_samount = 3;
		} else if (tokyo_samount > 0 && tokyo_samount <= 3) {
			tokyo_samount = Math.round(tk_od_rs - 60) / 10;
		} else {
			tokyo_samount = 0;
		}
		for (var i = 0; i < tokyo_samount; i++) {
			var starr = tokyo_stars.create(405 + (i * 30), 385, 'stars(36x36)',0);
			starr.scale.setTo(0.7, 0.7);
		}
		for (var i = 0; i < tk_smax - tokyo_samount; i++) {
			var starr = tokyo_stars.create(465 - (i * 30), 385, 'stars(36x36)',1);
			starr.scale.setTo(0.7, 0.7);
		}
	} else if (tk_od_rs < 60) {
		for (var i = 0; i < 3; i++) {
			var starr = tokyo_stars.create(465 - (i * 30), 385, 'stars(36x36)',1);
			starr.scale.setTo(0.7, 0.7);
		}
	}

	// 디지니랜드
	if (tk_td_rs >= 60) {
		tokyo_samount = Math.round(tk_td_rs - 60) / 10;
		if (tokyo_samount > 3 && tokyo_samount <= 4) {
			tokyo_samount = 3;
		} else if (tokyo_samount > 0 && tokyo_samount <= 3) {
			tokyo_samount = Math.round(tk_td_rs - 60) / 10;
		} else {
			tokyo_samount = 0;
		}
		for (var i = 0; i < tokyo_samount; i++) {
			var starr = tokyo_stars.create(560 + (i * 30), 210, 'stars(36x36)',0);
			starr.scale.setTo(0.7, 0.7);
		}
		for (var i = 0; i < tk_smax - tokyo_samount; i++) {
			var starr = tokyo_stars.create(620 - (i * 30), 210, 'stars(36x36)',1);
			starr.scale.setTo(0.7, 0.7);
		}
	} else if (tk_td_rs < 60) {
		for (var i = 0; i < 3; i++) {
			var starr = tokyo_stars.create(620 - (i * 30), 210, 'stars(36x36)',1);
			starr.scale.setTo(0.7, 0.7);
		}
	}

	// 아사쿠사
	if (tk_ak_rs >= 60) {
		tokyo_samount = Math.round(tk_ak_rs - 60) / 10;
		if (tokyo_samount > 3 && tokyo_samount <= 4) {
			tokyo_samount = 3;
		} else if (tokyo_samount > 0 && tokyo_samount <= 3) {
			tokyo_samount = Math.round(tk_ak_rs - 60) / 10;
		} else {
			tokyo_samount = 0;
		}
		for (var i = 0; i < tokyo_samount; i++) {
			var starr = tokyo_stars.create(590 + (i * 30), 100, 'stars(36x36)',	0);
			starr.scale.setTo(0.7, 0.7);
		}
		for (var i = 0; i < tk_smax - tokyo_samount; i++) {
			var starr = tokyo_stars.create(650 - (i * 30), 100, 'stars(36x36)',1);
			starr.scale.setTo(0.7, 0.7);
		}
	} else if (tk_ak_rs < 60) {
		for (var i = 0; i < 3; i++) {
			var starr = tokyo_stars.create(650 - (i * 30), 100, 'stars(36x36)',1);
			starr.scale.setTo(0.7, 0.7);
		}
	}

	// 레인보우
	if (tk_rb_rs >= 60) {
		tokyo_samount = Math.round(tk_rb_rs - 60) / 10;
		if (tokyo_samount > 3 && tokyo_samount <= 4) {
			tokyo_samount = 3;
		} else if (tokyo_samount > 0 && tokyo_samount <= 3) {
			tokyo_samount = Math.round(tk_rb_rs - 60) / 10;
		} else {
			tokyo_samount = 0;
		}
		for (var i = 0; i < tokyo_samount; i++) {
			var starr = tokyo_stars.create(240 + (i * 30), 420, 'stars(36x36)',0);
			starr.scale.setTo(0.7, 0.7);
		}
		for (var i = 0; i < tk_smax - tokyo_samount; i++) {
			var starr = tokyo_stars.create(300 - (i * 30), 420, 'stars(36x36)',1);
			starr.scale.setTo(0.7, 0.7);
		}
	} else if (tk_rb_rs < 60) {
		// 60점 밑이면 빈별세개찍히게
		for (var i = 0; i < 3; i++) {
			var starr = tokyo_stars.create(300 - (i * 30), 420, 'stars(36x36)',1);
			starr.scale.setTo(0.7, 0.7);
		}
	}

	/** 각 지표이미지 설정 */
	// 아사쿠사
	asaksa_btn = this.game.add.button(594.0, 125.0, 'tk_ak_click',thumbAsakusa, this, 2, 1, 0);
	asaksa_btn.scale.setTo(0.3643749177815376, 0.36999987634909814);
	asaksa_btn.input.useHandCursor = true;

	// 디즈니랜드
	disneyland_btn = this.game.add.button(560.0, 235.0, 'tk_td_click',thumbDisney, this, 2, 1, 0);
	disneyland_btn.scale.setTo(0.3643749177815376, 0.36999987634909814);
	disneyland_btn.input.useHandCursor = true;

	// 오다이바
	odaiba_btn = this.game.add.button(406.0, 410.0, 'tk_od_click',thumbOdaiba, this, 2, 1, 0);
	odaiba_btn.scale.setTo(0.3643749177815376, 0.36999987634909814);
	odaiba_btn.input.useHandCursor = true;

	// 레인보우브릿지
	rainbow_btn = this.game.add.button(243.0, 444.0, 'tk_rb_click',thumbOdaiba, this, 2, 1, 0);
	rainbow_btn.scale.setTo(0.3643749177815376, 0.36999987634909814);
	rainbow_btn.input.useHandCursor = true;

	// 도쿄타워
	tokyotower_btn = this.game.add.button(260.0, 268.0, 'tk_tt_click',thumbTokyotower, this, 2, 1, 0);
	tokyotower_btn.scale.setTo(0.3643749177815376, 0.36999987634909814);
	tokyotower_btn.input.useHandCursor = true;

	/** 각 관광지 확대 사진 설정 */
	// 아사쿠사
	tokyo_asaksa = this.add.sprite(566.0, 58.0, 'tk_ak_thumb');
	tokyo_asaksa.scale.setTo(0.1, 0.1);
	tokyo_asaksa.visible = false;

	// 디즈니랜드
	tokyo_disney = this.add.sprite(544.0, 211.0, 'tk_td_thumb');
	tokyo_disney.scale.setTo(0.1, 0.1);
	tokyo_disney.visible = false;

	// 오다이바
	tokyo_odaiba = this.add.sprite(377.0, 367.0, 'tk_od_thumb');
	tokyo_odaiba.scale.setTo(0.1, 0.1);
	tokyo_odaiba.visible = false;

	// 레인보우 브릿지
	tokyo_rainbow = this.add.sprite(214.0, 387.0, 'tk_rb_thumb');
	tokyo_rainbow.scale.setTo(0.1, 0.1);
	tokyo_rainbow.visible = false;

	// 도쿄타워
	tokyo_tokyotower = this.add.sprite(234.0, 245.0, 'tk_tt_thumb');
	tokyo_tokyotower.scale.setTo(0.1, 0.1);
	tokyo_tokyotower.visible = false;

	// bgm
	tk_bgm = this.add.audio('SelectArea');
	tk_bgm.play();
	tk_bgm.loopFull();

	/** 클릭시 사진 확대 및 팝업 좌표 설정 */
	//아사쿠사
	asaksa_zum = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'tk_ak_thumb');
	asaksa_zum.alpha = 0.8;
	asaksa_zum.anchor.set(0.5);
	asaksa_zum.inputEnabled = true;
	asaksa_zum.events.onInputDown.add(asakusaZoom, this);
	asaksa_zum.scale.set(0.5); // 확대사진 사이즈
	asaksa_zum.visible = false;

	// 디즈니랜드
	disneyland_zum = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'tk_td_thumb');
	disneyland_zum.alpha = 0.8;
	disneyland_zum.anchor.set(0.5);
	disneyland_zum.inputEnabled = true;
	disneyland_zum.events.onInputDown.add(disneyZoom, this);
	disneyland_zum.scale.set(0.5);// 확대사진 사이즈
	disneyland_zum.visible = false;

	// 오다이바
	odaiba_zum = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'tk_od_thumb');
	odaiba_zum.alpha = 0.8;
	odaiba_zum.anchor.set(0.5);
	odaiba_zum.inputEnabled = true;
	odaiba_zum.events.onInputDown.add(odaibaZoom, this);
	odaiba_zum.scale.set(0.5); // 확대사진 사이즈
	odaiba_zum.visible = false;

	// 레인보우 브릿지
	rainbow_zum = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'tk_rb_thumb');
	rainbow_zum.alpha = 0.8;
	rainbow_zum.anchor.set(0.5);
	rainbow_zum.inputEnabled = true;
	rainbow_zum.events.onInputDown.add(rainbowZoom, this);
	rainbow_zum.scale.set(0.5);// 확대사진 사이즈
	rainbow_zum.visible = false;

	// 도쿄타워
	tokyotower_zum = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'tk_tt_thumb');
	tokyotower_zum.alpha = 0.8;
	tokyotower_zum.anchor.set(0.5);
	tokyotower_zum.inputEnabled = true;
	tokyotower_zum.events.onInputDown.add(tokyotowerZoom, this);
	tokyotower_zum.scale.set(0.5);// 확대사진 사이즈
	tokyotower_zum.visible = false;
};

/* --- end generated code --- */
//-- user code here --

/** 해당 지표를 클릭하면 확대 사진을 보여주는 함수 */
function thumbAsakusa() {
	asaksa_zum.visible = true;
	tokyo_asaksa.visible = false;
	disneyland_btn.visible = false;
	rainbow_btn.visible = false;
	odaiba_btn.visible = false;
	tokyotower_btn.visible = false;
	tokyo_stars.visible = false;
	
	// 위에있는 popup 사이즈와 같게 해줘야한다.
	if ((asaksa_zum !== null && asaksa_zum.isRunning)|| asaksa_zum.scale.x === 0.5 && asaksa_zum.scale.y === 0.5) {
		return;
	}
	asaksa_iszum = this.game.add.asaksa_iszum(asaksa_zum.scale).to({x : 0.5,y : 0.5}, 1000, Phaser.Easing.Elastic.Out, true);
}

function thumbDisney() {
	disneyland_zum.visible = true;
	asaksa_btn.visible = false;
	odaiba_btn.visible = false;
	rainbow_btn.visible = false;
	tokyotower_btn.visible = false;
	tokyo_stars.visible = false;
	if ((disneyland_iszum !== null && disneyland_iszum.isRunning)|| disneyland_zum.scale.x === 0.5) {
		return;
	}
	disneyland_iszum = this.game.add.disneyland_iszum(disneyland_zum.scale).to({x : 1,y : 1}, 1000, Phaser.Easing.Elastic.Out, true);
}

function thumbOdaiba() {
	odaiba_zum.visible = true;
	tokyo_odaiba.visible = false;
	asaksa_btn.visible = false;
	disneyland_btn.visible = false;
	rainbow_btn.visible = false;
	tokyotower_btn.visible = false;
	tokyo_stars.visible = false;
	if ((odaiba_iszum !== null && odaiba_iszum.isRunning)|| odaiba_zum.scale.x === 0.5 && odaiba_zum.scale.y === 0.5) {
		return;
	}
	odaiba_iszum = this.game.add.odaiba_iszum(odaiba_zum.scale).to({x : 1,y : 1}, 1000, Phaser.Easing.Elastic.Out, true);
}

function thumbRainbow() {
	rainbow_zum.visible = true;
	tokyo_rainbow.visible = false;
	asaksa_btn.visible = false;
	disneyland_btn.visible = false;
	odaiba_btn.visible = false;
	tokyotower_btn.visible = false;
	tokyo_stars.visible = false;
	if ((rainbow_iszum !== null && rainbow_iszum.isRunning)|| rainbow_zum.scale.x === 0.5) {
		return;
	}
	rainbow_iszum = this.game.add.rainbow_iszum(rainbow_zum.scale).to({x : 1,y : 1}, 1000, Phaser.Easing.Elastic.Out, true);
}

function thumbTokyotower() {
	tokyotower_zum.visible = true;
	tokyo_tokyotower.visible = false;
	asaksa_btn.visible = false;
	disneyland_btn.visible = false;
	odaiba_btn.visible = false;
	rainbow_btn.visible = false;
	tokyo_stars.visible = false;
	if ((tokyotower_iszum !== null && tokyotower_iszum.isRunning)|| tokyotower_zum.scale.x === 0.5 || tokyotower_zum.scale.y === 0.5) {
		return;
	}
	tokyotower_iszum = this.game.add.tokyotower_iszum(tokyotower_zum.scale).to({x : 1,y : 1}, 1000, Phaser.Easing.Elastic.Out, true);
}

/** 확대사진 클릭시 메시지창 보여주는 함수 */
function asakusaZoom(item) {
	episodeKey = 'tk_ak';
	tokyo_confmove.visible = true;
	tokyo_msgwrite.visible = true;
	tokyo_yesbtn.visible = true;
	tokyo_nobtn.visible = true;
	tokyo_stars.visible = false;
	if (item.x == this.game.world.centerX && item.y == this.game.world.centerY) {
		asakusa_clicked = true;
		asaksa_zum.visible = false;
		asaksa_btn.visible = false;
		tokyo_msgwrite.setText("浅草に行きましょう！", true);
	} else {
		asaksa_zum.visible = false;
		tokyo_asaksa.visible = true;
	}
}

function disneyZoom(item) {
	episodeKey = 'tk_td';
	tokyo_confmove.visible = true;
	tokyo_msgwrite.visible = true;
	tokyo_yesbtn.visible = true;
	tokyo_nobtn.visible = true;
	tokyo_stars.visible = false;
	if (item.x == this.game.world.centerX && item.y == this.game.world.centerY) {
		disney_clicked = true;
		disneyland_zum.visible = false;
		disneyland_btn.visible = false;
		tokyo_msgwrite.setText("ディズニーランドに\n行きましょう！", true);
	} else {
		disneyland_zum.visible = false;
		tokyo_disneyland.visible = true;
	}
}

function odaibaZoom(item) {
	episodeKey = 'tk_od';
	tokyo_confmove.visible = true;
	tokyo_msgwrite.visible = true;
	tokyo_yesbtn.visible = true;
	tokyo_nobtn.visible = true;
	tokyo_stars.visible = false;
	if (item.x == this.game.world.centerX && item.y == this.game.world.centerY) {
		odaiba_clicked = true;
		odaiba_zum.visible = false;
		odaiba_btn.visible = false;
		tokyo_msgwrite.setText("お台場行にきましょう！", true);
	} else {
		odaiba_zum.visible = false;
		tokyo_odaiba.visible = true;
	}
}
function rainbowZoom(item) {
	episodeKey = 'tk_rb';
	tokyo_confmove.visible = true;
	tokyo_msgwrite.visible = true;
	tokyo_yesbtn.visible = true;
	tokyo_nobtn.visible = true;
	tokyo_stars.visible = false;
	if (item.x == this.game.world.centerX && item.y == this.game.world.centerY) {
		rainbow_clicked = true;
		rainbow_zum.visible = false;
		rainbow_btn.visible = false;
		tokyo_msgwrite.setText("レインボーブリッジに\n行きましょう！", true);
	} else {
		rainbow_zum.visible = false;
		tokyo_rainbow.visible = true;
	}
}
function tokyotowerZoom(item) {
	episodeKey = 'tk_tt';
	tokyo_confmove.visible = true;
	tokyo_msgwrite.visible = true;
	tokyo_yesbtn.visible = true;
	tokyo_nobtn.visible = true;
	tokyo_stars.visible = false;
	if (item.x == this.game.world.centerX && item.y == this.game.world.centerY) {
		tokyotower_clicked = true;
		tokyotower_zum.visible = false;
		tokyotower_btn.visible = false;
		tokyo_msgwrite.setText("東京タワーに行きましょう！", true);
	} else {
		tokyotower_zum.visible = false;
		tokyo_tokyotower.visible = true;
	}
}

/* no 버튼 눌렀을 때 */
function tk_cancel() {
	tokyo_confmove.visible = false;
	tokyo_msgwrite.visible = false;
	tokyo_yesbtn.visible = false;
	tokyo_nobtn.visible = false;
	asaksa_btn.visible = true;
	disneyland_btn.visible = true;
	odaiba_btn.visible = true;
	rainbow_btn.visible = true;
	tokyotower_btn.visible = true;
	tokyo_stars.visible = true;
}

/* yes버튼 눌렀을 때 페이지 이동 함수 */
function tk_changePlace(){
	tk_bgm.pause();
	tk_bgm.destroy(true);
	stageName = "東京";
	if (asakusa_clicked == true) {
		this.game.state.start("tk_tt");
	} 
	else if(odaiba_clicked == true) {
		this.game.state.start("tk_tt");
	}
	else if(disney_clicked == true){
		this.game.state.start("tk_tt");
	}
	else if(rainbow_clicked == true){
		this.game.state.start("tk_tt");
	}
	else if(tokyotower_clicked == true){
		tk_tt_rs = 86; // 나중에 지울 것
		this.game.state.start("tk_tt");
	}
	else{
		this.game.state.start("japanMap");
	}
}

function tk_goJapanMap(){
	tk_bgm.pause();
	tk_bgm.destroy(true);
	this.game.state.start("japanMap");
}

function tk_btnmove() {
	tk_bgm.pause();
	tk_bgm.destroy(true);
	this.game.state.start("store");
}

