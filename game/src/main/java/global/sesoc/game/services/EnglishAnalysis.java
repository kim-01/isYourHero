package global.sesoc.game.services;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;

/**
 * @brief ETRI open api의 기본적인 음성인식을 위한 코드</br>
 * </br>
 * @author 탈주희망자(황한용) 
 * @version 2.01 
 * @todo
 * 1. 인코딩의 문제로 일부 특수문자 (')가 \u0027 같은 유니코드 값으로 출력됨.</br> ex) i'm -> i\u0027m </br>
 */
@Service
public class EnglishAnalysis
{
	 private static final String OPEN_API_URL = "http://aiopen.etri.re.kr:8000/WiseASR/"; //ETRI 분석링크
	 private static final String TTL = "Recognition"; //TTL관련 주소
	 private static final String PRONUNCIATION = "Pronunciation";//발음분석 관련주소
	 private static final String ACCESS_KEY = "256ce7a8-2165-4295-8d83-cc7751d2d676";    // 발급받은 Access Key
	 private static final String LANGUAGECODE = "english";     // 언어 코드
	 private static final int DATA_INDEX = 7;//결과값
	 
	 /**
	  * TTL(텍스트음성인식)기능을 사용하여  인식한 문장의 결과값을 가져오는 역할
	  * @param PcmPath 분석할 PCM파일의 경로
	  * @return 음성을 인식한 결과값
	  * @since 2.01 JDK 1.8
	  */
	 public static String TTLAnalysis(String PcmPath)
	 {
		 String audioContents = null;
		 String result = null;
		 
	        Gson gson = new Gson();
	 
	        Map<String, Object> request = new HashMap<String, Object>();
	        Map<String, String> argument = new HashMap<String, String>();
	 
	        try {
	            Path path = Paths.get(PcmPath);
	            byte[] audioBytes = Files.readAllBytes(path);
	            audioContents = Base64.getEncoder().encodeToString(audioBytes);
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	 
	        argument.put("language_code", LANGUAGECODE);
	        argument.put("audio", audioContents);
	 
	        request.put("access_key", ACCESS_KEY);
	        request.put("argument", argument);
	 
	        URL url;
	        Integer responseCode = null;
	        String responBody = null;
	        try {
	            url = new URL(OPEN_API_URL+TTL);
	            HttpURLConnection con = (HttpURLConnection)url.openConnection();
	            con.setRequestMethod("POST");
	            con.setDoOutput(true);
	 
	            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
	            wr.write(gson.toJson(request).getBytes("UTF-8"));
	            wr.flush();
	            wr.close();
	 
	            responseCode = con.getResponseCode();
	            InputStream is = con.getInputStream();
	            byte[] buffer = new byte[is.available()];
	            int byteRead = is.read(buffer);
	            responBody = new String(buffer);
	 
	            System.out.println("[responseCode] " + responseCode);
	            System.out.println("[responBody]");
	            System.out.println(responBody);
	            String[] arr = responBody.split("\"");
	            result = arr[DATA_INDEX];
	            result = result.substring(0, result.length()-2);
	 
	        } catch (MalformedURLException e) {
	            e.printStackTrace();
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
		 return result;
	 }
	 
	 public static String PronunciationAnalysis(String PcmPath,String script)
	 {
			String audioContents = null;
			String result = null;
	 
	        Gson gson = new Gson();
	 
	        Map<String, Object> request = new HashMap<>();
	        Map<String, String> argument = new HashMap<>();
	 
	        try {
	            Path path = Paths.get(PcmPath);
	            byte[] audioBytes = Files.readAllBytes(path);
	            audioContents = Base64.getEncoder().encodeToString(audioBytes);
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	 
	        argument.put("language_code", LANGUAGECODE);
	        argument.put("script", script);
	        argument.put("audio", audioContents);
	 
	        request.put("access_key", ACCESS_KEY);
	        request.put("argument", argument);
	 
	        URL url;
	        Integer responseCode = null;
	        String responBody = null;
	        try {
	            url = new URL(OPEN_API_URL+PRONUNCIATION);
	            HttpURLConnection con = (HttpURLConnection)url.openConnection();
	            con.setRequestMethod("POST");
	            con.setDoOutput(true);
	 
	            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
	            wr.write(gson.toJson(request).getBytes("UTF-8"));
	            wr.flush();
	            wr.close();
	 
	            responseCode = con.getResponseCode();
	            InputStream is = con.getInputStream();
	            byte[] buffer = new byte[is.available()];
	            int byteRead = is.read(buffer);
	            responBody = new String(buffer);
	 
	            System.out.println("[responseCode] " + responseCode);
	            System.out.println("[responBody]");
	            System.out.println(responBody);
	            String[] arr = responBody.split(",");
	            result = arr[arr.length-1];
	            result = result.substring(8, result.length()-2);
	            System.out.println("PronunciationAnalysis : " + result);
	            
	        } catch (MalformedURLException e) {
	            e.printStackTrace();
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        return result;
	 }
}
