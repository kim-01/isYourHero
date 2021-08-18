/**
 * 공용 변수 선언 JavaScript
 */
// 프로젝트 명 바뀌어도 괜찮도록 절대경로 지정할 것
var pathCheck = location.pathname;
var pathArray = pathCheck.split('/');
var ctx = null;
for(var i in pathArray){
	ctx = pathArray[1];
}
var clearFlag = false; 					// 유저 게임 처음 플레이 여부 플래그
var scoreList = null; 					// 유저의  스테이지 클리어 결과 리스트 값
var userCharUnicode = null; 			// 유저 캐릭터 성별
//var userCharUnicode = 'female';
var scoreList; 							//유저의 스코어 전체집합

/* store.js사용 변수 */
var userCoin = 0;						// 유저 소지 코인 총액
var itemList; 							// 유저가 가지고있는 아이템 전체집합
var storeItem = new Array(); 			// 판매하는 item 목록

/** selfStudy, privateLesson, 각 Boss전에서 사용 */
var totalScript = new Map();			//전체 스크립트
var scriptTypeA = new Map();			//A를 플레이하는 경우의 스크립트
var scriptTypeB = new Map();			//B를 플레이하는 경우의 스크립트
var bossList = new Map();				//보스의 정보
var bossResult;							//최종 결과값 평균 추후 전역변수 추가예정

/** fieldModule용 variable */
var field_map_plAcheck;
var field_map_plBcheck;
var field_map_sscheck;
var field_map_lastStep;

var current_spot = null;

//random seed
var seed_max;//최대값
var seed_min;//최소값

// 각 에피소드의 번호 계산을 위함 
// ex) okinawa stage에는 0,1,2,3까지 4개의 에피소드가 존재함
// 보스 라운드는 이전까지의 4개의 에피소드를 랜덤으로 플레이
var ok_seed_min = 0;
var ok_seed_max = 4;
var kb_seed_min = 4;
var kb_seed_max = 8;
var sp_seed_min = 8;
var sp_seed_max = 12;
var kt_seed_min = 12;
var kt_seed_max = 16;
var tk_seed_min = 16;
var tk_seed_max = 20;

//없앨 것!
//var scriptFileNumber = new Array();		//에피소드 당 mp3 파일이름
var bossTypeA_1;
var bossTypeB_1;
var bossTypeA_2;
var bossTypeB_2;

/* 현재 플레이 스테이지 특정하는 변수 */
var placeName = null; 					// japanMap에서 이동시 사용할 변수
var episodeKey = null; 					// selfStudy, privateLesson, result의 배경화면 설정
var stageName = null;					// 스테이지 이름 일본어로 저장

/** 각 스테이지 결과
 * false = fail / true = clear */
var okinawaResult = false;
var kobeResult = false;
var kyotoResult = false;
var sapporoResult = false;
var tokyoResult = false;
var totalStageResult = false; 			// 당 flag가 true이면 Epilogue 재생
var jm_mapflag = 0; 					// 각 스테이지가 클리어 될 떄마다 하나씩 카운트

/** 각 에피소드 결과 저장 변수
 * xmlHttpRequest로 불러온 각 episode의 score를 저장할 변수들  */
// 오키나와
var ok_sc_rs = 0;
var ok_mj_rs = 0;
var ok_kb_rs = 0;
var ok_av_rs = 0;
var ok_pp_rs = 0;								// 오키나와 보스전
if(ok_pp_rs != 0){
	okinawaResult = true;
}// 오키나와 보스를 이기면 okinawaResult Flag변경

// 고베
var kb_pt_rs = 0;
var kb_rs_rs = 0;
var kb_kn_rs = 0;
var kb_hc_rs = 0;
var kb_hl_rs = 0; 								// 고베 보스전
if(kb_hl_rs != 0){
	kobeResult = true;
}// 고베 보스를 이기면 kobeResult Flag변경

// 교토
var kt_kk_rs = 0;
var kt_km_rs = 0;
var kt_hm_rs = 0;
var kt_as_rs = 0;
var kt_gk_rs = 0; 								// 교토 보스전
if(kt_gk_rs != 0){
	kyotoResult = true;
}// 교토 보스를 이기면 kyotoResult Flag변경

// 삿포로
var sp_sb_rs = 0;
var sp_st_rs = 0;
var sp_ct_rs = 0;
var sp_ch_rs = 0;
var sp_op_rs = 0; 								// 삿포로 보스전
if(sp_op_rs != 0){
	sapporoResult = true;
}// 삿포로 보스를 이기면 sapporoResult Flag변경

// 도쿄
var tk_rb_rs = 0;
var tk_td_rs = 0;
var tk_od_rs = 0;
var tk_ak_rs = 0;
var tk_tt_rs = 0; 								// 도쿄 보스전
if(tk_tt_rs != 0){
	tokyoResult = true;
}// 도쿄 보스를 이기면 tokyoResult Flag변경

//에피소드 키값
var scriptEp = ["ok_av", "ok_kb", "ok_mj", "ok_sc", "kb_hc", "kb_kn", "kb_rs", "kb_pt","sp_ch", "sp_ct",
				"sp_op", "sp_st","kt_as", "kt_gk", "kt_hm", "kt_km", "tk_ak", "tk_td", "tk_od", "tk_rb"];

//보스 키값
var episode = ["ok_av", "ok_kb", "ok_mj", "ok_sc", "ok_pp", "kb_hc", "kb_kn", "kb_rs", "kb_pt", "kb_hl", "sp_ch", "sp_ct",
	"sp_op", "sp_tv","sp_sb","kt_as", "kt_gk", "kt_hm", "kt_km", "kt_kk","tk_ak", "tk_td", "tk_od", "tk_rb","tk_tt"];
