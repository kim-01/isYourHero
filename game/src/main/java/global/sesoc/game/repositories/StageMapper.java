package global.sesoc.game.repositories;

import java.util.ArrayList;

import global.sesoc.game.dto.Item;
import global.sesoc.game.dto.Script;
import global.sesoc.game.dto.Stage;

public interface StageMapper {
	// 스테이지 - 에피소드 녹음파일 key값 + 영문 스크립트 + 일문 스크립트
	public ArrayList<Script> getScript(String state);
	// 아이템 정보 (상점)
	public ArrayList<Item> getItemList();
	//스테이지 - 에피소드 해당 보스 정보
	public ArrayList<Stage> getStage();
	//한 스크립트 리턴
	public Script getOneScript(String key);
}
