<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>助けてヒーロー</title>
<c:if test="${msg != null}">
	<script type="text/javascript">
		alert("${msg}");
		
		
	</script>
</c:if>
<link rel="stylesheet" href="loginTheme/auth.css">
<link href="https://fonts.googleapis.com/css?family=M+PLUS+1p|Nanum+Gothic"
	rel="stylesheet">
<style type="text/css">
body {
	font-family: 'M PLUS 1p', sans-serif;
}
A {
	text-decoration: none;
	font-family: 'M PLUS 1p', sans-serif;
	color: #2a8eaa;
}
h1 {
	color: #2a8eaa;
	font-family: 'M PLUS 1p', sans-serif;
}
</style>
</head>
<body>
	<div class="lowin">
		<h1>助けてヒーロー</h1>
		<div class="lowin-brand">
			<img src="loginTheme/kodinger.jpg" alt="logo">
		</div>
		<div class="lowin-wrapper">
			<div class="lowin-box lowin-login">
				<div class="lowin-box-inner">
					<form>
						<!-- 로그인 하지 않은 경우 -->
						<c:if test="${sessionScope.loginId eq null}">
							<div class="lowin-group">
								<input type="button" class="lowin-btn" value="ログイン/会員登録"
									onclick="location.href='access'">
							</div>
						</c:if>

						<!-- 로그인 한 경우 -->
						<c:if test="${sessionScope.loginId ne null}">
							<div class="lowin-group" style="text-align: center;">
								<a class="forgot-link" style="font-size: 18px; font-weight: bold;">ウェルカム! ★  ${sessionScope.loginId} ★</a>
								<%-- <input type="button" class="lowin-btn"
									value="ウェルカム! ★  ${sessionScope.loginId} ★"> --%>
							</div>
							<div class="lowin-group">
								<input type="button" class="lowin-btn" value="ログアウト"
									onclick="location.href='logout'">
							</div>
							<div class="lowin-group">
								<input type="button" class="lowin-btn" value="会員情報再設定"
									onclick="location.href='updateAccount'">
							</div>
							<div class="lowin-group">
								<input type="button" class="lowin-btn" value="会員退会"
									onclick="location.href='withdrow'">
							</div>
							<div class="lowin-group">
								<input type="button" class="lowin-btn" value="ゲームプレイ"
									onclick="location.href='gameStart'">
							</div>
						</c:if>
					</form>
				</div>
			</div>
		</div>
		<footer class="lowin-footer">
			Design By <a href="http://fb.me/itskodinger">@itskodinger</a>
		</footer>
	</div>
</body>
</html>