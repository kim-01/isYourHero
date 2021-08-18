package global.sesoc.game.repositories;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Param;

import global.sesoc.game.dto.GameChar;
import global.sesoc.game.dto.Score;
import global.sesoc.game.dto.UserItem;

public interface GameCharMapper {
	// 유저 캐릭터 성별 + 코인 총액 (매 로그인시 1회 실행)
	public GameChar getGameCharInfo(String nickname);
	// 유저 소지 코인 총액 업데이트(아이템 구매시 + 코인획득시)
	public int updateTotalCoin(GameChar gameChar);
	// 유저 소지 아이템 리스트
	public ArrayList<UserItem> getUserItemList(String nickname);
	// 유저 소지 아이템 리스트 수정(매 로그인시 1회 실행, 아이템 구매/사용후 결과화면에서 일괄처리)
	public int updateUserItem(UserItem gameChar);
	// 유저 스테이지 클리어 여부 + 점수(매 로그인시 1회 실행, 매 스테이지 클리어 정보 수정시 실행)
	public ArrayList<Score> getUserScoreList(String nickname);
	// 유저 스테이지 클리어 정보 수정(스테이지 클리어 후 점수계산 화면과 함께 실행)
	public int updateUserScore(Score score);
	//유저가 회원가입을 할 시 모든 스테이지의 기본값을 삽입한다.
	public int defaultStageSetting(Score score);
	//가입시 게임케릭터 생성
	public int createChar(GameChar gameChar);
	//아이템 추가
	public int createUserItem(UserItem userItem);
	//스터디 클리어시 업데이트
	public int updateUserStudy(Score score);
}
