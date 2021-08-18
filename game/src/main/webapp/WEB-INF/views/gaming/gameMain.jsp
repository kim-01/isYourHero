<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
	<html>
	<head>
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>助けてヒーロー</title>
	<c:if test="${msg != null}">
	<script type="text/javascript">
		alert("${msg}");
	</script>
</c:if>
	<style>
	html { overflow: hidden; }
	body { 
		font-size: 14pt;
		font-family: 'M PLUS 1p', sans-serif; 
		background: white;
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100%;
		margin: 0 0;
	}
	#viz {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		z-index: 0;
	}
	#img_container {
     position:absolute;
     width:70%;
     height:60%;
     z-index: -1;
 	}
 	#img_container img {
    display:block;
    margin-left:500px;
    margin-right:auto;
    margin-top: 70px;
    border-radius: 50%;
 	}
	
	</style>
</head>
<body>
	<div id="viz">
		<a href="access">
		<img src="loginTheme/TITLElogo.png" alt="助けてヒーロー始め" style="width:840px; height:720px;">
		</a>
	</div>
	<div id="img_container">
		<img id="logo" src="phaser/assets/images/cutScences/06_ruins.png" style="width : 50%; height : 140%">
	</div>
</body>
</html>
