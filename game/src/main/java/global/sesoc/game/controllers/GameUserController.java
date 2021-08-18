package global.sesoc.game.controllers;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import global.sesoc.game.dto.GameChar;
import global.sesoc.game.dto.Score;
import global.sesoc.game.dto.UserItem;
import global.sesoc.game.repositories.GameCharRepository;

@Controller
public class GameUserController {
	@Autowired
	GameCharRepository repository;
	
	/**
	 * 유저 캐릭터 전체정보
	 * 매 로그인시 1회 실행
	 * @param session 접속한 해당 유저의 세션으로 이 부분에서  {@link GameChar}의 정보가 추가된다.
	 * @param rttr 에러메세지를 출력하기 위한 일시적 속성값
	 * @since JDK 1.8 10.3일자 최신화
	 * @todo 재발 이제 코인, 아이템 목록 등은 session에서 gameChar값에서 뽑아주세요 ㅠㅠ<br>
	 * 저도 좀 살려주세요 from 한용
	 * @return gameChar 전체정보 반환
	 */
	@ResponseBody
	@RequestMapping(value="/getGameCharInfo", method = RequestMethod.POST)
	public GameChar getGameCharInfo(RedirectAttributes rttr
								 ,HttpSession session) {
		
		String nickname = (String) session.getAttribute("nickname");
		GameChar gameChar = repository.getGameCharInfo(nickname);
		
		// 게임 케릭터 정보 불러오기 실패시
		if(gameChar == null) 
		{
			rttr.addFlashAttribute("errorMsg" , "로딩이 실패하였습니다.");
		}
		
		// 성공시
		session.setAttribute("gameChar", gameChar);
		return gameChar;
	}
	
	/**
	 * 유저의 현재 소지하고 있는 코인을 확인할 때 사용하는 함수
	 * @param session 접속한 해당 유저의 세션
	 * @since JDK 1.8 10.3일자 최신화
	 * @return int타입의 유저가 가지고있는 코인값
	 */
	@ResponseBody
	@RequestMapping(value="/getUserCoin", method = RequestMethod.POST)
	public int getUserCoin(HttpSession session) {
		GameChar gameChar = (GameChar) session.getAttribute("gameChar");
		return gameChar.getCoin();
	}
	
	/**
	 * 유저 소지 코인 총액 업데이트
	 * 아이템 구매시 + 코인획득시
	 * @param session 로그인한 유저의 {@link GameChar}전체정보를 가져오고, 
	 * 		  return전에 session으로 수정된 coin값을 페이지에 넘겨준다 
	 * @param rttr 실패시 에러메세지를 보낸다
	 * @param coin 아이템 계산이 끝난뒤의 코인
	 * @since JDK 1.8 10.3일자 최신화
	 * @return 실패시 -1 성공시 0
	 */
	@ResponseBody
	@RequestMapping(value="/updateTotalCoin", method = RequestMethod.POST)
	public int updateTotalCoin(RedirectAttributes rttr
								 ,HttpSession session
								 ,@RequestBody String coin) {
		GameChar gameChar = (GameChar) session.getAttribute("gameChar");
		gameChar.setCoin(Integer.parseInt(coin));
		
		int result = repository.updateTotalCoin(gameChar);
		if(result == 0) {
			// 실패시
			rttr.addFlashAttribute("errorMsg" , "아이템 구매가 실패하였습니다.");
			return -1;
		}
		
		// 성공시
		session.removeAttribute("gameChar"); // 이전 게임 케릭터 정보 삭제
		session.setAttribute("gameChar", gameChar); // 새로운 게임 케릭터 정보추가  	
		return gameChar.getCoin();
	}
	
	
	/**
	 * 유저 소지 아이템 리스트 수정 (아이템 구매시)
	 * @param HttpSession에서 로그인한 유저의 nickname을 가져오고, 
	 * 		  return전에 session으로 수정된 itemList를 페이지에 넘겨준다 
	 * @param RedirectAttributes로 실패시 에러메세지를 보낸다
	 * @since JDK 1.8 10.3 일자 최신화
	 * @return 게임 페이지로 돌아간다.
	 */
	@ResponseBody
	@RequestMapping(value="/updateUserItemList", method = RequestMethod.POST)
	public ArrayList<UserItem> updateUserItemList(@RequestBody String itemUnicode
									,HttpSession session
									,RedirectAttributes rttr) {
		String nickname = (String) session.getAttribute("nickname");
		UserItem userItem = new UserItem();
		userItem.setItemUnicode(itemUnicode);
		userItem.setNickname(nickname);
		GameChar gameChar = (GameChar) session.getAttribute("gameChar");
		ArrayList<UserItem> haveItem = gameChar.getHaveItem();
		
		int size = haveItem.size();
		int result = 0;
		int i;
		//아이템 목록이 있는지 확인
		for(i = 0; i < size; i++)
		{
			//아이템이 있을 때
			if(haveItem.get(i).getItemUnicode().equals(itemUnicode))
			{
				int itemCount = haveItem.get(i).getItemCount()+1;
				userItem.setItemCount(itemCount);
				result = repository.updateUserItem(userItem);
				break;
			}
		}
		//아이템이 목록에 없을 때
		if(i == size)
		{
			userItem.setItemCount(1);
			result = repository.createUserItem(userItem);
		}
		
		//업데이트 실패시
		if(result == 0) {
			// 실패시
			rttr.addFlashAttribute("errorMsg" , "아이템 구매가 실패하였습니다.");	
		}
		
		// 성공시
		session.removeAttribute("gameChar");
		gameChar = repository.getGameCharInfo(nickname);
		
		if(gameChar == null) {
			// 실패시
			rttr.addFlashAttribute("errorMsg" , "로딩이 실패하였습니다.");	
		}

		session.setAttribute("gameChar", gameChar); // 아이템 리스트
		return null;
	}
	
	/**
	 * 유저 소지 아이템 리스트 수정 (아이템 사용시)
	 * @param HttpSession에서 로그인한 유저의 nickname을 가져오고, 
	 * 		  return전에 session으로 수정된 itemList를 페이지에 넘겨준다 
	 * @param RedirectAttributes로 실패시 에러메세지를 보낸다
	 * @since JDK 1.8 10.3 일자 최신화
	 * @return 게임 페이지로 돌아간다.
	 */
	@ResponseBody
	@RequestMapping(value="/useUserItemList", method = RequestMethod.POST)
	public ArrayList<UserItem> useUserItemList(@RequestBody String itemUnicode
									,HttpSession session
									,RedirectAttributes rttr) {
		String nickname = (String) session.getAttribute("nickname");
		UserItem userItem = new UserItem();
		userItem.setItemUnicode(itemUnicode);
		userItem.setNickname(nickname);
		GameChar gameChar = (GameChar) session.getAttribute("gameChar");
		ArrayList<UserItem> haveItem = gameChar.getHaveItem();
		
		int size = haveItem.size();
		int result = 0;
		int i;
		//아이템 목록이 있는지 확인
		for(i = 0; i < size; i++)
		{
			//아이템이 있을 때
			if(haveItem.get(i).getItemUnicode().equals(itemUnicode))
			{
				int itemCount = haveItem.get(i).getItemCount()-1;
				userItem.setItemCount(itemCount);
				result = repository.updateUserItem(userItem);
				break;
			}
		}
		//업데이트 실패시
		if(result == 0) {
			// 실패시
			rttr.addFlashAttribute("errorMsg" , "아이템 구매가 실패하였습니다.");	
		}
		
		// 성공시
		session.removeAttribute("gameChar");
		gameChar = repository.getGameCharInfo(nickname);
		
		if(gameChar == null) {
			// 실패시
			rttr.addFlashAttribute("errorMsg" , "로딩이 실패하였습니다.");	
		}

		session.setAttribute("gameChar", gameChar); // 아이템 리스트
		return repository.getUserItemList(nickname);
	}
	
	/**
	 * 유저 스테이지 클리어 정보 수정
	 * 스테이지 클리어 후 점수계산 화면과 함께 실행
	 * @param HttpSession에서 로그인한 유저의 nickname을 가져오고, 
	 * 		  return전에 session으로 수정된 점수를 페이지에 넘겨준다 
	 * @param RedirectAttributes로 실패시 에러메세지를 보낸다
	 * @return 게임 페이지로 돌아간다.
	 */
	@ResponseBody
	@RequestMapping(value="/updateUserScore", method = RequestMethod.POST)
	public ArrayList<Score> updateUserScore(@RequestBody String bossResult
			 					 ,HttpSession session
			 					,RedirectAttributes rttr) {
		Score score = new Score();
		String nickname = (String) session.getAttribute("nickname");
		score.setNickname(nickname);
		score.setState(bossResult.substring(0, 4));
		score.setScore(Integer.parseInt(bossResult.substring(5)));
		int result = repository.updateUserScore(score);
		
		if(result == 0) {
			// 실패시
			rttr.addFlashAttribute("errorMsg" , "로딩이 실패하였습니다.");
		}
		
		//성공시
		ArrayList<Score> gameScore = repository.getUserScoreList(nickname);
		GameChar gameChar = (GameChar) session.getAttribute("gameChar");
		session.removeAttribute("gameChar"); // 이전 결과 기록 삭제
		gameChar.setGameScore(gameScore);
		session.setAttribute("gameChar", gameChar); // 수정된 결과 기록 업데이트
		
		return gameScore;
	}
	
	/**
	 * 유저 스테이지 스터디 정보 수정
	 * 유저가 스터디를 한번이라고 끝까지 실행하면 클리어 한 것으로 인식
	 * @param HttpSession에서 로그인한 유저의 nickname을 가져오고, 
	 * 		  return전에 session으로 수정된 점수를 페이지에 넘겨준다 
	 * @param RedirectAttributes로 실패시 에러메세지를 보낸다
	 * @return 게임 페이지로 돌아간다.
	 */
	@ResponseBody
	@RequestMapping(value="/updateUserStudy", method = RequestMethod.POST)
	public ArrayList<Score> updateUserStudy(@RequestBody String clearStudy
			 					 ,HttpSession session
			 					,RedirectAttributes rttr) {
		Score score = new Score();
		String nickname = (String) session.getAttribute("nickname");
		score.setNickname(nickname);
		score.setState(clearStudy.substring(0, 5));
		
		if(clearStudy.substring(5) == "S") {
			score.setClearStudy(1);
		}else if(clearStudy.substring(5) == "A") {
			score.setClearStudy(2);
		}else if(clearStudy.substring(5) == "B") {
			score.setClearStudy(4);
		}else {
			score.setClearStudy(0);
		}
		
		int result = repository.updateUserStudy(score);
		
		if(result == 0) {
			// 실패시
			rttr.addFlashAttribute("errorMsg" , "로딩이 실패하였습니다.");
		}
		
		//성공시
		ArrayList<Score> gameScore = repository.getUserScoreList(nickname);
		GameChar gameChar = (GameChar) session.getAttribute("gameChar");
		session.removeAttribute("gameChar"); // 이전 결과 기록 삭제
		gameChar.setGameScore(gameScore);
		session.setAttribute("gameChar", gameChar); // 수정된 결과 기록 업데이트
		
		return gameScore;
	}
}
