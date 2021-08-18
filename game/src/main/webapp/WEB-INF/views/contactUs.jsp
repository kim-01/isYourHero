<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<!-- jQuery -->
<script src="//code.jquery.com/jquery.min.js"></script>
<!-- 합쳐지고 최소화된 최신 CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<!-- 부가적인 테마 -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
<!-- 합쳐지고 최소화된 최신 자바스크립트 -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
<title>管理者にメール</title>
</head>
<body>
<h2>問い合わせ作成</h2>
 
<div class="container">
    <form action="contactUs" method="post">
      <input type="hidden" id="to" name="to" value="admin">
      <div class="form-group">
        <label for="subject">タイトル</label>
        <input type="text" class="form-control" id="subject" name="subject" placeholder="タイトルを入力してください。">
      </div>
      <div class="form-group">
        <label for="writer">作成者</label>
        <input type="text" class="form-control" id="from" name="from" value="${userId}" readonly="readonly">
      </div>
      <div class="form-group">
        <label for="content">内容</label>
        <textarea class="form-control" id="content" name="content" rows="10"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">登録</button>
    </form>
</div>
</body>
</html>