package global.sesoc.game.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import global.sesoc.game.dto.Item;
import global.sesoc.game.dto.Script;
import global.sesoc.game.dto.Stage;
import global.sesoc.game.repositories.StageRepository;

@Controller
public class StageController {
	
	private final String[] EPISODE = 
		{ "ok_av", "ok_kb", "ok_mj", "ok_sc", "kb_hc", "kb_kn",	"kb_rs", "kb_pt", "sp_ch", "sp_ct", "sp_op", "sp_st",
		 "kt_as", "kt_gk", "kt_hm", "kt_km", "tk_ak", "tk_td", "tk_od", "tk_rb" };
	@Autowired
	StageRepository stageRepository;

	/**
	 * 에피소드별로 대사를 저장한다.<br>
	 * 대사는 총 6줄이다.
	 * @since JDK 1.8 10.3일자 최신화
	 * @return 에피소드별로 게임에 사용될 전체 스크립트
	 */
	@ResponseBody
	@RequestMapping(value = "/getScript", method = RequestMethod.POST)
	public ArrayList<ArrayList<Script>> getStageInfo() {

		ArrayList<ArrayList<Script>> slist = new ArrayList<ArrayList<Script>>();

		//전체 스테이지
		int size = EPISODE.length;
		//각 스테이지별로 분류
		for (int i = 0; i < size; i++) {
			ArrayList<Script> list = stageRepository.getScript(EPISODE[i]);
		
			//텍스트 대체
			for (int j = 0; j < list.size(); j++) {
				list.get(j).setSyntexEng(list.get(j).getSyntexEng().replace("\\u0027","'"));
			}
			
			//에피소드별 대사 추가
			slist.add(list);
		}
		return slist;
	}
	
	/**
	 * 스테이지 보스 및 졸짜의 정보를 가져온다
	 * @return {@link Stage}타입의 ArrayList를 반환
	 */
	@ResponseBody
	@RequestMapping(value = "/getStage", method = RequestMethod.POST)
	public ArrayList<Stage> getAllStage() {

		ArrayList<Stage> list = stageRepository.getStage();

		return list;
	}
	
	/****************************************store*******************************************************/
	
	/**
	 * 상점에 들어갔을 시 전체 아이템 정보
	 * @since JDK 1.8 10.3일자 최신화
	 * @return Item타입의 ArrayList.
	 */
	@ResponseBody
	@RequestMapping(value = "/getItemList", method = RequestMethod.POST)
	public ArrayList<Item> getItemList() {

		ArrayList<Item> list = stageRepository.getItemList();

		return list;

	}

}
