package global.sesoc.game.dto;

import java.io.Serializable;

public class Item  implements Serializable{
	private String itemUnicode;
	private String itemName;
	private String itemComment;
	private String imgName;
	private int price;
	
	public Item() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getItemUnicode() {
		return itemUnicode;
	}

	public void setItemUnicode(String itemUnicode) {
		this.itemUnicode = itemUnicode;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemComment() {
		return itemComment;
	}

	public void setItemComment(String itemComment) {
		this.itemComment = itemComment;
	}

	public String getImgName() {
		return imgName;
	}

	public void setImgName(String imgName) {
		this.imgName = imgName;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "Item [itemUnicode=" + itemUnicode + ", itemName=" + itemName + ", itemComment=" + itemComment
				+ ", imgName=" + imgName + ", price=" + price + "]";
	}
}
