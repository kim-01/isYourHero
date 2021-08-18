<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>会員退会</title>
	<link rel="stylesheet" href="loginTheme/auth.css">
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
	function withdrow(){
		var userId   = $("#userId").val();
		var userPwd  = $("#userPwd").val();
		var userOp  = $("#userOp").val();
		var sendData = {"userId" : userId,
				"userPwd" : userPwd,
				"userOp" : userOp};
		
		$.ajax({
			type : "post",
			url : "withdrow",
			data : JSON.stringify(sendData), //무조건 JSON.stringify
			dataType : "text",
			contentType : 'application/json; charset=utf-8',
			success : function(result){
				if(result == "success"){
					alert("今までご利用いただきありがとうございました。");
					//해당 프로젝트의 root page의 이름을 적는다.
					location.href = ${pageContext.request.contextPath}/;
				}
				else if(result == "fail"){
					alert("パスワードを確認してください。");
				}
				else
				{
					alert("サーバーが不安定です。ホームページに戻ります。");
				}
			}//success
			,error : function(result){
				alert("エラー")
			}
		});//ajax
	}
	</script>
</head>
<body>
	<div class="lowin">
		<div class="lowin-brand">
			<img src="loginTheme/kodinger.jpg" alt="logo">
		</div>
		<div class="lowin-wrapper">
			<div class="lowin-box lowin-register">
				<div class="lowin-box-inner">
					<form action="withdrow"  method="post" >
						<p>会員退会</p>
						<div class="lowin-group">
							<label>ユーザID</label>
							<input type="text" id="userId" name="userId" value="${sessionScope.loginId}" class="lowin-input" readonly="readonly">
						</div>
						<div class="lowin-group">
							<label>パスワード確認</label>
							<input type="password" id="userPwd" name="userPwd" autocomplete="off" class="lowin-input">
						</div>
						<div class="lowin-group">
							<label>意見</label>
							<textarea id="userOp" name="userOp" rows="20" cols="20" class="lowin-input" style="resize: none;"></textarea>
						</div>
						<input type="button" class="lowin-btn" value="탈퇴" onclick="withdrow()">
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