<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
	<html>
	<head>
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>助けてヒーロー</title>
	<style>
	html { overflow: hidden; }
	body { 
		font-size: 14pt;
		font-family: 'M PLUS 1p', sans-serif; 
		background: lightgrey;
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100%;
		margin: 0 0;
	}
	canvas { 
		display: inline-block; 
		background: #202020; 
		width: 95%;
		height: 45%;
		box-shadow: 0px 0px 10px blue;
	}
	#controls {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		height: 20%;
		width: 100%;
	}
	#record { height: 15vh; }
	#record.recording { 
		background: red;
		background: -webkit-radial-gradient(center, ellipse cover, #ff0000 0%,lightgrey 75%,lightgrey 100%,#7db9e8 100%); 
		background: -moz-radial-gradient(center, ellipse cover, #ff0000 0%,lightgrey 75%,lightgrey 100%,#7db9e8 100%); 
		background: radial-gradient(center, ellipse cover, #ff0000 0%,lightgrey 75%,lightgrey 100%,#7db9e8 100%); 
	}
	#save, #save img { height: 10vh; }
	#save { opacity: 0.25;}
	#save[download] { opacity: 1;}
	#viz {
		height: 40%;
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	@media (orientation: landscape) {
		body { flex-direction: row;}
		#controls { flex-direction: column; height: 100%; width: 10%;}
		#viz { height: 100%; width: 90%;}
	}

	</style>
	<c:if test="${errorMsg != null}">
	<script type="text/javascript">
		alert("${errorMsg}");

	</script>
</c:if>
</head>
<body>
	<script src="resources/jquery-3.3.1.min.js"></script>
	<script src="record/js/audiodisplay.js"></script>
	<script src="record/js/recorderjs/recorder.js"></script>
	<script src="record/js/main.js"></script>
		
	<script src="phaser/lib/phaser.js"></script>  
	<script src="phaser/js/Main.js"></script>  
	<script src="js/JsVariables.js"></script>
	<script src="js/variables.js"></script><!-- fieldMap전용 전역변수 -->

	<script src="canvas/boot.js"></script> <!-- 로딩준비 -->
	<script src="canvas/preload.js"></script> <!-- 에셋로딩 -->
	<script src="canvas/mainDoor.js"></script> <!-- 로고 화면 -->
	<script src="canvas/prologue.js"></script> <!-- 프롤로그 -->
	<script src="canvas/japanMap.js"></script> <!-- 일본 전체 지도 -->
	<script src="canvas/store.js"></script> <!-- 상점 -->
	
	<!-- 확대지도 -->
	<script src="canvas/okinawa.js"></script> <!-- 오키나와 확대지도 -->
	<script src="canvas/tokyo.js"></script> <!-- 도쿄 확대지도 -->
	<script src="canvas/sapporo.js"></script> <!-- 삿포로 확대지도 -->
	<script src="canvas/kyoto.js"></script> <!-- 교토 확대지도 -->
	<script src="canvas/kobe.js"></script> <!-- 고베 확대지도 -->
	
	<!-- 필드맵 -->
	<script src="canvas/fieldMap/ok_pp.js"></script> <!-- 파인애플파크 -->
	<script src="canvas/fieldMap/tk_tt.js"></script> <!-- 도쿄타워 -->
	<script src="canvas/fieldMap/fieldModule.js"></script> <!-- 나머지 지역 필드맵 -->
	
	<!-- 학습창 -->
	<script src="canvas/selfStudy.js"></script> <!-- 첫 문장부터 끝 문장까지 다 연습하는 창 -->
	<script src="canvas/privateLesson.js"></script> <!-- A,B로 나누어 연습하는 창 -->
	
	<!-- 보스전 -->
	<script src="canvas/boss.js"></script> 
	
	<script src="canvas/result.js"></script> <!-- 보스전 결과창 -->
	<script src="canvas/epilogue.js"></script> <!-- 에필로그 창 -->

	<script src="record/js/recorderjs/recorderWorker.js"></script>
</body>
</html>
