package global.sesoc.game.services;

import java.io.UnsupportedEncodingException;

import javax.inject.Inject;
import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import global.sesoc.game.dto.Account;
import global.sesoc.game.dto.SimpleMail;
import global.sesoc.game.repositories.AccountRepository;
import global.sesoc.game.utils.MailHandler;
import global.sesoc.game.utils.TempKey;


@Service
public class MailService
{
	@Inject
	private JavaMailSender mailSender;
	@Autowired
	private AccountRepository accountRepository;
	
	/**
	 * 생성된 계정에 메일을 보내서 인증하기 위한 서비스단
	 * 인증코드 생성 후 메일을 보내는 메소드 두가지를 실행한다.
	 * @param account {@link Account}타입의 가입한 고객의 정보
	 * @ see {@link sendCertificationMail}메소드 참고
	 */
	@Transactional
	public boolean createAccount(Account account){
		try
		{
			int result = accountRepository.createAccount(account); // 회원가입 DAO
			if(result == 0) {
				throw new Exception();
			}
			sendCertificationMail(account);//인증코드 및 인증 이메일 전송
		}catch(Exception e)
		{
			e.printStackTrace();
			return false;
		}	
		return true;
	}
	
	/**
	 * 비밀번호를 잊어버렸을 때 사용하는 이메일을 전송하는 메소드
	 * @param account 해당 이메일을 받을 {@link Account}타입의 객체
	 * @return 성공시 true, 실패시 false
	 * @throws Exception
	 */
	@Transactional
	public boolean forgotPassword(Account account) throws Exception
	{
		account.setUserPwd(null);
		account = accountRepository.idCheck(account);
		if(account == null)
		{
			return false;
		}
	
		MailHandler sendMail = new MailHandler(mailSender);
		sendMail.setSubject("[パソワード再設定]");
		sendMail.setText(
				new StringBuffer().append("<h1>メール認証</h1>")
				.append("<a href='https://www.isYourHero.tk/game/emailChangePassword?")
				.append("authCode=").append(account.getAuthCode())
				.append("&userId=").append(account.getUserId())
				.append("' target='_blenk'>パソワード再設定</a>").toString());
		sendMail.setFrom("auth@isYourHero.tk", "EnglishHero");
		sendMail.setTo(account.getEmail());
		sendMail.send();
		return true;
	}
	
	public void userAuth(Account account) throws Exception {
		accountRepository.userAuth(account);
	}
	
	public void userPasswordChange(Account account) throws Exception {
		accountRepository.updateAccount(account);//비밀번호 변경
		
		String authCode = new TempKey().getKey(50, false); // 인증키 생성
		account.setAuthCode(authCode);
		accountRepository.createAuthCode(account); // 인증키 DB저장
	}
	
	/**
	 * 회원이 가입, 이메일 정보를 변경 했을 시, 인증하기 위해 발송
	 * @param account 해당 이메일을 받을 {@link Account}타입의 객체
	 * @return 인증키 생성, 메일보내기에 실패시 false;
	 */
	public boolean sendCertificationMail(Account account)
	{
		String authCode = new TempKey().getKey(50, false); // 인증키 생성
		account.setAuthCode(authCode);
	
		int result = accountRepository.createAuthCode(account); // 인증키 DB저장
		if(result == 0)
		{
			System.out.println("인증키 저장문제");
			return false;
		}
		MailHandler sendMail;
		try {
			sendMail = new MailHandler(mailSender);
			sendMail.setSubject("[メール認証]");
			sendMail.setText(
					new StringBuffer().append("<h1>メール認証</h1>")
					.append("<a href='https://www.isYourHero.tk/game/emailConfirm?email=")//https 확인
					.append(account.getEmail())
					.append("&authCode=").append(account.getAuthCode())
					.append("&isConfirm=").append('Y')
					.append("&userId=").append(account.getUserId())
					.append("' target='_blenk'>メール認証確認</a>").toString());
			sendMail.setFrom("auth@isYourHero.tk", "EnglishHero");
			sendMail.setTo(account.getEmail());
			sendMail.send();
		} catch (MessagingException | UnsupportedEncodingException e) {
			System.out.println("이메일 보내기 문제");
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public void sendSimpleMail(SimpleMail mail) throws Exception
	{
		MailHandler sendMail = new MailHandler(mailSender);
		sendMail.setSubject(mail.getSubject());
		sendMail.setText(mail.getContent());
		sendMail.setFrom(mail.getFrom(), "ユーザーのご意見");
		sendMail.setTo(mail.getTo());
		sendMail.send();
	}
}
