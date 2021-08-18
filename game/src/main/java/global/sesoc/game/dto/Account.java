package global.sesoc.game.dto;

import java.io.Serializable;

public class Account implements Serializable
{
	private String userId;
	private String userPwd;
	private String email;
	private String nickname;
	private String charUnicode;
	private String authCode;
	private char isConfirm;
	
	public Account() {
		// TODO Auto-generated constructor stub
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserPwd() {
		return userPwd;
	}

	public void setUserPwd(String userPwd) {
		this.userPwd = userPwd;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getCharUnicode() {
		return charUnicode;
	}

	public void setCharUnicode(String charUnicode) {
		this.charUnicode = charUnicode;
	}

	public String getAuthCode() {
		return authCode;
	}

	public void setAuthCode(String authCode) {
		this.authCode = authCode;
	}

	public char getIsConfirm() {
		return isConfirm;
	}

	public void setIsConfirm(char isConfirm) {
		this.isConfirm = isConfirm;
	}
}
