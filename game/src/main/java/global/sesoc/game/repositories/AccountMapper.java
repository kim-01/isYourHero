package global.sesoc.game.repositories;

import java.util.ArrayList;

import global.sesoc.game.dto.Account;
import global.sesoc.game.dto.Stage;

public interface AccountMapper 
{
	public int createAccount(Account account);
	public int createAuthKey(Account account);
	public int userAuth(Account account);
	public int updateAccount(Account account);
	public Account idCheck(Account account);
	public int deleteAccount(Account account);
	public int defaultStageSetting(ArrayList<Stage> stageList);
}
