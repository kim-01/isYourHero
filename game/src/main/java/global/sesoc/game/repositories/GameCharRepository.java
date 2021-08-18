package global.sesoc.game.repositories;

import java.util.ArrayList;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import global.sesoc.game.dto.GameChar;
import global.sesoc.game.dto.Score;
import global.sesoc.game.dto.UserItem;

@Repository
public class GameCharRepository {
	@Autowired
	SqlSession session;
	
	/**
	 * {@link GameChar}의 전체정보 저장 
	 * 매 로그인시 1회 실행
	 * @param nickname String타입의 유저의 정보
	 * @since JDK 1.8 10.3 일자 최신화
	 * @return 성공시 전체정보가 들어간 GameChar 객체 반환, 아닐시 null반환
	 */
	public GameChar getGameCharInfo(String nickname) {
		GameCharMapper mapper = session.getMapper(GameCharMapper.class);
		GameChar gameChar = mapper.getGameCharInfo(nickname);
		gameChar.setHaveItem(mapper.getUserItemList(nickname));
		gameChar.setGameScore(mapper.getUserScoreList(nickname));
		return gameChar;
	}
	
	/**
	 * 유저 소지 코인 총액 업데이트에 관한 메소드(coin만 변경가능)
	 * @param gameChar {@link GameChar}타입의 객체.
	 * 변경할 정보만 가지고있다.
	 * @return 성공시 1, 실패시 0
	 */
	public int updateTotalCoin(GameChar gameChar) {
		GameCharMapper mapper = session.getMapper(GameCharMapper.class);
		return mapper.updateTotalCoin(gameChar);
	}
	
	/**
	 * 유저 소지 아이템 리스트
	 * @param nickname String 타입의 정보를 통해 유저의 아이템 리스트를 가져온다.
	 * @return 실패시 null, 성공시 전체정보가 들어간  {@link UserItem}타입의 list 반환
	 */
	public ArrayList<UserItem> getUserItemList(String nickname){
		GameCharMapper mapper = session.getMapper(GameCharMapper.class);
		return mapper.getUserItemList(nickname);
	}
	
	/**
	 * 유저 소지 아이템 리스트 업데이트에 관한 메소드(haveItem만 변경가능)
	 * 매 로그인시 1회 실행, 아이템 구매/사용후 결과화면에서 일괄처리
	 * @param userItem {@link UserItem}타입의 객체.
	 * 변경할 정보만 가지고있다.
	 * @return 성공시 1, 실패시 0
	 */
	public int updateUserItem(UserItem userItem) {
		GameCharMapper mapper = session.getMapper(GameCharMapper.class);
		return mapper.updateUserItem(userItem);
	}
	
	/**
	 * 유저 스테이지 클리어 여부 + 점수
	 * 매 로그인시 1회 실행, 매 스테이지 클리어 정보 수정시 실행
	 * @param nickname String타입의 유저의 닉네임.
	 * @return 실패시 null, 성공시 전체정보가 들어간  {@link Score}타입의 list 반환
	 */
	public ArrayList<Score> getUserScoreList(String nickname){
		GameCharMapper mapper = session.getMapper(GameCharMapper.class);
		return 	mapper.getUserScoreList(nickname);
	}
	
	/**
	 * 유저 스테이지 클리어 정보 업데이트에 관한 메소드(gameScore만 변경가능)
	 * 스테이지 클리어 후 점수계산 화면과 함께 실행
	 * @param score {@link Score}타입의 객체.
	 * 변경할 정보만 가지고있다.
	 * @return 성공시 1, 실패시 0
	 */
	public int updateUserScore(Score score) {
		GameCharMapper mapper = session.getMapper(GameCharMapper.class);		
		return mapper.updateUserScore(score);
	}
	/**
	 * 회원 가입시 전체 스테이지 셋팅하는 메소드
	 * @param score (@link Score)타입의 객체 (가입 후 바로 로그인 하지 않으면 전체 null값으로 생성)
	 * @return 성공시 1, 실패시 0
	 */
	public int defaultStageSetting(Score score) {
		GameCharMapper mapper = session.getMapper(GameCharMapper.class);
		return mapper.defaultStageSetting(score);
	}

	/**
	 * 회원 가입시 캐릭터 생성 메소드
	 * @param gameChar (@link GameChar)타입의 객체 
	 * @return 성공시 1, 실패시 0
	 */
	public int createChar(GameChar gameChar) {
		GameCharMapper mapper = session.getMapper(GameCharMapper.class);
		return mapper.createChar(gameChar);
	}
	
	/**
	 * 유저가 가지고 있는 아이템 중 새로운 종류의 아이템을 구매했을 때
	 * @param userItem {@link UserItem}타입의 하나의 아이템 종류. 갯수는 1개이다.
	 * @since JDK 1.8 10.3 일자 최신화
	 * @return 실패시 0, 성공시 1
	 */
	public int createUserItem(UserItem userItem) {
		GameCharMapper mapper = session.getMapper(GameCharMapper.class);
		return mapper.createUserItem(userItem);
	}

	/**
	 * 유저가 스터디를 클리어(처음부터 끝까지 진행)했는지를 알아보는 함수
	 * 스터디클리어 정보 수정시 실행(1 = private lesson, 2 = selfstudy A, 4 = selfstudy B)
	 * @param score .
	 * @return 실패시 null, 성공시 전체정보가 들어간  {@link Score}타입의 list 반환
	 */
	public int updateUserStudy(Score score) {
		GameCharMapper mapper = session.getMapper(GameCharMapper.class);
		return mapper.updateUserStudy(score);
	}
}
