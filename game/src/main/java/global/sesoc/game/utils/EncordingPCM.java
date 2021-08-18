package global.sesoc.game.utils;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

//encorder API
import ws.schild.jave.AudioAttributes;
import ws.schild.jave.Encoder;
import ws.schild.jave.EncoderException;
import ws.schild.jave.EncodingAttributes;
import ws.schild.jave.InputFormatException;
import ws.schild.jave.MultimediaObject;
//encorder API end
/**
 * @brief 사용자에게서 받은 API를 pcm형식으로 서버에 저장</br>
 * @author 탈주희망자(황한용)</br>
 * @value PCM_FOLDER_PATH : PCM파일을 저장할 폴더.</br>
 *        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;이 API는  [C:\sts-bundle\sts-3.9.4.RELEASE\]를 기본경로로 설정을하고</br>
 *        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;그 뒤 new File(PcmPath) 중 PcmPath을 인식합니다.</br>
 *        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;즉 해당 파일이 만들어지는 경로는 </br>
 *        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[C:\sts-bundle\sts-3.9.4.RELEASE\PcmPath]가 됩니다.<br>
 *        PCM_TYPE : PCM 확장자명</br>
 * @version 2.01
 */
public class EncordingPCM
{
	private final static String PCM_FOLDER_DIR="audioFile\\";
	private final static String PCM_TYPE=".pcm";
	
	/**
	 * 사용자의 녹음(WAV)파일을 ETRI에 보내는 PCM파일로 만드는 작업을 한다.</br>
	 * 인코딩이 완료된 파일은 지정한 폴더에  유저ID(session에서 userId를 받아온다.)+시간(날짜,시,분,초)로 만들어진다.</br>
	 *   ※ ETRI에서 요구하는 PCM 요구사항 : 16000HZ sampling rate,16bit signed, little endian, mono chennal(1 chennal)</br>
	 *     bit rate 계산법(PCM만 해당) : sampling rate * chennal * bit = bit rate</br>
	 *     MAVEN에서 form.xml에 추가해야할 defendency구문이 있습니다.</br>
	 * @param path String타입의 변형할 WAV파일의 경로
	 * @param userId String타입의 녹음한 유저의 id 
	 * @return String타입의 변형한 PCM파일의 경로
	 * @throws IllegalArgumentException The transcoding operation has never started since the encoding attributes passed to the encoder has been recognized as invalid. Usualy this occurs when the EncodingAttributes instance given to the encoder asks the encoding of a container with no audio and no video streams (both AudioAttributes and VideoAttribues attributes are null or not set).
	 * @throws InputFormatException The transcoding operation has never started since the encoding attributes passed to the encoder has been recognized as invalid. Usualy this occurs when the EncodingAttributes instance given to the encoder asks the encoding of a container with no audio and no video streams (both AudioAttributes and VideoAttribues attributes are null or not set).
	 * @throws EncoderException The operation has failed during the trancoding due to an internal error. You should check the exception message, and you can also use an EncoderProgressListener instance to check any message issued by the encoder.
	 * @see #http://www.sauronsoftware.it/projects/jave/manual.php#8 (DOC)</br>
	 *      https://mvnrepository.com/artifact/ws.schild/jave-all-deps/2.4.2 (MAVEN)</br>
	 *      https://github.com/goxr3plus/jave2(GIT)</br>
	 * @since 2.01 JDK 1.8
	 */
	public static String EndordingWAVToPCM(String userId, String WavPath) throws IllegalArgumentException, InputFormatException, EncoderException
	{
		Date date = new Date();
		SimpleDateFormat fmt = new SimpleDateFormat("yy_MM_dd_HH_mm_ss");
		String PcmPath = PCM_FOLDER_DIR+userId+"_"+fmt.format(date)+PCM_TYPE;
		
		File source = new File(WavPath);	
		File target = new File(PcmPath);                          
	                                                                 
	    //Audio Attributes                                               
		AudioAttributes audio = new AudioAttributes();               
		audio.setCodec("pcm_s16le");
		audio.setBitRate(256000);
		audio.setChannels(1);                                        
		audio.setSamplingRate(16000);                                
		                                                             
		//Encoding attributes                                        
		EncodingAttributes attrs = new EncodingAttributes();         
		attrs.setFormat("u16le");                                      
		attrs.setAudioAttributes(audio);                             
		                                                             
		//Encode                                                     
		Encoder encoder = new Encoder();                             
		encoder.encode(new MultimediaObject(source), target, attrs);
		
		return PcmPath;
	}
}
