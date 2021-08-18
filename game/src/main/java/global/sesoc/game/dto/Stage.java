package global.sesoc.game.dto;

import java.io.Serializable;

public class Stage  implements Serializable{
	private String state;
	private int maxCoin;
	private String bossName;
	private String sentence;
	
	public Stage() {
		super();
	}
	
	public Stage(String state, int maxCoin, String bossName, String sentence) {
		super();
		this.state = state;
		this.maxCoin = maxCoin;
		this.bossName = bossName;
		this.sentence = sentence;
	}

	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public int getMaxCoin() {
		return maxCoin;
	}
	public void setMaxCoin(int maxCoin) {
		this.maxCoin = maxCoin;
	}
	public String getBossName() {
		return bossName;
	}
	public void setBossName(String bossName) {
		this.bossName = bossName;
	}
	public String getSentence() {
		return sentence;
	}
	public void setSentense(String sentence) {
		this.sentence = sentence;
	}

	@Override
	public String toString() {
		return "Stage [state=" + state + ", maxCoin=" + maxCoin + ", bossName=" + bossName + ", sentence=" + sentence
				+ "]";
	}
	
}
