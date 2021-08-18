package global.sesoc.game.repositories;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import global.sesoc.game.dto.Account;

@Repository
public class AccountRepository
{
	@Autowired
	private SqlSession session;
	
	/**
	 * 유저의 ID생성
	 * @param account {@link Account}타입의 유저의 정보
	 * @return 실패시 1, 아닐시 0
	 */
	public int createAccount(Account account)
	{
		AccountMapper mapper = session.getMapper(AccountMapper.class);
		return mapper.createAccount(account);
	}
	
	/**
	 * 유저의 인증 키를 DB에 저장
	 * @param account {@link Account}객체, authCode를 포함한 유저의 정보. 
	 * @return 성공시 1, 실패시 0
	 */
	public int createAuthCode(Account account){
		AccountMapper mapper = session.getMapper(AccountMapper.class);
		return mapper.createAuthKey(account);
	}
	
	/**
	 * 유저의 인증 플레그를 변경하는 작업
	 * @param account {@link Account}타입의 객체, 유저의 인증코드를 이용해 로그인을 가능하게 만듬
	 * @return 성공시 1, 실패시 0
	 */
	public int userAuth(Account account){
		AccountMapper mapper = session.getMapper(AccountMapper.class);
		return mapper.userAuth(account);
	}
	
	/**
	 * 유저의 ID 중복, nickname 중복, 로그인에 필요한 정보
	 * @param {@link Account}객체의 정보를 통해 유저의 정보를 가져온다.</br>
	 * 해당 객체가 가지고있는 필드정보의 경우의 수는 다음과 같다.</br>
	 * 1. userId, password</br>
	 * 2. nickname</br>
	 * 3. email</br>
	 * @return 성공시 전체정보가 들어간 해당객체 반환, 아닐시 null반환
	 */
	public Account idCheck(Account account)
	{
		AccountMapper mapper = session.getMapper(AccountMapper.class);
		return mapper.idCheck(account);
	}
	
	/**
	 * 유저의 업데이트에 관한 메소드(password, email만 변경가능)
	 * @param account {@link Account}타입의 객체.</br>
	 * 변경할 정보만 가지고있다.</br>
	 * @return 성공시 1, 실패시 0
	 */
	public int updateAccount(Account account)
	{
		AccountMapper mapper = session.getMapper(AccountMapper.class);
		return mapper.updateAccount(account);
	}

	public int deleteAccount(Account account) {
		AccountMapper mapper = session.getMapper(AccountMapper.class);
		return mapper.deleteAccount(account);
	}
}
