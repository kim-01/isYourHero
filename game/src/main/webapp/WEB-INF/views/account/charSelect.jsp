<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>キャラクタ選択</title>
<script src="resources/jquery-3.3.1.min.js"></script>
<link rel="stylesheet" href="loginTheme/auth.css">
<link href="https://fonts.googleapis.com/css?family=M+PLUS+1p|Nanum+Gothic" rel="stylesheet">
<style type="text/css">
</style>
<!-- jquery lib -->
<script type="text/javascript">
	function closeWindow()
	{
		var checked = $('input:radio[name=charCode]:checked').val();
		opener.document.getElementById("charCode").value = checked;
		if(checked == 'male')
		{
			opener.document.getElementById("charView").value = '男';
		}
		else
		{
			opener.document.getElementById("charView").value = '女';
		}
		opener.document.getElementById("nickname").value = confirmNick;
		self.close();
	}
	
	function selectChar()
	{
		var selected = $(this);
		if(selected.attr("id") == 'malebtnDiv' || selected.attr("id") == 'malePicDiv')
		{
			$('#maleBtn').prop('checked',true);
			$('#malePicDiv').css('opacity','1');
			$('#maleGif').css('opacity','1');
			$('#maleGif').prop('src','characters/man.gif');
			$('#malePicDiv').css('border','3px solid #bebebe');
			
			$('#femalePicDiv').css('opacity','0.3');
			$('#femaleGif').prop('src','characters/femalestop.png');
			$('#femalePicDiv').css('border','');
		}
		else if(selected.attr("id") == 'femalebtnDiv' || selected.attr("id") == 'femalePicDiv')
		{
			$('#femaleBtn').prop('checked',true);
			$('#femalePicDiv').css('opacity','1');
			$('#femaleGif').css('opacity','1');
			$('#femaleGif').prop('src','characters/woman.gif');
			$('#femalePicDiv').css('border','3px solid #bebebe');
			
			$('#malePicDiv').css('opacity','0.3');
			$('#maleGif').prop('src','characters/malestop.png');
			$('#malePicDiv').css('border','');
		}
	}
	
	var confirmId = '';

	$(function(){	
		$('#femalePicDiv').css('opacity','0.3')
		$('#maleGif').css('opacity','1');
		$('#malePicDiv').css('border','3px solid #bebebe');
		$(document).on("click",'#done',closeWindow);
		$(document).on("click",'.Container',selectChar);
		
		$('#check').on('click',function(){	
			var nickname = $('#nickname').val().trim();
			if(nickname.length < 1 || nickname.length >20)
			{
				alert("ニックネームは 20文字を超えないようにしてください。");
				return false;
			}
			
			var sendData = {"nickname" : nickname};
			
			$.ajax({
				method : 'POST',
				url : 'nickCheck',
				data : sendData,
				success : function(resp) {
					if($('#nickname').val() == resp)
					{
						var content = '<p style="font-size:13pt;">';
						content += $('#nickname').val() + 'は使えません。';
						content += '</p>';
						$('#result').html(content);
					}
					else
					{
						var content = '<p style="font-size:13pt;">';
						content += $('#nickname').val() + 'は使えます。';
						content += '</p>';
						content += '<input type="button" class="lowin-btn" id="done" value="確認">';
						confirmNick = $('#nickname').val();
						$('#result').html(content);
					}
				}
			});	
		});
	});

	</script>
<style type="text/css">
/* original
	img.pngFile{
    	width: 75px;
    	height: 120px;
    	padding: 5px;
    	border: 1px; 
	}
	img.gifFile{
    	width: 90px;
    	height: 120px;
    	padding: 5px;
    	border: 1px; 
	} */
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

img.pngFile {
	width: 150px;
	height: 240px;
	padding: 5px;
	border: 1px;
}

img.gifFile {
	width: 72px;
	height: 96px;
	padding: 5px;
	border: 1px;
	opacity: 0.3;
}

div.Container {
	display: inline-block;
	width: 250px;
}

p {
	font-size: 13pt;
}
</style>
</head>
</head>
<body>
	<div class="lowin">
		<div class="lowin-box lowin-register">
			<div class="lowin-box-inner">
				<p>キャラクター生成</p>
				<div class="lowin-group">
					<div style="text-align: center;">
						<div id="malePicDiv" class="Container">
							<img class="pngFile" alt="male"
								src="characters/malestand.png"> <img id="maleGif"
								class="gifFile" alt="male" src="characters/man.gif">
						</div>
						<div id="femalePicDiv" class="Container">
							<img class="pngFile" alt="female"
								src="characters/femalestand.png"> <img id="femaleGif"
								class="gifFile" alt="female" src="characters/femalestop.png">
						</div>
					</div>
					<div style="text-align: center;">
						<div id="malebtnDiv" class="Container" style="opacity: 0">
							<input type="radio" id="maleBtn" name="charCode"
								value="male" checked="checked">
							<!-- <p style="display: inline-block;">남자</p> -->
						</div>
						<div id="femalebtnDiv" class="Container" style="opacity: 0">
							<input type="radio" id="femaleBtn" name="charCode"
								value="female">
							<!-- <p style="display: inline-block;">여자</p> -->
						</div>
					</div>
					<div class="lowin-group">
						<label style="display: inline-block; width: 50px;">ニックネーム</label>
						 <input type="text" id="nickname" name="nickname" autocomplete="off" class="lowin-input"  style="display: inline-block; width: 400px;">
						<input type="button" id="check" class="lowin-btn" value="キャラクター生成" style="display: inline-block; width: 150px;">
					</div>
					<div class="lowin-group" id="result"></div>
				</div>
			</div>
		</div>
	</div>

	<footer class="lowin-footer">
		Design By <a href="http://fb.me/itskodinger">@itskodinger</a>
	</footer>
	<script src="loginTheme/auth.js"></script>
	</body>
</html>