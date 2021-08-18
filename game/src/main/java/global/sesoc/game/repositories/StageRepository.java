package global.sesoc.game.repositories;

import java.util.ArrayList;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import global.sesoc.game.dto.Item;
import global.sesoc.game.dto.Script;
import global.sesoc.game.dto.Stage;

@Repository
public class StageRepository {

	@Autowired
	private SqlSession session;
	
	/**
	 * 스테이지 - 에피소드 녹음파일 key값 + 영문 스크립트 + 일문 스크립트
	 * Script VO 의 state(게임단계),fileName(해당 대사 녹음파일),syntexEng(영어 스크립트),syntexJap(일어 스크립트)에 대한 정보
	 */
	public ArrayList<Script> getScript(String state) {
		StageMapper mapper = session.getMapper(StageMapper.class);
		ArrayList<Script> list = mapper.getScript(state);
		return list;
	}
	
	public Script getOneScript(String key) {
		StageMapper mapper = session.getMapper(StageMapper.class);
		return mapper.getOneScript(key);
	}

	/**
	 * DB에 있는 {@link Stage}의 전체정보를 가져오는데 사용된다.
	 * @return 스테이지 전체 정보가 들어가있는 ArrayList<Stage>형 자료구조
	 */
	public ArrayList<Stage> getStage() {
		StageMapper mapper = session.getMapper(StageMapper.class);
		ArrayList<Stage> list = mapper.getStage();
		return list;
	}
	
	/******************************************** store *********************************************************/
	
	/**
	 * 아이템 정보 (상점)
	 * Item VO 의 itemUnicode(아이템 유니코드),itemName(아이템 이름),itemComment(아이템 설명),imgName(아이템 사진),price(아이템 가격)
	 * 에 대한 정보
	 */

	public ArrayList<Item> getItemList() {
		StageMapper mapper = session.getMapper(StageMapper.class);
		ArrayList<Item> list = mapper.getItemList();

		return list;

	}
}
