<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>ユーザID重複チェック</title>
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
	function closeWindow()
	{
		opener.document.getElementById("userId").value = confirmId;
		self.close();
	}
	var confirmId = '';

	$(function(){	
		$(document).on("click",'#done',closeWindow);
		
		$('#check').on('click',function(){	
			var userId = $("#userId").val().trim();
			if(userId.length < 3 || userId.length >12)
			{
				alert("ユーザIDは3文字から12文字までにしてください。");
				return false;
			}

			var sendData = {"userId" : userId};
			
			$.ajax({
				method : 'POST',
				url : 'idCheck',
				data : sendData,
				success : function(resp) {
					if($('#userId').val() == resp)
					{
						var content = '<p style="font-size:13pt;">';
							content += $('#userId').val() + 'は使えません。';
							content += '</p>';
						$('#result').html(content);
					}
					else
					{
						var content = '<p style="font-size:13pt;">'; 
						content += $('#userId').val() + 'は使えます。';
						content += '</p>';
						content += '<input type="button" class="lowin-btn" id="done" value="使う">';
						confirmId = $('#userId').val();
						$('#result').html(content);
					}
				}
			});	
		});
	});

	</script>
</head>
</head>
<body>
	<div class="lowin">
		<div class="lowin-box lowin-register">
			<div class="lowin-box-inner">
				<form action="signIn" onsubmit="return vertifyCreate()" method="post" >
					<p>ユーザID重複チェック</p>
					<div class="lowin-group">
						<label>ユーザID</label> 
						<input type="text" id="userId" name="userId" autocomplete="off" class="lowin-input">
						<input type="button" id="check" class="lowin-btn" value="ユーザID重複チェック" >
					</div>
					<div class="lowin-group" id="result">				
					</div>
				</form>
			</div>
		</div>
	</div>

	<footer class="lowin-footer">
		Design By <a href="http://fb.me/itskodinger">@itskodinger</a>
	</footer>

	<script src="loginTheme/auth.js"></script>
	</body>
</html>