package global.sesoc.game.dto;

import java.io.Serializable;
import java.util.ArrayList;

public class GameChar implements Serializable {
	private String nickname;
	private String charUnicode;
	private int coin;
	private ArrayList<UserItem> haveItem;
	private ArrayList<Score> gameScore;
	
	public GameChar() { 
		super();
		// TODO Auto-generated constructor stub
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

	public int getCoin() {
		return coin;
	}

	public void setCoin(int coin) {
		this.coin = coin;
	}

	public ArrayList<UserItem> getHaveItem() {
		return haveItem;
	}

	public void setHaveItem(ArrayList<UserItem> haveItem) {
		this.haveItem = haveItem;
	}

	public ArrayList<Score> getGameScore() {
		return gameScore;
	}

	public void setGameScore(ArrayList<Score> gameScore) {
		this.gameScore = gameScore;
	}

	@Override
	public String toString() {
		return "GameChar [nickname=" + nickname + ", charUnicode=" + charUnicode + ", coin=" + coin + ", haveItem="
				+ haveItem + ", gameScore=" + gameScore + "]";
	}
}
