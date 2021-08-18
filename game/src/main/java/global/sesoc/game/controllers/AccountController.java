package global.sesoc.game.controllers;

import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import global.sesoc.game.dto.Account;
import global.sesoc.game.dto.GameChar;
import global.sesoc.game.dto.Score;
import global.sesoc.game.dto.SimpleMail;
import global.sesoc.game.dto.Stage;
import global.sesoc.game.repositories.AccountRepository;
import global.sesoc.game.repositories.GameCharRepository;
import global.sesoc.game.repositories.StageRepository;
import global.sesoc.game.services.EMailValidator;
import global.sesoc.game.services.MailService;


@Controller
public class AccountController
{
	@Autowired
	MailService mailService;
	@Autowired
	AccountRepository accountRepository;
	@Autowired
	StageRepository stageRepository;
	@Autowired
	GameCharRepository gameCharRepository;
	
	@RequestMapping(value = "/access", method = RequestMethod.GET)
	public String access() {
		
		return "account/access";
	}
	@RequestMapping(value = "/access", method = RequestMethod.POST)
	public String accessDB(Account account, String type, RedirectAttributes rttr,HttpSession session) throws Exception {
		if(type.equals("#forgot"))//비밀번호 찾기
		{
			account.setUserPwd(null);
			if(!mailService.forgotPassword(account))
			{
				rttr.addFlashAttribute("msg" , "該当するアカウントがありません。");
			}
			else
			{
				rttr.addFlashAttribute("msg" , "送られたメールのリンクをクリックしてください。");
			}
			return "redirect:/";
		}//if
		account = accountRepository.idCheck(account);
		if(account == null)//비밀번호 및 ID 불일치
		{
			rttr.addFlashAttribute("msg" , "アカウント、またはパスワードが確認できません。");
			return "redirect:/access";
		}
		else if(account.getIsConfirm() == 'N')
		{
			rttr.addFlashAttribute("msg" , "未だメール認証が終わっていません。");
			return "redirect:/";
		}
		session.setAttribute("loginId", account.getUserId());
		session.setAttribute("nickname", account.getNickname());
		return "index";
	}
	@RequestMapping(value="/idCheck", method=RequestMethod.GET)
	public String idCheck()
	{
		return "account/idCheck";
	}
	@ResponseBody
	@RequestMapping(value="/idCheck", method=RequestMethod.POST)
	public String idCheck(String userId)
	{
		Account account = new Account();
		account.setUserId(userId);
		Account acc = accountRepository.idCheck(account);
		String id = null;
		if(acc != null)
		{
			id = acc.getUserId();
		}
		return id;
	}
	@ResponseBody
	@RequestMapping(value="/nickCheck", method=RequestMethod.POST)
	public String nickCheck(String nickname)
	{
		Account account = new Account();
		account.setNickname(nickname);
		Account acc = accountRepository.idCheck(account);
		String nick = null;
		if(acc != null)
		{
			nick = acc.getNickname();
		}
		return nick;
	}
	@RequestMapping(value="/charSelect", method=RequestMethod.GET)
	public String charSelect()
	{
		return "account/charSelect";
	}
	@RequestMapping(value="/emailCheck", method=RequestMethod.GET)
	public String emailCheck()
	{
		return "account/emailCheck";
	}
	@ResponseBody
	@RequestMapping(value="/emailCheck", method=RequestMethod.POST)
	public String emailCheck(String email)
	{
		if(!EMailValidator.isAddressValid(email))
		{
			return "not valid";
		}
		Account account = new Account();
		account.setEmail(email);
		Account acc = accountRepository.idCheck(account);
		String em = null;
		if(acc != null)
		{
			em = "exist";
		}
		return em;
	}
	/**
	 * 가입 시 실행하는 메소드</br>
	 * ID : 3글자 이상 12글자 이하</br>
	 * Password : 6글자 이상 16글자 이하, 특수문자 포함</br>
	 * nickname : 1글자 이상 20글자 이하</br>
	 * email : 30글자 이하(형식은 input에서 알아서)</br>
	 * 유저의 정보를 DB에 저장하고 인증코드를 발송한다.</br>
	 * 케릭터는 남자는 male, 여자는 female의 값으로 입력된다.
	 * @param account Account타입의 가입할 유저의 정보 
	 * @return 종류는 총 3가지가 있다.
	 * 1.fail : 이메일이 올바르지 않음
	 * 2.success : 이메일이 올바르게 보내지고 가입성공
	 * 3.error : 데이터가 검증되지 않은 상태에서 보내질때
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping(value = "/signIn", method = RequestMethod.POST)
	public String signIn(@RequestBody Account account)
	{
		int idLength = account.getUserId().length();
		int pswdLength = account.getUserPwd().length();
		int nickLength = account.getNickname().length();
		int eLength = account.getEmail().length();
		ArrayList<Score> scoreList = new ArrayList<Score>();
		
		ArrayList<Stage> stageList = stageRepository.getStage();	
		int size = stageList.size();
		for(int i = 0; i < size; i++)
		{
			Score score = new Score();
			score.setState(stageList.get(i).getState());
			score.setNickname(account.getNickname());
			
			scoreList.add(score);
		}

				
		if(idLength <3 || idLength > 12 || pswdLength < 6 || pswdLength >16
				|| nickLength <1 || nickLength>20 || eLength>30)
		{
			return "error";
		}
		if(!mailService.createAccount(account) || !EMailValidator.isAddressValid(account.getEmail()))
		{
			accountRepository.deleteAccount(account);
			return "fail";
		}
		GameChar gameChar = new GameChar();
		gameChar.setNickname(account.getNickname());
		gameChar.setCharUnicode(account.getCharUnicode());
		gameCharRepository.createChar(gameChar);
		for(Score score : scoreList)
		{
			gameCharRepository.defaultStageSetting(score);
		}
		return "success";
	}
	/**
	 * 가입 후 유저가 메일을 받아 해당 링크로 들어갈 때 실행되는 메소드
	 * @param account Account타입의 가입할 유저의 정보 , email과 authCode만 들어있다.
	 * @param model 유저의 ID가 들어가있는 모델
	 * @return 이메일 축하인사 페이지로 돌아간다.
	 * @throws Exception
	 */
	@RequestMapping(value = "/emailConfirm", method = RequestMethod.GET)
	public String emailConfirm(Account account, Model model) throws Exception {
		mailService.userAuth(account);
		model.addAttribute("userId", account.getUserId());
		return "/account/emailConfirm";
	}
	
	@RequestMapping(value = "/emailChangePassword", method = RequestMethod.GET)
	public String emailChangePassword(Account account, HttpSession session, RedirectAttributes rttr) throws Exception {
		account = accountRepository.idCheck(account);
		if(account != null)
		{	session.setAttribute("idChangePassword", account.getUserId());
			return "/account/passwordChangeInput";
		}
		else
		{
			rttr.addFlashAttribute("msg", "認証のコードが満了したか、または確認できません。");
			session.invalidate();
			return "redirect:/";
		}
	}
	
	@RequestMapping(value = "/emailChangePassword", method = RequestMethod.POST)
	public String emailChangePasswordDB(Account account, Model model) throws Exception {
		mailService.userPasswordChange(account);
		model.addAttribute("userId", account.getUserId());
		return "/account/passwordChange";
	}
	
	//interceptor기능 실행(미정)
	@RequestMapping(value = "/updateAccount", method = RequestMethod.GET)
	public String updateAccount(Model model,HttpSession session, RedirectAttributes rttr) throws Exception {
		Account account = new Account();
		account.setUserId((String)session.getAttribute("loginId"));
		account = accountRepository.idCheck(account);
		model.addAttribute("account", account);
		return "/account/updateAccount";
	}
	
	//interceptor기능 실행(미정)
	@RequestMapping(value = "/updateAccount", method = RequestMethod.POST)
	public String updateAccountDB(Account account,HttpSession session,Model model, RedirectAttributes rttr) throws Exception {	
		Account cmp = new Account();
		cmp.setUserId((String)session.getAttribute("loginId"));
		cmp = accountRepository.idCheck(cmp);
		accountRepository.updateAccount(account);
		if(!cmp.getEmail().equals(account.getEmail()))
		{
			if(!mailService.sendCertificationMail(account))
			{
				rttr.addFlashAttribute("msg" , "サーバーにエラーが発生しました。");
				return "redirect:/";
			}
			account.setIsConfirm('N');
			mailService.userAuth(account);
			rttr.addFlashAttribute("msg" , "再設定したメールアドレスで認証を続けてください。");
		}
		else {
			rttr.addFlashAttribute("msg" , "改めてログインしてください。");
		}
		session.invalidate();
		return "redirect:/";
	}
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(HttpSession session)
	{
		session.invalidate();
		return "redirect:/";
	}
	@RequestMapping(value = "/contactUs", method = RequestMethod.GET)
	public String contactUs() {
		
		return "contactUs";
	}
	@RequestMapping(value = "/contactUs", method = RequestMethod.POST)
	public String contactUsMail(SimpleMail mail, RedirectAttributes rttr) throws Exception {
		Account from = new Account();
		from.setUserId(mail.getFrom());
		
		Account to = new Account();
		to.setUserId(mail.getTo());
		
		from = accountRepository.idCheck(from);
		to = accountRepository.idCheck(to);
		if(from == null || from.getEmail() == null)
		{
			rttr.addFlashAttribute("msg" , "アカウントにエラーが発生して作業を続けません。");
			return "redirect:/";
		}
		
		mail.setFrom(from.getEmail());
		mail.setTo(to.getEmail());
		mailService.sendSimpleMail(mail);
		rttr.addFlashAttribute("msg" , "貴重なご意見ありがとうございます。");
		return "redirect:/";
	}
	@RequestMapping(value = "/withdrow", method = RequestMethod.GET)
	public String withdrow() 
	{
		return "account/withdrow";
	}
	@ResponseBody
	@RequestMapping(value="/withdrow", method=RequestMethod.POST)
	public String withdrowDB(@RequestBody Map<String, Object> params, HttpSession session)
	{
		Account account = new Account();
		account.setUserId((String)(params.get("loginId")));
		account.setUserPwd((String)(params.get("userPwd")));
		account = accountRepository.idCheck(account);
		
		if(account != null)
		{
			accountRepository.deleteAccount(account);
			
			String userOp = (String) params.get("userOp");
			
			if(!userOp.isEmpty())
			{
				SimpleMail mail = new SimpleMail();
				mail.setTo("auth@isYourHero.tk");
				mail.setFrom(account.getEmail());
				mail.setSubject("退会意見");
				mail.setContent(userOp);
				try {
					mailService.sendSimpleMail(mail);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
				session.invalidate();
				return "success";
			}
		}
		
		return "serverError";
	}
}
