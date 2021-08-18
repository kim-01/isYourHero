<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>パスワード再設定</title>
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
</head>
<body>
	<script type="text/javascript">
		var user = "${userId}";

		alert(user + '様のパスワード再設定が完了しました。');

		window.open('', '_self', '');
		var loc = ${pageContext.request.contextPath}/;
		loc += 'access';
		self.location = loc;
	</script>
</body>
</html>