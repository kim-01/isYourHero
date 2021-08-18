package global.sesoc.game.controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import global.sesoc.game.dto.Script;
import global.sesoc.game.repositories.StageRepository;
import global.sesoc.game.services.EnglishAnalysis;
import global.sesoc.game.utils.EncordingPCM;
import ws.schild.jave.EncoderException;
import ws.schild.jave.InputFormatException;

/**
 * @brief 사용자에게 받은 정보를 이용하여 점수를 체점하거나 음성을 인식하거나 하는 기능이 있다.
 * @author 탈주희망자(황한용)
 * @version 2.02
 * @see {@link EncordingPCM} 받은 WAV파일을 ETRI에서 원하는 PCM파일로 변환시키는 util
 * 		{@link EnglishAnalysis} PCM파일을 ETRI로 보내 결과값을 받는 util
 */
@Controller
public class GameController {
	private final static String WAV_FOLDER_DIR="C:\\audioFile\\";
	private final static String WAV_TYPE=".wav";
	
	@Autowired
	StageRepository stageRepository;
		
	/**
	 * 위의 메소드는 다음과 같은 방식으로 점수를 배출한다.
	 * 1. 유저가 발음한 JavaScript언어의 DataBuffer를 BASE64형식으로 인코딩을 한 문자열을 파라메터로 받음</br>
	 * 2. 그 문자열을 디코딩을 하여 baye배열로 만든 뒤 wav파일로 변환</br>
	 * 3. 그 WAV파일을 ETRI에서 분석가능한 속성의 PCM파일로 변환</br>
	 * 4. 그 PCM파일을 ETRI로 보내서 분석을 한뒤 결과값을 리턴
	 * 해당 메소드를 호출하는 js는 recordworker.js 파일에 있으므로 참고
	 * @since JDK 1.8 2.01ver
	 * @param file BASE64형식의 유저의 녹음데이터
	 * @param session 유저의 ID가 들어가있는 session
	 * @return ETRI에서 분석한 TTL에 대한 결과값
	 * @throws IOException 파일경로가 잘못되었을 시 에러
	 * @throws IllegalArgumentException The transcoding operation has never started since the encoding attributes passed to the encoder has been recognized as invalid. Usualy this occurs when the EncodingAttributes instance given to the encoder asks the encoding of a container with no audio and no video streams (both AudioAttributes and VideoAttribues attributes are null or not set).
	 * @throws InputFormatException The transcoding operation has never started since the encoding attributes passed to the encoder has been recognized as invalid. Usualy this occurs when the EncodingAttributes instance given to the encoder asks the encoding of a container with no audio and no video streams (both AudioAttributes and VideoAttribues attributes are null or not set).
	 * @throws EncoderException The operation has failed during the trancoding due to an internal error. You should check the exception message, and you can also use an EncoderProgressListener instance to check any message issued by the encoder.
	 */
	@ResponseBody
	@RequestMapping(value = "/getUserData", method = RequestMethod.POST)
	public String getUserData(@RequestBody String file, HttpSession session) throws IOException, IllegalArgumentException, InputFormatException, EncoderException
	{ 
		FileOutputStream fos = null;
		String userId = (String) session.getAttribute("loginId");
		Date date = new Date();
		SimpleDateFormat fmt = new SimpleDateFormat("yy_MM_dd_HH_mm_ss");
		String WavPath = WAV_FOLDER_DIR+userId+fmt.format(date)+WAV_TYPE;
	    File destFile = new File(WavPath);
	    byte[] decodedString = Base64.decodeBase64(file);
	 
	    try {
	        fos = new FileOutputStream(destFile);
	        fos.write(decodedString);
	        fos.close();
	    } catch (IOException e) {
	        System.out.println("Exception position : FileUtil - binaryToFile(String binaryFile, String filePath, String fileName)");
	    }
	    String PcmPath = EncordingPCM.EndordingWAVToPCM(userId, WavPath);
		return EnglishAnalysis.TTLAnalysis(PcmPath);
	}
	
	/**
	 * 위의 메소드는 다음과 같은 방식으로 점수를 배출한다.
	 * 1. 유저가 발음한 JavaScript언어의 DataBuffer를 BASE64형식으로 인코딩을 한 문자열을 파라메터로 받음</br>
	 * 2. 그 문자열을 디코딩을 하여 baye배열로 만든 뒤 wav파일로 변환</br>
	 * 3. 그 WAV파일을 ETRI에서 분석가능한 속성의 PCM파일로 변환</br>
	 * 4. 그 PCM파일을 ETRI로 보내서 분석을 한뒤 결과값을 리턴
	 * 해당 메소드를 호출하는 js는 recordworker.js 파일에 있으므로 참고
	 * ETRI에서 분석한 TTL에 대한 결과값을 세션에 저장(score로 저장)
	 * @since JDK 1.8 2.02ver
	 * @param file BASE64형식의 유저의 녹음데이터
	 * @param session 유저의 ID가 들어가있는 session
	 * @throws IOException 파일경로가 잘못되었을 시 에러
	 * @throws IllegalArgumentException The transcoding operation has never started since the encoding attributes passed to the encoder has been recognized as invalid. Usualy this occurs when the EncodingAttributes instance given to the encoder asks the encoding of a container with no audio and no video streams (both AudioAttributes and VideoAttribues attributes are null or not set).
	 * @throws InputFormatException The transcoding operation has never started since the encoding attributes passed to the encoder has been recognized as invalid. Usualy this occurs when the EncodingAttributes instance given to the encoder asks the encoding of a container with no audio and no video streams (both AudioAttributes and VideoAttribues attributes are null or not set).
	 * @throws EncoderException The operation has failed during the transcoding due to an internal error. You should check the exception message, and you can also use an EncoderProgressListener instance to check any message issued by the encoder.
	 */
	@ResponseBody
	@RequestMapping(value = "/getUserScore", method = RequestMethod.POST)
	public void getUserScore(@RequestBody String file, HttpSession session) throws IOException, IllegalArgumentException, InputFormatException, EncoderException
	{ 
		FileOutputStream fos = null;
		String userId = (String) session.getAttribute("loginId");
		Date date = new Date();
		SimpleDateFormat fmt = new SimpleDateFormat("yy_MM_dd_HH_mm_ss");
		String WavPath = WAV_FOLDER_DIR+userId+fmt.format(date)+WAV_TYPE;
	    File destFile = new File(WavPath);
	    byte[] decodedString = Base64.decodeBase64(file);
	 
	    try {
	        fos = new FileOutputStream(destFile);
	        fos.write(decodedString);
	        fos.close();
	    } catch (IOException e) {
	        System.out.println("Exception position : FileUtil - binaryToFile(String binaryFile, String filePath, String fileName)");
	    }
	    String PcmPath = EncordingPCM.EndordingWAVToPCM(userId, WavPath);
	    
	    String seq = (String) session.getAttribute("nowEPSEQ");
	    String ep = (String) session.getAttribute("nowEP");
	    String key = ep + "_0" + seq;
	    Script script = stageRepository.getOneScript(key);
	    String score = String.valueOf((int)(Double.parseDouble(EnglishAnalysis.PronunciationAnalysis(PcmPath, script.getSyntexEng())) * 20));
	    session.setAttribute("score", score);    
	}
	
	/**
	 * 세션에 저장되어있는 점수를 사용자에게 돌려주는 메소드
	 * @since JDK 1.8 2.02ver
	 * @param session 유저의 세션
	 * @return String 값의 백분율 점수
	 */
	@ResponseBody
	@RequestMapping(value = "/getScore", method = RequestMethod.POST)
	public String getScore(HttpSession session)
	{
		String score = (String) session.getAttribute("score");
		session.removeAttribute("score");
		return score;
	}
	
	/**
	 * 스크립트를 부를 키값 중 에피소드값을 따로 저장하는 부분이 없기때문에 세션에 저장한다.
	 * attribute 키값은 nowEP이다.
	 * 셋팅전 기존의 값은 초기화시킨다.
	 * 추후에 이 값은 _[숫자]를 붙여 각 스크립트의 값을 비교하는데 사용된다.
	 * @since JDK 1.8 2.01ver
	 * @param key String 형태의 5글자의 에피소드 키값
	 * @param session 유저의 현재 세션
	 */
	@ResponseBody
	@RequestMapping(value = "/setScriptSession", method = RequestMethod.POST)
	public void setScriptSession(@RequestBody String key,HttpSession session)
	{
		session.removeAttribute("nowEP");
		session.removeAttribute("nowEPSEQ");
		session.setAttribute("nowEP", key);
	}
	
	/**
	 * 스크립트 부를 키값 중 순서와 관련된 부분을 세션에 저장한다.
	 * @since JDK 1.8 2.01ver
	 * @param key String 형태의 숫자
	 * @param session 유저의 현재 세션
	 */
	@ResponseBody
	@RequestMapping(value = "/setScriptTarget", method = RequestMethod.POST)
	public void setScriptTarget(@RequestBody String key,HttpSession session)
	{
		session.removeAttribute("nowEPSEQ");
		session.setAttribute("nowEPSEQ", key);
	}
	
	@RequestMapping(value = "/gameMain", method = RequestMethod.GET)
	public String gameMain()
	{ 
		return "gaming/gameMain";
	}
	
	@RequestMapping(value = "/gameStart", method = RequestMethod.GET)
	public String gameStart()
	{ 
		return "gaming/game";
	}
}
