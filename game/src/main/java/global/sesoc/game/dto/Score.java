package global.sesoc.game.dto;

import java.io.Serializable;

public class Score  implements Serializable{
	private String nickname;
	private String state;
	private int score;
	private int clearStudy;
	
	public Score() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getClearStudy() {
		return clearStudy;
	}

	public void setClearStudy(int clearStudy) {
		this.clearStudy = clearStudy;
	}

	@Override
	public String toString() {
		return "Score [nickname=" + nickname + ", state=" + state + ", score=" + score + ", clearStudy=" + clearStudy
				+ "]";
	}
}
