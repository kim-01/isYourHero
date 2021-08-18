<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>ログイン/会員登録</title>
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
	<link rel="stylesheet" href="loginTheme/auth.css">
	<!-- jquery lib -->
	<script src="resources/jquery-3.3.1.min.js"></script>
	
	 <c:if test="${header.msg != null}">
    <script type="text/javascript">
    	alert("${msg}");
    </script>
	</c:if>
	
	<!-- 
		userId : 3글자 이상 12글자 이하
		userPwd : 6글자 이상 16글자 이하, 특수문자 포함
		nickname : 1글자 이상 20글자 이하
		email : 30글자 이하(형식은 input에서 알아서)
	 -->
	<script type="text/javascript">	
	function vertifyCreate()
	{		
		var userId = $('#userId').val().trim();
		var userPwd = $('#userPwd').val().trim();
		var nickname = $('#nickname').val().trim();
		var email = $('#email').val().trim();
		
		if(userId == '')
		{
			alert("ユーザIDの重複チェックをしてください。");
			return false;
		}
		if($('#userPwd').val() != $('#userPwdConfirm').val() || $('#userPwd').val().trim() == '')
		{
			alert("パスワードをもう一度確認してください。");
			return false;
		}
		//문자,특수문자,숫자포함 최소 6자리 비밀번호 유효성 check
		if(!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/.test(userPwd)))
		{
			alert("パスワードは半角英数字、特種文字を含めて最低6文字以上にしてください。");
			return false;
		}
		if($('#nickname').val() == '')
		{
			alert("ゲームで使うニックネームを入力してください。");
			return false;
		}
		if($('#email').val() == '')
		{
			alert("メールアドレスを入力してください。");
			return false;
		}
	}
	function vertifyLogin()
	{		
		var h = Auth.vars.lowin_login.querySelector('form').getAttribute('action');
		document.getElementById('type').value = h;
		if($('#userIdL').val().trim() == '')
		{
			alert("ユーザIDを入力してください。");
			return false;
		}
		if($('#userPwdL').val().trim() == '' && h != '#forgot')
		{
			alert("パスワードを入力してください。");
			return false;
		}
	}
	function idCheck()
	{
		/* window.open(서버에 요청 할 메소드, 창ID, 창위치) */
		window.open("idCheck","ユーザIDチェック","top=45% left=45%, height=500px, width=470px, status=no, location=no");	
	}
	function charSelect()
	{
		/* window.open(서버에 요청 할 메소드, 창ID, 창위치) */
		window.open("charSelect","キャラクター選択","top=60% left=100%, height=630px, width=700px, status=no, location=no");	
	}
	function emailCheck()
	{
		/* window.open(서버에 요청 할 메소드, 창ID, 창위치) */
		window.open("emailCheck","メールアドレスチェック","top=45% left=45%, height=500px, width=470px, status=no, location=no");	
	}
	function readyToSend()
	{
		var t = Auth.vars.lowin_login.querySelector('form').getAttribute('action');
		document.getElementById('type').value = t;
	}
	function join(){
		var userId   = $("#userId").val();
		var userPwd  = $("#userPwd").val();
		var nickname = $("#nickname").val();
		var email = $("#email").val();
		var charCode = $("#charCode").val();
		
		var sendData = {};
		
		sendData = { 
				"userId" : userId,
				"userPwd" : userPwd,
				"nickname" : nickname,
				"email" : email,
				"charUnicode" : charCode
			};
		
		$.ajax({
			type : "post",
			url : "signIn",
			data : JSON.stringify(sendData), //무조건 JSON.stringify
			dataType : "text",
			contentType : 'application/json; charset=utf-8',
			success : function(result){
				if(result == "success"){
					alert("メール文中のURLをクリックして認証を完了してください。");
					//해당 프로젝트의 root page의 이름을 적는다.
					location.href = ${pageContext.request.contextPath}/;
				}
				else if(result == "fail"){
					alert("ユーザIDとパソワード、そしてニックネームを改めて確認お願いします。");
				}
				else
				{
					alert("メールアドレがアカウントと一致しません。");
				}
			}//success
			,error : function(result){
				alert("エラー")
			}
		});//ajax
	}
	</script>
	<c:if test="${msg != null}">
    <script type="text/javascript">
    	alert("${msg}");
    </script>
	</c:if>
</head>
<body>
	<div class="lowin">
		<div class="lowin-brand">
			<img src="loginTheme/kodinger.jpg" alt="logo">
		</div>
		<div class="lowin-wrapper">
			<div class="lowin-box lowin-login">
				<div class="lowin-box-inner">
					<form action="access" method="post" onsubmit="return vertifyLogin()">
						<input type="hidden" id="type" name="type" value="">
						<p>ログイン</p>
						<div class="lowin-group">
							<label>ユーザID <a href="#" class="login-back-link">ログインしますか?</a></label>
							<input type="text" autocomplete="off" id="userIdL" name="userId" class="lowin-input">
						</div>
						<div class="lowin-group password-group">
							<label>パスワード<a href="#" class="forgot-link">パスワード再設定</a></label>
							<input type="password" id="userPwdL" name="userPwd" autocomplete="off" class="lowin-input">
						</div>
						<button class="lowin-btn login-btn" onclick="readyToSend()">
							ログイン
						</button>
						<div class="text-foot">
							アカウントがない方? <a href="" class="register-link">会員登録</a>
						</div>
					</form>
				</div>
			</div>

			<div class="lowin-box lowin-register">
				<div class="lowin-box-inner">
					<form action="signIn" onsubmit="return vertifyCreate()" method="post" >
					<div class="lowin-group">
						<input type="hidden" id="charCode" name="charUniode" class="lowin-input">
						<input type="hidden" id="nickname" name="nickname" class="lowin-input">
					</div>
						<p>会員情報の入力</p>
						<div class="lowin-group">
							<label>ユーザID</label>
							<input type="text" id="userId" name="userId" autocomplete="off" class="lowin-input" readonly="readonly">
							<input type="button" class="lowin-btn" value="ユーザID重複チェック" onclick="idCheck()">
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
							<label>キャラクター生成</label>
							<input type="text" id="charView" name="charView" readonly="readonly" class="lowin-input">
							<input type="button" class="lowin-btn" value="キャラクター選択" onclick="charSelect()">
						</div>
						<div class="lowin-group">
							<label>メールアドレス</label>
							<input type="email" id="email" name="email" readonly="readonly" class="lowin-input">
							<input type="button" class="lowin-btn" value="メールアドレ重複/有効性検査" onclick="emailCheck()">
						</div>
						<input type="button" class="lowin-btn" value="会員登録" onclick="join()">
						<div class="text-foot">
							アカウントがある方? <a href="" class="login-link">ログイン</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	
		<footer class="lowin-footer">
			Design By <a href="http://fb.me/itskodinger">@itskodinger</a>
		</footer>
	</div>

	<script src="loginTheme/auth.js"></script>
	<script src="resources/jquery-3.3.1.min.js"></script>
	<script>
		Auth.init({
			login_url: '#login',
			forgot_url: '#forgot'
		});
	</script>
	</body>
</html>