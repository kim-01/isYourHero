// -- user code here --
/* --- start generated code --- */
// Generated by  1.5.1 (Phaser v2.6.2)

/**
 * boss
 */
function boss() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var boss_proto = Object.create(Phaser.State.prototype);
boss.prototype = boss_proto;
boss.prototype.constructor = boss;

var ok_haveitem = 0; // 유저 소유 아이템
var usedItem;

boss.prototype.init = function () {
	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';
	
	haveItemArray = new Array();
	for(var i in itemList){
		var compareName = "シールド";
		if(itemList[i].itemName === compareName && itemList[i].itemCount > 0){
			ok_haveitem = itemList[i].itemCount;
			usedItem = itemList[i].itemUnicode;
		}
	}//for
};

var ok_StartText;
var ok_timeText;
var ok_failText;
var ok_startGreybox;
var ok_startGreybox_change;
var ok_failGreybox;
var ok_failGreybox_change;
var ok_goGreybox;
var ok_goGreybox_change;
var ok_suGreybox;
var ok_suGreybox_change;
var ok_timebar;				//이미지 설정
var ok_timeBar;				//메이메이션 작업
var ok_btn_save;
var ok_btn_stop;
var ok_itemMsg;
var ok_button_yes;
var ok_button_no;
var ok_textItem;
var ok_textgameover;
var bossTypeA;				//typeA 대사 추후 전역변수 추가예정
var bossTypeB;				//typeB 대사 추후 전역변수 추가예정
var bossRecordingA;			//A파트 음성 추후 전역변수 추가예정
var bossRecordingB;			//B파트 음성 추후 전역변수 추가예정
var bossRandomStart_1;		//처음 에피소드 인덱스 추후 전역변수 추가예정
var bossRandomStart_2;		//두번째 에피소드 인덱스 추후 전역변수 추가예정
var bossIsRecording;		//보스 레코딩 여부 추후 전역변수 추가예정
var isSayDone; 				//녹음정지를 하였을 때 추후 전역변수 추가예정
var bossScriptCount = 0; 	// 차래대로 음성 및 전수저장등을 위한 인덱스
var bossScoreList;			//성공한 유저의 점수를 저장하는 리스트 
var bossFailCount; 			//3이 되었을 때 fail 추후 전역변수 추가예정
var ok_score; 				//점수를 받아오는 변수, 임의로 항상 성공하도록 해둠 삭제

var heart;					//heart 추후 전역변수 추가예정
var heartMax = 3;			//최대 목숨 추후 전역변수 추가예정
var heartStartWidth;		// 하트 처음시작위치 추후 전역변수 추가예정
var heartBandWidth = 40;	//하트간 간격 추후 전역변수 추가예정

boss.prototype.create = function () {
	
	//▼init
	bossRecordingA = new Array();
	bossRecordingB = new Array();
	bossScoreList = new Array();
	bossFailCount = 0;
	bossResult= 0;
	bossIsRecording = false;
	isSayDone = false;
	heartStartWidth = 720;
	heart = new Array();
	//init end
	
	//▼백그라운드 배경
	var background = this.add.sprite(0.0, 0.0, episodeKey+'_bg');
	background.scale.setTo(0.75, 1.0);
	
	//▼보스
	var monstand;
	if(episodeKey == "sp_sb"){
		monstand = this.add.sprite(213.0, 104.0, 'wantanstand');
	}else if(episodeKey == "kb_hl"){
		monstand = this.add.sprite(213.0, 104.0, 'hidostand');
	}else if(episodeKey == "kt_kk"){
		monstand = this.add.sprite(213.0, 104.0, 'eagolstand');
	}else if(episodeKey == "ok_pp"){
		monstand = this.add.sprite(213.0, 104.0, 'ououstand');
	}else if(episodeKey == "tk_tt"){
		monstand = this.add.sprite(213.0, 104.0, 'lasbos');
	}else{
		monstand = this.add.sprite(213.0, 104.0, 'jakostand');
	}
	monstand.scale.setTo(0.7, 0.7);
	
	seed_max = eval(episodeKey.substring(0,2)+'_seed_max');//해당 스테이지의 최대값 인덱스
	seed_min = eval(episodeKey.substring(0,2)+'_seed_min');//해당 스테이지의 최소값 인덱스
	
	bossRandomStart_1 = Math.floor(Math.random() * (seed_max-seed_min) + seed_min);//렌덤으로 스테이지 정함
	
	//jsVariables.js확인
	bossTypeA_1 = scriptTypeA.get(scriptEp[bossRandomStart_1]);
	bossTypeB_1 = scriptTypeB.get(scriptEp[bossRandomStart_1]);//jsVariables.js확인
	
	do
	{
		bossRandomStart_2 = Math.floor(Math.random() * (seed_max-seed_min) + seed_min);//렌덤으로 스테이지 정함
	}
	while(bossRandomStart_1 == bossRandomStart_2)

	//jsVariables.js확인
	bossTypeA_2 = scriptTypeA.get(scriptEp[bossRandomStart_2]);
	bossTypeB_2 = scriptTypeB.get(scriptEp[bossRandomStart_2]);
	
	//두 스테이지 조인
	bossTypeA = bossTypeA_1.concat(bossTypeA_2);
	bossTypeB = bossTypeB_1.concat(bossTypeB_2);
	
	for(var i = 0; i < 12; i++)
	{
		var index = parseInt(i/2);
		var scindex;
		var target;
		if(i > 5){
			target = bossRandomStart_2;
			scindex = i%6 + 1;
		}
		else{
			target = bossRandomStart_1;
			scindex = i+1;
		}	
		var aud = scriptEp[target]+'_0'+scindex;
		if(i%2 == 0)
			bossRecordingA[index] = this.add.audio(aud);
		else
			bossRecordingB[index] = this.add.audio(aud);
	}
	
	var xhrBoss = new XMLHttpRequest(); // 유저 스크립트 세션값 셋팅
	xhrBoss.open("post", "/"+ctx+"/setScriptSession", true); // xmlHttp로 접근할컨트롤러
	xhrBoss.send(scriptEp[bossRandomStart_1]);
	
	//▼처음 시작텍스트
	ok_startGreybox = this.add.sprite(94.0, 407.0, 'textbox');
	ok_startGreybox.scale.setTo(2, 1.6);
	ok_startGreybox_change = ok_startGreybox.animations.add('change', [0, 1, 2], 6, true);
	ok_startGreybox_change.play();
	ok_startGreybox.inputEnabled = true;
	ok_startGreybox.events.onInputDown.add(ok_next, this); //클릭 했을 때 ok_next 호출
	
	//▼ 보스 대사 : 15자 이상은 아래줄로 이동
	var bossSentence = bossList.get(episodeKey).sentence;
	ok_StartText = this.game.add.text(150, 450, bossSentence.match(/.{15}/g).join("\n"),
			{font: "30px Arial", fill: "#ff0044", align: "center"});
	
	//▼실패했을때의 창
	ok_failGreybox = this.add.sprite(94.0, 407.0, 'textbox',0);
	ok_failGreybox.scale.setTo(2, 1.6);
	ok_failGreybox_change = ok_failGreybox.animations.add('change', [0, 1, 2], 6, true);
	ok_failGreybox_change.play();
	ok_failGreybox.visible = false;
	ok_failGreybox.inputEnabled = true;
	ok_failGreybox.events.onInputDown.add(ok_damaged, this);
	
	ok_failText = this.game.add.text(150, 450, "歯が立たない！",
			{font: "35px Arial", fill: "#ff0044", align: "center"});
	ok_failText.visible = false;
	
	//▼게임 오버를 위한 창 설정
	ok_goGreybox = this.add.sprite(94.0, 407.0, 'textbox');
	ok_goGreybox.scale.setTo(2, 1.6);
	ok_goGreybox_change = ok_goGreybox.animations.add('change', [0, 1, 2], 6, true);
	ok_goGreybox_change.play();
	ok_goGreybox.visible = false;
	ok_goGreybox.inputEnabled = true;
	ok_goGreybox.events.onInputDown.add(ok_goresult, this, 0, null); //클릭하면 game over 페이지로 넘어감
	
	//▼게임 성공 했을 때 위한 창 설정
	//greybox3는 화면 흔들리게 하는 변수명으로 이미 사용
	ok_suGreybox = this.add.sprite(94.0, 407.0, 'textbox');
	ok_suGreybox.scale.setTo(2, 1.6);
	ok_suGreybox_change = ok_suGreybox.animations.add('change', [0, 1, 2], 6, true);
	ok_suGreybox_change.play();
	ok_suGreybox.visible = false;
	ok_suGreybox.inputEnabled = true;
	ok_suGreybox.events.onInputDown.add(ok_goend, this, 0, null); //클릭하면 game over 페이지로 넘어감
	
	//▼녹음버튼
	ok_btn_save = this.game.add.button(570, 490, '146x155 button', ok_save, this, 0, 1, 0, 1); 
	ok_btn_save.scale.setTo(0.6, 0.6);
	ok_btn_save.inputEnabled = true;
	ok_btn_save.visible = false;
	
	//▼아이템 쓸지 여부를 묻는 창
	ok_itemMsg = this.add.sprite(226, 450.0, 'msg');
	ok_itemMsg.scale.setTo(0.25, 0.25);
	ok_itemMsg.alpha=0.9;
	ok_itemMsg.visible = false;
	
	//▼예스 버튼
	ok_button_yes = this.add.button(390, 525, 'btn_yes',ok_itemuse, this, 0, 1, 0, 1);
	ok_button_yes.scale.setTo(0.35, 0.35);
	ok_button_yes.visible = false;
	ok_button_yes.inputEnabled = true;
	
	//▼노 버튼
	ok_button_no = this.add.button(450, 525, 'btn_nope', ok_itemnotuse, this, 0, 1, 0, 1);
	ok_button_no.scale.setTo(0.35, 0.35);
	ok_button_no.visible = false;
	ok_button_no.inputEnabled = true;
	
	//▼아이템 쓸지 여부를 묻는 텍스트
	ok_textItem = this.game.add.text(250, 480, "アイテムが"+ok_haveitem+"個あります。\n使いますか？",
			{font: "18px Arial", fill: "#ff0044", align: "center"});
	ok_textItem.visible = false;
	
	for(var i = 0; i < heartMax; i++)//하트추가
	{
		heart[i] = this.add.sprite(heartStartWidth, 50, 'heart_chance'); //heart 추가
		heart[i].scale.setTo(0.06, 0.06);
		heartStartWidth -= heartBandWidth;
	}
	
	//▼게임오버 됐을때 뜨는 텍스트
	ok_textgameover = this.game.add.text(150, 450, "さっさと消えろ！",
			{font: "40px Arial", fill: "#ff0044", align: "center"});
	ok_textgameover.visible = false;
	
	//▼게임성공 했을때 뜨는 텍스트
	ok_textgamesuccess = this.game.add.text(150, 450, "ま...負けた...",
			{font: "40px Arial", fill: "#ff0044", align: "center"});
	ok_textgamesuccess.visible = false;
	
	//▼ 시간 게이지 표시 (애니메이션)
	ok_timebar = this.add.sprite(30, 20, 'time_bar', 0); //막대 추가
	ok_timebar.scale.setTo(0.7, 0.5); //막대의 크기 조절
	ok_timebar.visible = false;
	ok_timeBar = ok_timebar.animations.add('ok_time_bar_ani', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 2, true);
	ok_timeBar.enableUpdate = true;
	ok_timeBar.onUpdate.add(bossOnUpdate, this); //update로 이동
	ok_timeBar.visible = false;
	
	//▼ 시간 게이지 표시 (숫자)
	ok_timeText = this.game.add.text(78, 48, "20", { font: "35px Arial", fill: "#ff0044", align: "left"}); //타이머 숫자 추가
	ok_timeText.visible = false;
	
};//create

//▼무조건 soundStopped로 이동한다.
function ok_next(){ 
	if(bossScriptCount == 0){
		ok_StartText.visible = false;
		ok_startGreybox.visible = false;
		bossRecordingA[bossScriptCount].play();
		bossRecordingA[bossScriptCount].onStop.add(ok_soundStopped, this); //script 정지, 무한반복 안되게 해줌
	
	} else{
		bossRecordingA[bossScriptCount].play();
		ok_btn_save.visible = false;
		bossRecordingA[bossScriptCount].onStop.add(ok_soundStopped, this);
	}
}//ok_next

function ok_soundStopped(){
	ok_btn_save.visible = true; //녹음 버튼 활성화 -> 1)클릭시 ok_save 메소드 실행, 2)녹음버튼 클릭 안하면 bossOnUpdate 메소드 실행
	ok_timebar.visible = true; //타임바 활성화
	ok_timeText.visible = true;
	ok_timeBar.play(); //타임바 실행
}//ok_soundStopped

function ok_save(){ //녹음 추후에 원버튼형식으로 수정필요 현재는 B파트만 사용자가 말하게 함
	if(bossIsRecording == false)
	{
		if(bossScriptCount > 2)//한 에피소드 끝
		{			
			var xhrSS = new XMLHttpRequest(); // 유저 스크립트 세션값 셋팅
			xhrSS.open("post", "/"+ctx+"/setScriptSession", true); // xmlHttp로 접근할컨트롤러
			xhrSS.send(scriptEp[bossRandomStart_2]);
		}
		var xhrSS = new XMLHttpRequest(); // 유저 스크립트 세션값 셋팅
		xhrSS.open("post", "/"+ctx+"/setScriptTarget", true); // xmlHttp로 접근할컨트롤러
		xhrSS.send(((bossScriptCount%3)+1)*2);//2,4,6,2,4,6
		bossIsRecording = true;
		toggleRecording();

		//▼녹음 버튼만 누르고 정지 버튼을 안눌렀을 때도 정지
		//bossOnUpdate(); //시간세기 메소드 다시 실행
	}
	else
	{
		ok_timebar.visible = false;
		ok_timeText.visible = false;
		ok_timeBar.stop(); //타임바 정지
		bossIsRecording = false;
		isSayDone = true;
		toggleRecording();
		
		bossGetScore();
	}
}

/**
 * 시간초 업데이트
 */
function bossOnUpdate(anim, frame) {
    ok_timeText.text = 20 - frame.index;
    var tester = 20 - frame.index;
    
    if(tester == 1){ //시간오버 되면
    	ok_timebar.visible = false;
		ok_timeText.visible = false;
		ok_timeBar.stop();
		
		toggleRecording();
    	bossGetScore();
    }//if문
}//update 

function bossGetScore() {
	ok_btn_save.visible = false;
	
	var xhr=new XMLHttpRequest();
	  xhr.onload=function(e) {
	      if(this.readyState === 4) {
	    	 // ok_score = e.target.responseText;
	    	  ok_score = 60;
	    	 //1.녹음을 클릭하고 정지까지의 동작을 했을 때는 제외한 모든경우
	    	 //2.점수가 60점 미만
	    	  if (isSayDone == false || ok_score < 60) {
	    		  	bossScoreList[bossScriptCount] = ok_score;
	    			bossUsechance();
	    		} else if (bossScriptCount >= 5) {//보스전 종료
	    			bossScoreList[bossScriptCount] = ok_score;//유저 점수저장
	    			bossSuccess();
	    		} else{ // 성공 했을 때 다음 스크립트 재생
	    			bossScoreList[bossScriptCount] = ok_score;//유저 점수저장
	    			bossScriptCount++;
	    			isSayDone = false;
	    			ok_next();
	    		}
	      }
	  };
	  xhr.open("POST","/"+ctx+"/getScore",true);
	  xhr.send();
}// bossGetScore

//▼성공했을 때 호출
function bossSuccess(){
	ok_btn_save.visible = false;
	ok_timebar.visible = false;
	ok_timeText.visible = false;
	
	ok_textgamesuccess.visible = true;
	ok_suGreybox.visible = true;
}

//▼실패했을 때 호출
function bossUsechance(){
	ok_timebar.visible = false;
	ok_timeText.visible = false;
	
	for(var i in itemList){
		var compareName = "シールド";
		if(itemList[i].itemName === compareName && itemList[i].itemCount > 0){
			ok_haveitem = itemList[i].itemCount;
			usedItem = itemList[i].itemUnicode;
		}
	}//for
	
	//▼아이템이 하나도 없을 때 이거
	if(ok_haveitem == 0){
		bossBullying();
	}
	
	if(ok_haveitem > 0){
		ok_itemMsg.visible = true;
		ok_textItem.visible = true;
		
		ok_button_yes.visible = true;
		ok_button_no.visible = true;
	}
}//bossUsechance

//▼아이템이 없고, 아무것도 클릭 안했을 때
function bossBullying(){
	ok_btn_save.visible = false;
	ok_failGreybox.visible = true;
	ok_failText.visible = true; //까부네 라는 메시지가 뜸
}

/**
 * 아이템이 사용되는 함수
 */
function ok_itemuse(){//후에 수정이 필요함
	
	ok_haveitem--; //아이템 갯수 차감
	
	var xhrItem = new XMLHttpRequest(); // 아이템 전체목록
	xhrItem.onload = function(e) {
		if(this.readyState === 4) {
			itemList = e.target.responseText;
			
			ok_itemMsg.visible = false;
			ok_textItem.visible = false;
			ok_button_yes.visible = false;
			ok_button_no.visible = false;
			ok_next();
		}// if
	}// onload
	xhrItem.open("post", "/"+ctx+"/useUserItemList", true); // xmlHttp로 접근할컨트롤러
	xhrItem.send(usedItem);
	
}

//▼아이템 사용 안했을 때
function ok_itemnotuse(){
	ok_itemMsg.visible = false;
	ok_textItem.visible = false;
	ok_button_yes.visible = false;
	ok_button_no.visible = false;
	
	bossBullying();
}

function ok_damaged(){
	this.camera.shake(0.05, 500);
	
	ok_btn_save.visible = false;
	ok_failGreybox.visible = false;
	ok_failText.visible = false;
	ok_startGreybox.destroy();
		
	if(bossFailCount < 3){
		heart[bossFailCount].visible = false;
		ok_next();
		bossFailCount++;

	} else {
		ok_textgameover.visible = true;
		ok_goGreybox.visible = true;
		ok_goGreybox.inputEnabled = true; //게임오버 화면으로 넘어가는 창 활성
	}
}

//▼게임오버 화면으로 감
function ok_goresult(){
	/** 기회 세번을 다 쓰고 실패하면 다시 필드맵 화면으로 넘어감 */
	if(episodeKey.substring(0,2) == 'ok'){
		this.game.state.start('ok_pp');
	}else if(episodeKey.substring(0,2) == 'tk'){
		this.game.state.start('tk_tt');
	}else{
		this.game.state.start('fieldModule'); 
	}
}

//▼게임결과 화면으로 감
function ok_goend(){
	for(var i in bossScoreList){
		bossResult += bossScoreList[i];
	}
	bossResult = bossResult / 12;
	
	var xhrBossResult = new XMLHttpRequest(); // 아이템 전체목록
	xhrBossResult.onload = function(e) {
		if(this.readyState === 4) {
			
		}// if
	}// onload
	xhrBossResult.open("post", "/"+ctx+"/updateUserScore", true); // xmlHttp로 접근할컨트롤러
	xhrBossResult.send(episodeKey+bossResult);
	
	this.game.state.start("result"); //모두 성공 했을 때 결과 화면으로 넘어감
}

