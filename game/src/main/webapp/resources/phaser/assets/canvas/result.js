
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.1 (Phaser v2.6.2)

/**
 * result.
 */
function result() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var result_proto = Object.create(Phaser.State.prototype);
result.prototype = result_proto;
result.prototype.constructor = result;

var finalResult;			// 점수 불러올 변수
var result_userCoin = 0;
result.prototype.init = function () {
	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#000000';
	
	finalResult = bossResult;
	
	var xhrC = new XMLHttpRequest(); // 유저 코인
	xhrC.onload = function(e) {
		if (this.readyState === 4) {
			result_userCoin = JSON.parse(e.target.responseText);
		}// if
	}// onload
	xhrC.open("post", "/"+ctx+"/getUserCoin", true); // xmlHttp로 접근할컨트롤러
	xhrC.send();
};

/* 전역 변수 설정 */
var result_background;
var rs_nextButton;
var rs_next;
var pronunciationTest;
var resultMessage;
var rs_bgm;
var rs_bgm2;
var credit;
var rs_messageWindow;
var rs_boss;
var lastMessage;
var rs_stars;				// 별 그림
var rs_drawS;				// 별 그룹
var rs_starMax = 3;			// 별 최대 갯수
var rs_moneyBox;			// 유저 보유액 표시 상자
var rs_userMoney;			// 유저 보유액
result.prototype.create = function () {
	
	//배경그림 설정  - 확대지도에서 설정된 episodeKey에 따라 변경
	result_background = this.add.sprite(-125.0, 2.0, episodeKey+"_bg");
	result_background.scale.setTo(1.0, 1.0);
	
	/* 스탠딩 아바타 */
	credit = this.add.sprite(130.0, 42.0, 'credit');
	credit.scale.setTo(1.440000156528595, 1.2040000000287063);
	credit.visible = false;
	
	// DB에서 보스 정보 받아와서 아래 if식을 바꿀 것 - 바로 보스 이미지 받아오는 것으로
	if(episodeKey == "sp_sb"){
		rs_boss = this.add.sprite(213.0, 104.0, 'wantanstand');
	}else if(episodeKey == "kb_hl"){
		rs_boss = this.add.sprite(213.0, 104.0, 'hidostand');
	}else if(episodeKey == "kt_kk"){
		rs_boss = this.add.sprite(213.0, 104.0, 'eagolstand');
	}else if(episodeKey == "ok_pp"){
		rs_boss = this.add.sprite(213.0, 104.0, 'ououstand');
	}else if(episodeKey == "tk_tt"){
		rs_boss = this.add.sprite(213.0, 104.0, 'lasbos');
	}else{
		rs_boss = this.add.sprite(213.0, 104.0, 'jakostand');
	}
	rs_boss.scale.setTo(0.3795304265277349, 0.373138366805366);
	rs_boss.visible = false;
	
	/* 메세지 창 */
	re_textbox = this.add.sprite(75.0, 342.0, 'textbox',0);
	re_textbox.scale.setTo(2.3399999851726405, 1.7);
	re_textbox_change = re_textbox.animations.add('change', [0, 1, 2], 6, true);
	re_textbox_change.play();
	re_textbox.inputEnabled = true;
	re_textbox.visible = false;
	
	rs_messageWindow = this.add.sprite(200.0, 150.0, 'popup');
	rs_messageWindow.scale.setTo(1.199200117593948, 2.1);
	rs_messageWindow.alpha = 0.7;
	
	rs_moneyBox = this.add.sprite(600.0, 5.0, 'moneyText');
	rs_moneyBox.scale.setTo(0.3, 0.25);
	rs_moneyBox.alpha=0.9;	
	
	rs_userMoney = this.game.add.text(655, 15, "保有金\t"+userCoin,
			{ font: "20px Arial", fill: "#000000", align: "left" });
	rs_userMoney.fontWeight = 700;
	
	/* 다음 버튼 변수 설정 */
	rs_nextButton = this.game.add.button(470, 410,'btn_next', seeResult, this, 0, 1, 0, 1);
	rs_nextButton.scale.setTo(0.4, 0.4);					// 버튼 그림 크기 설정
	rs_nextButton.inputEnabled = true; 						// 버튼 - 클릭 이벤트 인식 활성화
	
	rs_next = this.game.add.button(660.0, 450.0,'btn_next', toNext, this, 0, 1, 0, 1);
	rs_next.scale.setTo(0.6, 0.6);							// 버튼 그림 크기 설정
	rs_next.inputEnabled = true; 							// 버튼 - 클릭 이벤트 인식 활성화
	rs_next.visible = false;
	
	/* 메세지 변수 설정 */
	finalResult = eval(episodeKey+"_rs");					// eval을 이용해서 String 값을 변수로 인식
	
	pronunciationTest = this.add.text(225.0, 210.0, "発音と文法の点数", {"font":"bold 40px Arial"});
	resultMessage = this.add.text(300.0, 260.0, finalResult+"\t/100", {"font":"bold 40px Arial"});
	
	lastMessage = this.add.text(150.0, 400.0, "", {"font":"normal 30px Arial"});
	lastMessage.visible = false;
	
	/* 별찍기 함수 */
	rs_drawS = this.add.group();
	var rs_check = Math.round(finalResult - 60) / 10;
	if(rs_check > 3 && rs_check <= 4){
		rs_check = 3;
	}else if(rs_check > 0 && rs_check <= 3){
		rs_check = Math.round(finalResult - 60) / 10;
	}else{
		rs_check = 0;
	}    
	for(var i = 0; i < rs_check;i++){
		rs_stars = rs_drawS.create(290+(i*60), 350, 'stars(180x180)',1);
		rs_stars.scale.setTo(0.3, 0.3);
	}
	for (var i = 0; i < rs_starMax - rs_check; i++) {
		rs_stars = rs_drawS.create(410-(i*60), 350, 'stars(180x180)',0);
		rs_stars.scale.setTo(0.3, 0.3);
	}
	
	/* 재생음악 변수 설정 */
	rs_bgm = this.add.audio('Scoreing'); 					// 재생음악 지정
    rs_bgm.play(); 											// 배경음악 재생
    rs_bgm.loopFull(); 										// 배경음악 무한 루프
    rs_bgm2 = this.add.audio('SE_CHACHING'); 				// 재생음악 지정
};

/* --- end generated code --- */
// -- user code here --

/* 결과 확인 함수 */
function seeResult(){
	/* 성공은 1 실패는 0 */
	pronunciationTest.visible = false;
	resultMessage.visible = false;
	rs_messageWindow.visible = false;
	rs_nextButton.visible = false;
	lastMessage.visible = true;
	rs_next.visible = true;
	rs_drawS.visible = false;
	rs_bgm.pause();
	if(finalResult < 60){
		credit.visible = false;
		rs_boss.visible = true;
		re_textbox.visible = true;
		lastMessage.setText("お前の負けだ！キャーキャー！！！");
	}else{
		result_background.alpha = 0.6;
		credit.visible = true;
		rs_boss.visible = false;
		rs_bgm2.play();
		lastMessage.reset(210.0, 360.0);
		lastMessage.fontStyle = "bold";
		lastMessage.setText(stageName+"を救ったヒーローに\n市民からの賞金が届きました!");
		
		// Stage에서 할당된 코인 받아서 해당 코인 + userCoin 값을 업데이트
		result_userCoin += bossList[episodeKey].maxCoin;	//금액추가
		
		var xhrCoin = new XMLHttpRequest(); // 코인 업데이트
		xhrCoin.onload = function(e) {
			if(this.readyState === 4) {
				rs_userMoney = JSON.parse(e.target.responseText);
			}// if
		}// onload
		xhrCoin.open("post", "/"+ctx+"/updateTotalCoin", true); // xmlHttp로 접근할컨트롤러
		xhrCoin.send(result_userCoin);
	}
}

/* 패이지 이동 함수 */
function toNext(){
	rs_bgm2.destroy(true);
	rs_bgm.destroy(true);
	
	if(finalResult < 60){
		if(episodeKey.substring(0,2) == 'ok'){
			this.game.state.start('ok_pp');
		}else if(episodeKey.substring(0,2) == 'tk'){
			this.game.state.start('tk_tt');
		}else{
			this.game.state.start('fieldModule'); 
		}
	}else if(finalResult >= 60 && jm_mapflag != 4){
		this.game.state.start("japanMap");
	}else if(finalResult >= 60 && tk_tt_plcheck == true){
		this.game.state.start("epilogue");
	}else{
	}
}

