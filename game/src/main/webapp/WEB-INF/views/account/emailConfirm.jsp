<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>メールアドレス確認</title>
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

		alert(user + '様の会員登録が完了しました。ログインしてください。');

		window.open('', '_self', '');
		self.location = ${pageContext.request.contextPath}/;
		</script>
</body>
</html>