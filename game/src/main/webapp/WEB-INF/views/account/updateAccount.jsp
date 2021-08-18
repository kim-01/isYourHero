<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>ユーザ情報再設定</title>
	<link rel="stylesheet" href="loginTheme/auth.css">
	<link href="https://fonts.googleapis.com/css?family=M+PLUS+1p|Nanum+Gothic" rel="stylesheet">
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
	<!-- jquery lib -->
	<script src="resources/jquery-3.3.1.min.js"></script>
	<script type="text/javascript">
	
	function vertify()
	{		
		if($('#userPwd').val() != $('#userPwdConfirm').val() || $('#userPwd').val() == '')
		{
			alert("パスワードをもう一度確認してください。");
			return false;
		}
		if($('#email').val() == '')
		{
			alert("メールアドレスを入力してください。");
			return false;
		}
	}
	function emailCheck()
	{
		<!-- window.open(서버에 요청 할 메소드, 창ID, 창위치) -->
		window.open("emailCheck","メールアドレスチェック","top=45% left=45%, height=500px, width=470px, status=no, location=no");	
	}
	</script>
</head>
</head>
<body>
		<div class="lowin">
		<div class="lowin-brand">
			<img src="loginTheme/kodinger.jpg" alt="logo">
		</div>
		<div class="lowin-wrapper">
			<div class="lowin-box lowin-register">
				<div class="lowin-box-inner">
					<form action="updateAccount" onsubmit="return vertify()" method="post" >
						<p>ユーザ情報変更</p>
						<div class="lowin-group">
							<label>ユーザID</label>
							<input type="text" id="userId" name="userId" value="${account.userId}" class="lowin-input" readonly="readonly">
						</div>
						<div class="lowin-group">
							<label>パスワード</label>
							<input type="password" id="userPwd" name="userPwd" autocomplete="off" class="lowin-input">
						</div>
						<div class="lowin-group">
							<label>パスワード確認</label>
							<input type="password" id="userPwdConfirm" name="userPwdConfirm" autocomplete="off" class="lowin-input">
						</div>
						<div class="lowin-group">
							<label>メールアドレ</label>
							<input type="email" id="email" class="lowin-input" value="${account.email}" autocomplete="off" name="email" readonly="readonly">
							<input type="button" class="lowin-btn" value="メールアドレ重複/有効性検査" onclick="emailCheck()">
						</div>
						<button class="lowin-btn">
							再設定
						</button>
					</form>
				</div>
			</div>
		</div>
		<footer class="lowin-footer">
			Design By <a href="http://fb.me/itskodinger">@itskodinger</a>
		</footer>
	</div>
	<script src="loginTheme/auth.js"></script>
	</body>
</html>