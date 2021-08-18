
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.1 (Phaser v2.6.2)


/**
 * prologue.
 */
function prologue() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var prologue_proto = Object.create(Phaser.State.prototype);
prologue.prototype = prologue_proto;
prologue.prototype.constructor = prologue;

prologue.prototype.init = function () {
	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';
	
};
var pre_text;
var pre_textbox;
var pre_frame;
var pre_scriptIndex = 0;
var pre_heroScript=[
                "勇者よ！世界を救う準備はできたか!"
                ,"まず、我々が誰なのか\n教えてあげなきゃね。"
                ,"数年前に怪獣からの襲撃を予想して、\n対備するための研究所が建てられた。"
                ,"我々それから危険に陥った\n日本を守るため秘密裏に準備してきた\n4人で構成されたヒーローというわけだ。"
                ,"我々5人になってからこそ、\n完全な力がだせるのだ。"
                ,"しかし、ヒーローの資質を持っている\n人を探すのは簡単ではない。"
                ,"だから君が必要だ!\nこうしている間にも日本全域が\n攻撃を受けている。"
                ,"君しかいないんだ！\n我々と一緒に日本を守ろう!"
                ];

prologue.prototype.create = function () {
	
	pre_frame = this.add.sprite(-10.0, -4.0, '01_op_foreignspeak');
	pre_frame.scale.setTo(0.40321325807740654, 0.4535453765710031);
	pre_frame.inputEnabled = true;
	pre_frame.input.useHandCursor = true;
	pre_frame.events.onInputDown.add(onTap, this);
	
	/* 재생음악 변수 설정 */
	pre_bgm = this.add.audio('Foreigner_theme'); // 재생음악 지정
	pre_bgm.play(); // 배경음악 재생
	pre_bgm.loopFull(); // 배경음악 무한 루프
	
	/* 메세지 창 */
	pre_textbox = this.add.sprite(57.0, 218.0, 'textbox', 0);
	pre_textbox.scale.setTo(2.3399999851726405, 2.590000002976019);
	pre_textbox_change = pre_textbox.animations.add('change', [0, 1, 2], 6, true);
	pre_textbox_change.play();
	pre_textbox.inputEnabled = true;
	pre_textbox.events.onInputDown.add(indexUp,this);
	pre_textbox.visible = false;
	
	/* 메세지 변수 설정 */
	pre_text = this.add.text(86.0, 230.0, 'Hello! \nSL:kj@#da\nlkgasjgk\nlak$@*s6@???', 
			{"font":"bold 40px Arial", fill: "#00" +
					"" +
					"0000", align: "left"});
};

/* --- end generated code --- */
// -- user code here --

/* 페이지 전환 함수 */
function onTap(pointer, singleTap) {

    if (singleTap)
    {
        if (pre_frame.key === '01_op_foreignspeak')
        {
        	pre_frame.loadTexture('02_op_scared');
        	pre_text.visible = false;
        }
        else if(pre_frame.key === '02_op_scared'){
        	pre_frame.loadTexture('03_op_runBoy');
        }
        else if(pre_frame.key === '03_op_runBoy')
        {
        	pre_frame.loadTexture('04_op_sleep');
        	pre_text.visible = true;
        	pre_text.reset(450.0, 176.0);
        	pre_text.setText("ウゥゥゥゥゥ…");
        }
        else if(pre_frame.key === '04_op_sleep')
        {
        	pre_frame.loadTexture('05_op_dokann');
        	pre_text.reset(56.0, 176.0);
        	pre_text.rotation = 50;
        	pre_text.fill = "#f20000";
        	pre_text.fontSize = 70;
        	pre_text.setText("ドカン！！！");
        }
       
        else if(pre_frame.key === '05_op_dokann')
        {
        	pre_frame.loadTexture('06_ruins');
        	pre_frame.scale.setTo(0.8283505793053902,0.9802155453856709);
        	pre_text.rotation = 0;
        	pre_text.reset(100.0, 300.0);
        	pre_text.fontStyle = "normal";
        	pre_text.fill = "#000000";
        	pre_text.fontSize = 35;
        	pre_text.setText(pre_heroScript[0]);
        	pre_frame.inputEnabled = false;
        	pre_textbox.visible = true;
        	
        }
        else if(pre_frame.key === '06_ruins')
        {
        	pre_frame.loadTexture('07_letsGogo');
        	pre_frame.scale.setTo(0.40321325807740654, 0.4535453765710031);
        	pre_textbox.visible = false;
        	pre_text.reset(625.0, 130.0);
        	pre_text.fontStyle = "normal";
        	pre_text.fill = "#00000";
        	pre_text.fontSize = 27;
        	pre_text.setText("我々が\n救は\nなければ\nならない\n都市が\n全部で5ヵ所だ。\nでは、\n沖縄から\n行って\n見よう！");
        }
        else{
        	callJapanMap(this);
        }
    }
}

/* 인덱스 올리는 함수 */
function indexUp(){
	pre_scriptIndex++;
	changeHeroScript(pre_scriptIndex);
}

function changeHeroScript(item){
	pre_text.setText(pre_heroScript[item]);
	if(item == 7){
		pre_textbox.inputEnabled = false;
		pre_frame.inputEnabled = true;
	}
}

/* 화면 전환 함수 */
function callJapanMap(item){
	pre_bgm.pause(); // 배경음악 일시 정지
	pre_bgm.destroy(); // 배경음악 삭제
	item.state.start("japanMap");
}

