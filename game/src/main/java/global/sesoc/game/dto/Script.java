package global.sesoc.game.dto;

import java.io.Serializable;

public class Script  implements Serializable{
	private String state;
	private String fileName;
	private String syntexEng;
	private String syntexJap;
	
	public Script() {
		super();
	}

	public Script(String state, String fileName, String syntexEng, String syntexJap) {
		super();
		this.state = state;
		this.fileName = fileName;
		this.syntexEng = syntexEng;
		this.syntexJap = syntexJap;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getSyntexEng() {
		return syntexEng;
	}

	public void setSyntexEng(String syntexEng) {
		this.syntexEng = syntexEng;
	}

	public String getSyntexJap() {
		return syntexJap;
	}

	public void setSyntexJap(String syntexJap) {
		this.syntexJap = syntexJap;
	}

	@Override
	public String toString() {
		return "Script [" + "state=" + state + ", fileName=" + fileName + ", syntexEng="
				+ syntexEng + ", syntexJap=" + syntexJap + "]";
	}
}
