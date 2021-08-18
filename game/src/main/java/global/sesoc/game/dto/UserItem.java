package global.sesoc.game.dto;

import java.io.Serializable;

public class UserItem  implements Serializable{
	private String nickname;
	private String itemName;
	private String itemUnicode;
	private int itemCount;
	
	public UserItem() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemUnicode() {
		return itemUnicode;
	}

	public void setItemUnicode(String itemUnicode) {
		this.itemUnicode = itemUnicode;
	}

	public int getItemCount() {
		return itemCount;
	}

	public void setItemCount(int itemCount) {
		this.itemCount = itemCount;
	}

	@Override
	public String toString() {
		return "UserItem [nickname=" + nickname + ", itemName=" + itemName + ", itemUnicode=" + itemUnicode
				+ ", itemCount=" + itemCount + "]";
	}
}
