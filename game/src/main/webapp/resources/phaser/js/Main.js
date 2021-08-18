window.onload = function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO);
	var state = null;
	
	getGameChar();
	getScript();
	getBoss();
	/* 게임 캐릭터 정보 */
	function getGameChar() {
		var xhr = new XMLHttpRequest(); // 비동기 통신용 xmlHttp선언
		xhr.onload = function(e) {
			if (this.readyState === 4) {
				var gameChar = JSON.parse(e.target.responseText);

				userCoin = gameChar.coin; // 유저 소지 코인 총액
				userCharUnicode = gameChar.charUnicode; // 유저 캐릭터 성별
				scoreList = gameChar.gameScore;//유저의 스코어정보
				itemList = gameChar.haveItem;//유저의 아이템 목록
				//프롤로그 or 게임시작 둘중 하나를 선택할 때
				if (scoreList[0].state.substring(0, 2) === 'ok') {
					state = scoreList[0].score;
					
					// 유저가 게임을 처음시작했는지 여부를 체크하여 시작 단계 플레그 변경
					if (state != "") {
						clearFlag = true;
					} else {
						clearFlag = false;
					}// else
				}//if
				
				// 전체 스테이지 셋팅
				for(var i in scoreList){
					// 에피소드 별 점수 셋팅
					var scoreVariable = eval(scoreList[i].state+"_rs");
					scoreVariable = scoreList[i].score;
					
					// clearStudy variable 셋팅
					var selfStudyResult = eval(scoreList[i].state+"_sscheck");
					var privateAResult = eval(scoreList[i].state+"_plAcheck");
					var privateBResult = eval(scoreList[i].state+"_plBcheck");
					if(0 < scoreList[i].clearStudy && scoreList[i].clearStudy < 2){
						selfStudyResult = true;
					}else if(2 < scoreList[i].clearStudy-1 && scoreList[i].clearStudy-1 < 4){
						privateAResult = true;
					}else if(scoreList[i].clearStudy % 4 >= 2){
						privateBResult = true;
					}else{
						selfStudyResult = false;
					}
				}//for
				
			}// success if
		}// onload
		xhr.open("post", "/"+ctx+"/getGameCharInfo", true); // xmlHttp로 접근할 컨트롤러
		xhr.send();
	}// getGameChar
	
	/* 스크립트 로딩 */
	function getScript() {
		var xhr = new XMLHttpRequest(); // 비동기 통신용 xmlHttp선언
		xhr.onload = function(e) {
			if (this.readyState === 4) {
				var scriptList = JSON.parse(e.target.responseText);
				var oneScript = null;
				for (var sl in scriptList) {
					oneScript = scriptList[sl];//에피소드에 관한 전체 값
					var epiScript = new Array();//전체스크립트 임시변수
					var epiScriptA = new Array();//A스크립트 임시변수
					var epiScriptB = new Array();//B스크립트 임시변수
					
					for(var os in oneScript){
						epiScript[os] = oneScript[os].syntexEng + '\n' + oneScript[os].syntexJap;
						//scriptFileNumber.set(episode[sl]+os,oneScript[os].fileName);?
						
						if(os % 2 == 0){
						epiScriptA[os] = oneScript[os].syntexJap;
						epiScriptB[os] = oneScript[os].syntexEng;
						}else{
							epiScriptA[os] = oneScript[os].syntexEng;
							epiScriptB[os] = oneScript[os].syntexJap;
						}
					}//os for
					
					totalScript.set(scriptEp[sl],epiScript);
					scriptTypeA.set(scriptEp[sl],epiScriptA);
					scriptTypeB.set(scriptEp[sl],epiScriptB);
					
				/*	console.log(sl);
					console.log(scriptEp[sl]);
					console.log(totalScript.get(scriptEp[sl]));*/
					
					/* American Village 예시
						var ok_av_script =  totalScript.get("ok_av");
						var ok_av_script_A = scriptTypeA.get("ok_av");
						var ok_av_script_B = scriptTypeA.get("ok_av");
					*/			
				}// for
			}// if
		}// onload
		xhr.open("post", "/"+ctx+"/getScript", true); // xmlHttp로 접근할컨트롤러
		xhr.send();
	}//getScript
	
	/* 보스 정보 */
	function getBoss() {
		var xhr = new XMLHttpRequest(); // 비동기 통신용 xmlHttp선언
		xhr.onload = function(e) {
			if (this.readyState === 4) {
				var bList = JSON.parse(e.target.responseText);
				for (var bl in bList) {
					bossList.set(bList[bl].state,bList[bl])
				}// for				
			}// if
		}// onload
		xhr.open("post", "/"+ctx+"/getStage", true); // xmlHttp로 접근할컨트롤러
		xhr.send();
	}//getBoss
	
	// .js 페이지
	game.state.add("boot", boot);
	game.state.add("preload", preload);
	game.state.add("mainDoor", mainDoor);
	game.state.add("prologue", prologue);
	game.state.add("japanMap", japanMap);
	game.state.add("store", store);

	// 확대지도
	game.state.add("okinawa", okinawa);
	game.state.add("kyoto", kyoto);
	game.state.add("kobe", kobe);
	game.state.add("sapporo", sapporo);
	game.state.add("tokyo", tokyo);
	
	// fieldMap
	game.state.add("ok_pp", ok_pp);
	game.state.add("tk_tt", tk_tt);
	game.state.add("fieldModule", fieldModule);
	
	// Study
	game.state.add("selfStudy", selfStudy);
	game.state.add("privateLesson", privateLesson);
	
	// Boss Round
	game.state.add("boss",boss);
	
	game.state.add("result", result);
	game.state.add("epilogue", epilogue);
	
	game.state.start("boot"); 
};
