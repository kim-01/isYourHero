//-- user code here --

/* --- start generated code --- */
//Generated by  1.5.1 (Phaser v2.6.2)

/**
 * fieldModule.
 */
function fieldModule() {
	Phaser.State.call(this);
}
/** @type Phaser.State */
var fieldModule_proto = Object.create(Phaser.State.prototype);
fieldModule.prototype = fieldModule_proto;
fieldModule.prototype.constructor = fieldModule;

var field_map_plAcheck;
var field_map_plBcheck;
var field_map_sscheck;
var field_map_lastStep;

fieldModule.prototype.init = function () {
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';
	
	field_map_plAcheck = eval(episodeKey+"_plAcheck");
	field_map_plBcheck = eval(episodeKey+"_plBcheck");
	field_map_sscheck = eval(episodeKey+"_sscheck");
	field_map_lastStep = eval(episodeKey+"_lastStep");
};
var field_spop_button;//스타트 후 팝업버튼
var field_user_player;//유저
var field_cursors;//유저이동을 위한 변수
var field_map_treeGroup;//나무그룹
var field_map_jakoGroup; //잡몹 그룹
var field_map_rangerGroup;//레인저 그룹
var field_map_rangers_pos = 159;//히어로들의 디폴트 Y좌표값
var field_map_red; //레드는 특별히 따로대우
var field_map_guideblue;//간단설명 블루
var field_map_gbStand;//블루 스탠딩
var field_map_exit;//출구
var field_map_boss;//보스몹
var field_map_colboxes;//충돌박스들
var field_map_textbox;//블루가말하는 글에 대한 텍스트박스
var field_map_surround;//최초안내용 충돌박스
var field_map_first_window;//최초안내용 윈도우
var field_map_confbox;
var field_map_confirm;
var field_map_cancel;
var field_map_pracheck = false;
var field_map_jakotimer;//잡몹등장후 걸어오는걸 멈출 타이머
var field_map_tarray = ['あ、来たか。','ひどい光景でしょ？',"他の仲間たちは"+"\n"+"これの原因である",'怪人めを探している。',"俺は彼らに加勢する。"+"\n"+"急いできて！"];
var field_map_showtext; //가이드블루로 출력하는 텍스트들의 위치
var field_map_gblueT;
var field_map_gblueup;
var field_map_gblueleft;
var	field_map_ask;//학습을 진행할것인지 물어본다.아직 적용할지 안할지 고민중
var field_map_askingred;
var field_map_askingboard;
var field_map_ToSS;//Self Study로 이동하는 버튼
var field_map_ToPL;//Private Lesson으로 이동하는 버튼
var field_map_sftextN;//학습이 아직 안 끝났을 때 보여주는 텍스트
var field_map_sftextZ;//하나만 완료했을 때
var field_map_sftextY;//학습이 모두 끝난 뒤 보여주는 텍스트
var foki_descounter;
var field_map_bgm;
var backward_button_fieldModule;//뒤로가기 버튼

fieldModule.prototype.create = function () {
	field_map_bgm = this.add.audio('Battle_against_Boss');
	field_map_bgm.play();
	field_map_bgm.loopFull();
	//충돌상자로 이동경로를 제한하자. 실제 충돌상자들은 보이면 안 되기 때문에 가장 밑바닥, 제일 먼저 배치한다.
	field_map_colboxes = this.add.group();
	field_map_colboxes.create(700,700,'collisionBoxW',0,true);
	field_map_colboxes.create(600,700,'collisionBoxW',0,true);
	field_map_colboxes.create(500,700,'collisionBoxW',0,true);
	field_map_colboxes.create(700,340,'collisionBoxW',0,true);
	field_map_colboxes.create(600,340,'collisionBoxW',0,true);
	field_map_colboxes.create(500,340,'collisionBoxW',0,true);
	field_map_colboxes.create(185,475,'collisionBoxW',0,true);
	field_map_colboxes.create(430,680,'collisionBoxW',0,true);
	field_map_colboxes.create(390,650,'collisionBoxW',0,true);
	field_map_colboxes.create(0,475,'collisionBoxW',0,true);
	field_map_colboxes.create(450,380,'collisionBoxW',0,true);
	field_map_colboxes.create(415,415,'collisionBoxW',0,true);
	field_map_colboxes.create(0,280,'collisionBoxW',0,true);//왼쪽 중간 덩어리
	field_map_colboxes.create(112,280,'collisionBoxW',0,true);
	field_map_colboxes.create(224,280,'collisionBoxW',0,true);
	field_map_colboxes.create(0,350,'collisionBoxW',0,true);
	field_map_colboxes.create(112,350,'collisionBoxW',0,true);
	field_map_colboxes.create(224,350,'collisionBoxW',0,true);
	field_map_colboxes.create(0,160,'collisionBoxW',0,true);//왼쪽 맨 위 벽
	field_map_colboxes.create(105,160,'collisionBoxW',0,true);
	field_map_colboxes.create(210,160,'collisionBoxW',0,true);
	field_map_colboxes.create(315,160,'collisionBoxW',0,true);
	field_map_colboxes.create(420,160,'collisionBoxW',0,true);
	field_map_colboxes.create(525,160,'collisionBoxW',0,true);
	field_map_colboxes.create(260,475,'collisionBox',0,true);//
	field_map_colboxes.create(260,580,'collisionBox',0,true);
	field_map_colboxes.create(260,695,'collisionBox',0,true);
	field_map_colboxes.create(185,475,'collisionBox',0,true);
	field_map_colboxes.create(185,580,'collisionBox',0,true);
	field_map_colboxes.create(185,695,'collisionBox',0,true);
	field_map_colboxes.create(375,450,'collisionBox',0,true);
	field_map_colboxes.create(375,550,'collisionBox',0,true);
	field_map_colboxes.create(350,0,'collisionBox',0,true);
	field_map_colboxes.create(70,480,'collisionBox',0,true);
	field_map_colboxes.create(70,590,'collisionBox',0,true);
	field_map_colboxes.create(70,700,'collisionBox',0,true);
	this.physics.enable(field_map_colboxes, Phaser.Physics.ARCADE);
	field_map_colboxes.setAll('body.immovable',true);
	//충돌상자 끝
	//유저를 감쌀 충돌상자가 필요해졌음 해당 충돌박스들에는 update문에서 충돌이벤트를 걸어두었다.
	field_map_surround = this.add.group();
	field_map_surround.create(675,700,'collisionBox',0,true);
	field_map_surround.create(755,700,'collisionBox',0,true);
	this.physics.enable(field_map_surround,Phaser.Physics.ARCADE);
	field_map_surround.setAll('body.immovable',true);
	//충돌상자 전부 끝
	field_map_exit = this.add.sprite(785.0, 700.0, 'collisionBox', 0);//출구를 생성
	this.physics.enable(field_map_exit,Phaser.Physics.ARCADE);
	field_map_exit.body.immovable = true;
	//end
	this.add.sprite(0.0, 0.0, 'ok_pp_map');//타일맵 호출
	foki_pines = this.add.group();//터진 파인애플들을 생성한다.
	for (var int = 0; int < 30; int++) {//완파 파인애플
		var ap = foki_pines.create(this.math.between(0,800),this.math.between(0,800),'rock',0,true);//무작위로 맵전체에 30개 뿌리기
	}
	for (var int = 0; int < 30; int++) {//반파 파인애플
		var ap = foki_pines.create(this.math.between(0,800),this.math.between(0,800),'stone',0,true);//무작위로 맵전체에 15개 뿌리기
		ap.angle = this.math.between(-90,90);//랜덤으로 기울이게 만든다.
	}
	foki_pines.setAll('scale.x',0.3);//파인애플들 크기조절
	foki_pines.setAll('scale.y',0.3);
	//적 NPC들의 이미지를 넣는다.--------------------------------------------------------------------------------------
	
	if(episodeKey == "sp_sb"){
		field_map_boss = this.add.sprite(610.0, 26.0, 'wantandot', 0);
	}else if(episodeKey == "kt_kk"){
		field_map_boss = this.add.sprite(610.0, 26.0, 'eagoldott', 0);
	}else{
		field_map_boss = this.add.sprite(610.0, 26.0, 'jakodott', 0);
	}
	
	var field_map_boss_idle = field_map_boss.animations.add('idle', [0,1,2], 5, true);//보스의 모션을 애니메이션으로 만들고(무한루프)
	field_map_boss_idle.play();//실행한다.
	this.physics.enable(field_map_boss, Phaser.Physics.ARCADE);//실체부여
	field_map_boss.body.immovable = true;
	field_map_jakoGroup = this.add.group();//잡몹들을 하나의 그룹으로 묶어준다.
	var field_map_xposition = 600;
	for (var int2 = 0; int2 < 4; int2++) {//잡몹생성
		var jako = field_map_jakoGroup.create(field_map_xposition, 309.0, 'jakodott', 9, true);
		var jakoani = jako.animations.add('pup', [9, 10, 11, 10], 5, true);
		jakoani.play();
		field_map_xposition = field_map_xposition + 40;
	}//나름 머리굴려서 만든 잡몹 4마리의 배치for문
	this.physics.enable(field_map_jakoGroup, Phaser.Physics.ARCADE);//잡몹에 실체부여
	field_map_jakoGroup.setAll('body.immovable',true);
	field_map_jakoGroup.visible = false;//잡몹은 시작부터 보여주지 않을거다.
	//아군NPC들의 이미지를 넣는다.-------------------------------------------------------------------------------------
	field_map_rangerGroup = this.add.group();//히어로들을 그룹으로 묶는다.
	if (field_map_sscheck && field_map_plAcheck && field_map_plBcheck) {
		field_map_rangers_pos = 183;
	}
	field_map_rangerGroup.create(690.0, field_map_rangers_pos, 'green', 0, true);//히어로들생성
	field_map_rangerGroup.create(624.0, field_map_rangers_pos, 'purple', 0, true);
	field_map_rangerGroup.create(717.0, field_map_rangers_pos, 'blue', 0, true);
	this.physics.enable(field_map_rangerGroup,Phaser.Physics.ARCADE);//히어로들에 실체부여
	field_map_rangerGroup.setAll('body.immovable',true);

	field_map_red = this.add.sprite(653.0, field_map_rangers_pos, 'red', 0);//foki_red는 따로생성
	this.physics.enable(field_map_red,Phaser.Physics.ARCADE);//foki_red에 실체부여
	field_map_red.body.immovable = true;//foki_red는 움직이지 않는다.

	field_map_treeGroup = this.add.group();//나무들을 그룹으로 묶는다.
	field_map_treeGroup.create(42.0, 712.0, 'tree2',0,true);
	field_map_treeGroup.create(46.0, 635.0, 'tree2',0,true);
	field_map_treeGroup.create(47.0, 556.0, 'tree2',0,true);
	field_map_treeGroup.create(48.0, 470.0, 'tree2',0,true);
	field_map_treeGroup.create(179.0, 492.0, 'tree2',0,true);
	field_map_treeGroup.create(178.0, 619.0, 'tree2',0,true);
	field_map_treeGroup.create(182.0, 732.0, 'tree2',0,true);
	field_map_treeGroup.create(407.0, 430.0, 'tree2',0,true);
	field_map_treeGroup.create(404.0, 578.0, 'tree2',0,true);
	field_map_treeGroup.create(472.0, 670.0, 'tree2',0,true);
	field_map_treeGroup.create(639.0, 668.0, 'tree2',0,true);
	field_map_treeGroup.create(488.0, 343.0, 'tree2',0,true);
	field_map_treeGroup.create(641.0, 342.0, 'tree2',0,true);
	field_map_treeGroup.create(3.0, 300.0, 'tree2',0,true);
	field_map_treeGroup.create(125.0, 300.0, 'tree2',0,true);
	field_map_treeGroup.create(259.0, 301.0, 'tree2',0,true);
	field_map_treeGroup.create(731.0, 113.0, 'tree2',0,true);
	field_map_treeGroup.create(573.0, 117.0, 'tree2',0,true);
	field_map_treeGroup.create(357.0, 116.0, 'tree2',0,true);
	field_map_treeGroup.create(462.0, 116.0, 'tree2',0,true);
	this.physics.enable(field_map_treeGroup, Phaser.Physics.ARCADE);
	field_map_treeGroup.setAll('body.immovable',true);//그룹에 해당하는 객체들을 충돌해도 움직이지 않게 하려면 setAll함수를 이용해야 한다.

	//텍스트상자와 그 안의 텍스트를 출력합시다 =======================================================================================
	field_map_guideblue = this.add.sprite(674.0, 751.0, 'blue', 7);//가이드용 blue도 따로생성
	field_map_gblueup = field_map_guideblue.animations.add('gbup',[9,10,11,10], 5, true);
	field_map_gblueleft = field_map_guideblue.animations.add('gbup',[3,4,5,4], 5, true);
	this.physics.enable(field_map_guideblue, Phaser.Physics.ARCADE);//가이드블루가 실체를 가진다.
	if (field_map_sscheck || field_map_plAcheck || field_map_plBcheck) {
		field_map_guideblue.visible = false;
	}
	field_map_gbStand = this.add.sprite(300,600,'bstand',0);
	field_map_gbStand.scale.setTo(0.25,0.25);
	field_map_gbStand.visible = false;
	field_map_textbox = this.add.sprite(450, 600, 'textbox',0);//가이드블루의 텍스트상자
	field_map_showtext = this.add.text(465, 630, field_map_tarray[0], { font: "20px Arial", fill: "#000000", align: "left" });
	field_map_showtext.visible=false;
	var field_map_converidle = field_map_textbox.animations.add('converidle', [0, 1, 2], 5, true);
	field_map_converidle.play();
	field_map_textbox.visible=false;
	field_map_guideblue.body.immovable = true;
	field_map_gblueT = this.time.create(false);//가이드블루의 퇴장타이머
	field_map_gblueT.add(2250,fdm_moveblue);
	//------------------------------------------------------------------유저의 캐릭터코드에서 받은 정보로 캐릭터를 출력
	var field_map_charcode = userCharUnicode;//남자니여자니?
	if (field_map_charcode=='male') {
		field_user_player = this.add.sprite(field_map_lastStep.x, field_map_lastStep.y, 'maled', 0);	
	}else{
		field_user_player = this.add.sprite(field_map_lastStep.x, field_map_lastStep.y, 'femaled', 0);
	}
	field_user_player.animations.add('pleft', [3, 4, 5, 4], 5, false);
	field_user_player.animations.add('pright', [6, 7, 8, 7], 5, false);
	field_user_player.animations.add('pup', [9, 10, 11, 10], 5, false);
	field_user_player.animations.add('pdown', [0, 1, 2, 1], 5, false);
	this.physics.enable(field_user_player, Phaser.Physics.ARCADE);//플레이어 객체가 충돌크기를 가지게 설정
	field_cursors = this.input.keyboard.createCursorKeys(); //알아서 방향키를 지정해준다.
	this.camera.follow(field_user_player);//그냥 설정만 해두면 플레이어로 설정된 객체를 잘 따라다닌다.
	this.world.setBounds(0, 0, 800, 800);//전체 월드맵의 크기를 설정한다. 앞의 0,0은 안건드려도 된다.
	field_user_player.body.collideWorldBounds = true;//유저가 월드맵 밖으로 나가지 못하게 막는다.
	// surrounds에 충돌했을 경우 최초안내메시지창을 띄운다-------------------------------------------------------------
	field_map_first_window = this.add.sprite(450,600,'instruction',0);//팝업창은 보여야한다...
	field_map_first_window.visible = false;
	field_spop_button = this.add.sprite(550,710,'button',0);//버튼용 함수들 시작
	field_spop_button.inputEnabled = true;
	field_spop_button.events.onInputDown.add(fdm_wipeout, this); //마우스 클릭버튼을 누를 때에 발동
	field_spop_button.visible = false;
	//맵을 나가려고 할 때 물어보는 메시지 박스를 생성한다.-------------------------------------------------------------
	field_map_confbox = this.add.sprite(400,600,'askpopup',0);
	field_map_confirm = this.add.sprite(600,710,'btn_yes',0);
	field_map_confirm.scale.setTo(0.3,0.3);
	field_map_cancel = this.add.sprite(650,710,'btn_nope',0);
	field_map_cancel.scale.setTo(0.3,0.3);
	//일단 이벤트 호출이 될 때까지는 보이지 않는 상태를 유지시킨다.
	field_map_confbox.visible = false;
	field_map_confirm.visible = false;
	field_map_cancel.visible = false;
	field_map_jakotimer = this.time.create(false);
	field_map_jakotimer.add(1500,fdm_stopjako);
	foki_descounter = this.time.create(false);
	foki_descounter.add(1500,fdm_stopjako);
	///////////////////////////////////////////////////////////////////////////////반복학습메뉴///////////////////////
	field_map_askingboard = this.add.sprite(200,450,'Btextbox2',0); //레드의 텍스트박스
	field_map_askingboard.inputEnabled = false;
	field_map_askingboard.events.onInputDown.add(fdm_nexttext,this);//텍스트박스를 클릭해서 텍스트를 넘겨야지
	aboxidle = field_map_askingboard.animations.add('aboxidle', [0, 1, 2], 5, true);
	aboxidle.play();// 텍스트박스의 애니메이션과 재생
	field_map_askingred = this.add.sprite(-50,200,'rstand',0);//레드의 스탠딩이미지
	field_map_askingred.scale.setTo(0.5,0.5);
	//레드의 텍스트-1 유저가 아직 연습을 모두 진행하지 않았을 때
	field_map_sftextN = this.add.text(300, 500, selectfunction_guide[0], { font: "22px Arial", fill: "#000000", align: "left" });
	//레드의 텍스트-2 유저가 두 연습을 모두 진행했을 때
	field_map_sftextY = this.add.text(300, 500, repeatstudy[0], { font: "22px Arial", fill: "#000000", align: "left" });
	field_map_sftextZ = this.add.text(300, 500, onprogress[0], { font: "22px Arial", fill: "#000000", align: "left" });
	field_map_askingboard.visible = false;//일단 다 안 보이게
	field_map_askingred.visible = false;
	field_map_sftextN.visible=false;
	field_map_sftextY.visible=false;
	field_map_sftextZ.visible=false;
};//create 종료
fieldModule.prototype.update = function () {
	field_user_player.body.velocity.set(0);//유저의 속도는 키 입력이 없을 시 항상 0이어야만 한다.
	if (field_cursors.left.isDown)
	{   field_user_player.body.velocity.x = -200;
	field_user_player.play('pleft');
	}
	else if (field_cursors.right.isDown)
	{   field_user_player.body.velocity.x = 200;
	field_user_player.play('pright');
	}
	else if (field_cursors.up.isDown)
	{   field_user_player.body.velocity.y = -200;
	field_user_player.play('pup');
	}
	else if (field_cursors.down.isDown)
	{   field_user_player.body.velocity.y = 200;
	field_user_player.play('pdown');
	}
	else
	{   field_user_player.animations.stop();//키 입력이 없으면 애니메이션도 멈춰야만 한다.
	}
	//각종 충돌이벤트에 대한 설정
	this.game.physics.arcade.collide(field_user_player, field_map_treeGroup);//유저와 나무
	this.game.physics.arcade.collide(field_user_player, foki_pines);//유저와 파인애플들(미구현)
	this.game.physics.arcade.collide(field_user_player, field_map_red, fdm_start, null, this);//유저와 레드레인저
	this.game.physics.arcade.collide(field_user_player, field_map_rangerGroup, fdm_showbox);//유저와 레드제외 다른 레인저들
	this.game.physics.arcade.collide(field_user_player, field_map_colboxes);//유저와 충돌상자(이동범위제한)
	this.game.physics.arcade.collide(field_user_player, field_map_surround, fdm_colevent, null, this);//유저와 최초도움말 트리거용 충돌상자
	this.game.physics.arcade.collide(field_user_player, field_map_guideblue, fdm_convers);//유저와 가이드용 블루
	this.game.physics.arcade.collide(field_user_player, field_map_exit, fdm_escape, null, this);//유저와 필드의 출구
	this.game.physics.arcade.collide(field_user_player, field_map_boss, fdm_battle, null, this);//유저와 필드보스
	this.game.physics.arcade.collide(field_map_rangerGroup, field_map_jakoGroup,fdm_stopjako, null, this);//레인져그룹과 잡몹그룹
};//update 종료

//보스와의 충돌에서 호출되는 함수---------------------------------------------------------
function fdm_battle(){
	field_map_bgm.stop();
	this.game.state.start("boss");
}
//최초 도움말과 관련된 함수-------------------------------------------------------------
function fdm_colevent(){//보이게 한다.
	field_map_first_window.visible = true;
	field_spop_button.visible = true;
}
function fdm_wipeout(botan){//최초 한번만 필요하니까 없애버린다.
	field_map_first_window.destroy(true);
	field_map_surround.destroy(true);
	botan.destroy(true);
}
//가이드용 블루의 간단설명부터 퇴장까지의 함수-------------------------------------------------
function fdm_convers(){//블루와 충돌하면 스탠딩 이미지와 메시지박스가 출력된다.
	field_map_gbStand.visible = true;
	field_map_textbox.visible = true;
	field_map_textbox.inputEnabled = true;
	field_map_showtext.visible = true;
	field_map_textbox.events.onInputDown.add(field_map_showtexts);//메시지박스에 클릭이벤트 설정
}
var field_map_guidecount1 = 1;
function field_map_showtexts(){//메시지박스 클릭으로 호출될때마다 설정된 텍스트의 배열에서 한 덩어리씩 꺼내쓴다. 
	if (field_map_tarray.length > field_map_guidecount1) {
		var text = field_map_tarray[field_map_guidecount1];
		field_map_showtext.setText(text);
		field_map_guidecount1++;
	}else{//배열에 설정된 텍스트들이 모두 사용되면 대화창과 이미지를 없애고 블루를 퇴장시키는 함수를 호출한다.
		field_map_textbox.kill();
		field_map_showtext.kill();
		field_map_gbStand.kill();
		fdm_bluebye();
		guidecount = 1;
	}
}
function fdm_bluebye(){
	field_map_gblueleft.play();//블루가 왼쪽으로 걸어가는 애니메이션 재생(무한루프)
	field_map_guideblue.body.velocity.x = -150;
	field_map_gblueT.start();//타이머를 호출한다. 타이머는 설정된 시간 이후 아래의 moveblue를 자동으로 호출한다. 
}
function fdm_moveblue(){//타이머가 호출하는 함수로 호출되면 실행된다.
	field_map_gblueup.play();//블루가 올라가는 동작의 애니메이션 재생(무한루프)
	field_map_guideblue.body.velocity.x = 0;
	field_map_guideblue.body.velocity.y = -150;
}
//레드 이외의 레인져들과 충돌했을 때-------------------------------------------------------
function fdm_showbox(sprite){
	alert("レッドのほうに行って!");
}
//레드와 충돌했을 때의 이벤트------------------------------------------------------------
function fdm_start(){
	field_map_askingboard.inputEnabled = true;
	field_map_askingred.visible = true;//레드의 스탠딩과 대화상자를 보이게 한다.
	field_map_askingboard.visible = true;
	if (field_map_sscheck && field_map_plAcheck && field_map_plBcheck) {//selfstudy와 privatelesson수행이 필요하다.
		field_map_jakoGroup.visible = true;
		field_user_player.position.y = 145;
		field_map_red.position.y = 180;
		field_map_rangerGroup.setAll('position.y',180);
		field_map_jakoGroup.setAll('body.velocity.y',-50);
		field_map_jakotimer.start();		
		field_map_sftextY.visible = true;
	}else if (field_map_sscheck || field_map_plAcheck || field_map_plBcheck) {//두 학습중 하나라도 했을 경우
		field_map_lastStep.x = field_user_player.position.x;
		field_map_lastStep.y = (field_user_player.position.y + 5);
		field_map_sftextZ.visible = true;
		field_map_sftextZ.setText(onprogress[0]);
	}else{//두 학습을 진행하지 않은 상태에서 충돌시
		field_map_lastStep.x = field_user_player.position.x;
		field_map_lastStep.y = (field_user_player.position.y + 5);
		field_map_sftextN.visible = true;
	}
}
var field_map_sfguide = 1;
function fdm_nexttext(){//레드의 텍스트상자를 클릭했을 때 진행되는 이벤트
	if (field_map_sscheck && field_map_plAcheck && field_map_plBcheck) {//모든 학습을 진행했을 경우
		if (repeatstudy.length > field_map_sfguide) {
			var text = repeatstudy[field_map_sfguide];
			field_map_sftextY.setText(text);
			field_map_sfguide++;
		}else{//모든학습 진행자가 텍스트 끝까지 봤다면
			field_map_sftextY.visible=false;
			field_map_ToPL = this.add.button(300, 535, 'plbutton',fdm_selectPL, this,1,0,1,0);
			field_map_ToPL.scale.setTo(0.3,0.3);
			field_map_ToSS = this.add.button(300, 490, 'ssbutton',fdm_selectSS, this,1,0,1,0);
			field_map_ToSS.scale.setTo(0.3,0.3);
			backward_button_fieldModule = this.add.button(700,550,'btn_backward',backward_fdm, this, 1,0,1,0);//뒤로가기버튼
			backward_button_fieldModule.scale.setTo(0.3,0.3);
		}
	}else if (field_map_sscheck || field_map_plAcheck || field_map_plBcheck) {//둘중 하나의 학습만 완료했을 경우
		if (onprogress.length > field_map_sfguide) {
			var text = onprogress[field_map_sfguide];
			field_map_sftextN.setText(text);
			field_map_sfguide++;
		}else{
			field_map_sftextZ.visible=false;
		field_map_ToPL = this.game.add.button(300, 535, 'plbutton',fdm_selectPL, this,1,0,1,0);
		field_map_ToPL.scale.setTo(0.3,0.3);
		field_map_ToSS = this.game.add.button(300, 490, 'ssbutton',fdm_selectSS, this,1,0,1,0);
		field_map_ToSS.scale.setTo(0.3,0.3);
		backward_button_fieldModule = this.add.button(700,550,'btn_backward',backward_fdm, this, 1,0,1,0);//뒤로가기버튼
		backward_button_fieldModule.scale.setTo(0.3,0.3);
		}
	}else{//둘 다 완료하지 못했을 경우
		if (selectfunction_guide.length > field_map_sfguide) {
			var text = selectfunction_guide[field_map_sfguide];
			field_map_sftextN.setText(text);
			field_map_sfguide++;
		}else{
			field_map_sftextN.visible=false;
			field_map_ToPL = this.game.add.button(300, 535, 'plbutton',fdm_selectPL, this,1,0,1,0);
			field_map_ToPL.scale.setTo(0.3,0.3);
			field_map_ToSS = this.game.add.button(300, 490, 'ssbutton',fdm_selectSS, this,1,0,1,0);
			field_map_ToSS.scale.setTo(0.3,0.3);
			backward_button_fieldModule = this.add.button(700,550,'btn_backward',backward_fdm, this, 1,0,1,0);//뒤로가기버튼
			backward_button_fieldModule.scale.setTo(0.3,0.3);
		}
	}
}
function backward_fdm(){//뒤로가기 버튼을 눌렀을 경우에 대한 함수
	field_map_sfguide = 1;
	field_map_askingred.visible = false;//레드 스탠딩
	field_map_askingboard.visible = false;//레드 대화창
	field_map_askingboard.inputEnabled = false;//레드 대화창 클릭가능해제
	var field_map_temp1 = selectfunction_guide[0];
	field_map_sftextN.setText(field_map_temp1);//텍스트를 처음으로 돌려준다.(학습전)
	var field_map_temp2 = repeatstudy[0];
	field_map_sftextY.setText(field_map_temp2);//텍스트를 처음으로 돌려준다.(학습후)
	var field_map_temp3 = onprogress[0];
	field_map_sftextZ.setText(field_map_temp3);
	field_map_ToPL.kill();
	field_map_ToSS.kill();
	backward_button_fieldModule.kill();
}
//레드와의 대화이후 버튼을 클릭했다
function fdm_selectPL(){
	field_map_ToPL.visible = false;
	field_map_ToSS.visible = false;
	field_map_ToPL.kill();
	field_map_ToSS.kill();
	foki_chooseA = this.game.add.button(300,490,'scriptAbutton',fdm_selectPA,this,1,0,1,0);
	foki_chooseA.scale.setTo(0.3,0.3);
	foki_chooseB = this.game.add.button(300,535,'scriptBbutton',fdm_selectPB,this,1,0,1,0);
	foki_chooseB.scale.setTo(0.3,0.3);
}
function fdm_selectSS(){
	field_map_ToPL.visible = false;
	field_map_ToSS.visible = false;
	field_map_ToPL.kill();
	field_map_ToSS.kill();
	field_map_bgm.stop();
	this.game.state.start('selfStudy');
}

function fdm_selectPA(){//private lesson의 경우. 위와 동일
	field_map_bgm.stop();
	selectA = true;//A선택시
	this.game.state.start('privateLesson',true, false, 'A');
}
function fdm_selectPB(){//self study로 보낸다. 일단 보내면 체크변수도 변경
	field_map_bgm.stop();
	selectA = false;//B선택시
	this.game.state.start('privateLesson',true, false, 'B');
}
//잡몹을 정지시키는 함수. 이동을 시작하고 일정 시간이 지나면, 혹은 레인저들과 충돌했을 경우 호출된다.------------- 
function fdm_stopjako(){
	field_map_jakoGroup.setAll('body.velocity.y',0);
}
//필드에서 나가서 다시 관광지 선택화면으로 넘어가려 할 경우 선택에 의한 함수들------------------------------
function fdm_escape(){//필드에서 나가려할때 메뉴를 출력한다
	field_user_player.position.x = field_user_player.position.x-10;
	field_map_confbox.visible = true;
	field_map_confirm.inputEnabled = true;
	field_map_confirm.visible = true;
	field_map_cancel.inputEnabled = true;
	field_map_cancel.visible = true;
	field_map_confirm.events.onInputDown.addOnce(fdm_byebye,this,0,null);
	field_map_cancel.events.onInputDown.addOnce(fdm_hide,this,0,null);
}
function fdm_hide(){//위에서 cancel버튼을 클릭했을 때
	field_map_confbox.visible = false;
	field_map_confirm.inputEnabled = false;
	field_map_confirm.visible = false;
	field_map_cancel.inputEnabled = false;
	field_map_cancel.visible = false;
}
function fdm_byebye(){//위에서 confirm버튼을 클릭했을 때
	field_map_bgm.stop();
	if(episodeKey.substring(0,2) == 'kb'){
		this.game.state.start("kobe");
	}else if(episodeKey.substring(0,2) == 'kt'){
		this.game.state.start("kyoto");
	}else if(episodeKey.substring(0,2) == 'sp'){
		this.game.state.start("sapporo");
	}else{
		this.game.state.start("japanMap");
	}
	
}
