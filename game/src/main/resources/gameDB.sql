
/* Drop Tables */

DROP TABLE SCORE CASCADE CONSTRAINTS;
DROP TABLE USERITEM CASCADE CONSTRAINTS;
DROP TABLE GAMECHAR CASCADE CONSTRAINTS;
DROP TABLE ACCOUNT CASCADE CONSTRAINTS;
DROP TABLE ITEM CASCADE CONSTRAINTS;
DROP TABLE SCRIPT CASCADE CONSTRAINTS;
DROP TABLE STAGE CASCADE CONSTRAINTS;



/* Drop Sequences */

DROP SEQUENCE SEQ_SCORE_SCORESEQ;
DROP SEQUENCE SEQ_SCRIPT_SCRIPTSEQ;




/* Create Sequences */

CREATE SEQUENCE SEQ_SCORE_SCORESEQ INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE SEQ_SCRIPT_SCRIPTSEQ INCREMENT BY 1 START WITH 1;



/* Create Tables */

-- 로그인시 사용되는 회원의 기본적인 정보들
CREATE TABLE ACCOUNT
(
	-- 로그인 및 비밀번호 찾기 시 사용되는 회원의 ID
	USERID varchar2(12 char) NOT NULL,
	-- 회원의 password
	USERPWD varchar2(16 char) NOT NULL,
	-- 유저가 사용하는 게임케릭터의 nickname
	NICKNAME varchar2(20 char) NOT NULL,
	-- 유저가 가입, 회원정보 변경(이메일 변경시)
	EMAIL varchar2(30 char) NOT NULL,
	-- 유저가 회원가입, 회원정보변경, 비밀번호 분실시 인증하기 위한 코드
	AUTHCODE varchar2(50 char),
	-- 유저가 회원가입, 회원정보변경시 인증을 받았는지 알 수있는 check flag
	ISCONFIRM varchar2(1 char) DEFAULT 'N' CHECK(ISCONFIRM IN('Y','N','')),
	PRIMARY KEY (USERID)
);


CREATE TABLE GAMECHAR
(
	-- 유저가 사용하는 게임케릭터의 nickname
	NICKNAME varchar2(12 char) NOT NULL,
	-- 케릭터 고유의 UNICODE
	-- 기본(남자) : male
	--       (여자) : female
	CHARUNICODE varchar2(50 char) NOT NULL,
	-- 유저가 현재 소지하고 있는 금액
	COIN number(15) DEFAULT 0,
	PRIMARY KEY (NICKNAME)
);


CREATE TABLE ITEM
(
	-- 아이템 하나마다 고유로 가지고있는 유니크 코드이다
	ITEMUNICODE varchar2(50 char) NOT NULL,
	-- 아이템이 게임상에 표시될 이름
	ITEMNAME varchar2(20 char) NOT NULL,
	-- 상점에서 아이템에 관한 설명을 나타내는 컬럼
	ITEMCOMMENT varchar2(30 char) NOT NULL,
	-- 해당 아이템의 그림파일의 이름
	IMGNAME varchar2(20 char) NOT NULL,
	-- 해당 아이템을 사기위해 들어가는 비용
	-- 최대 10자리 수까지 지원된다.
	PRICE number(10) NOT NULL,
	PRIMARY KEY (ITEMUNICODE)
);


-- 유저가 게임을 할때마다 기록되는 테이블
CREATE TABLE SCORE
(
	-- 녹음된 번호순으로 저장되는 값.
	SCORESEQ number(19,0) NOT NULL,
	-- 유저가 사용하는 게임케릭터의 nickname
	NICKNAME varchar2(12 char) NOT NULL,
	-- 유저가 실행한 스테이지
	-- 실행한 스테이지 및 에피소드가 다름과 같은 문자열로 들어가있다. OO_OO[(STAGE이니셜 두글자)_(EPISODE이니셜 2글자)]
	STATE varchar2(10 char) NOT NULL,
	-- 100이 만점으로 ETRI에서 나온 1~5정도의 값에 20을 곱하여 문장의 정확도와 발음의 유사도를 나타낸다.
	SCORE number(3,0) DEFAULT 0,
	PRIMARY KEY (SCORESEQ)
);


CREATE TABLE SCRIPT
(
	-- 등록한 순서의 번호를 나타내는 SEQ
	SCRIPTSEQ number(5,0) NOT NULL,
	-- 유저가 실행한 스테이지
	-- 실행한 스테이지 및 에피소드가 다름과 같은 문자열로 들어가있다. OO_OO[(STAGE이니셜 두글자)_(EPISODE이니셜 2글자)]
	STATE varchar2(10 char) NOT NULL,
	-- .MP3형식의 음성파일의 이름이다. 해당 컬럼의 값은 확장자를 제외한 이름으로 01,02,03식으로 시작한다.
	FILENAME varchar2(30 char) NOT NULL,
	-- 해당 스테이지,에피소드,몇번째의 영어 대사 문장이 저장되어있다.
	SYNTEXENG varchar2(100 char) NOT NULL,
	-- 해당 스테이지,에피소드,몇번째의 일본어 대사 문장이 저장되어있다.
	SYNTEXJAP varchar2(100 char) NOT NULL,
	PRIMARY KEY (SCRIPTSEQ)
);


CREATE TABLE STAGE
(
	-- 유저가 실행한 스테이지
	-- 실행한 스테이지 및 에피소드가 다름과 같은 문자열로 들어가있다. OO_OO[(STAGE이니셜 두글자)_(EPISODE이니셜 2글자)]
	STATE varchar2(10 char) NOT NULL,
	-- 한 에피소드 당 받을 수 있는 최대 코인의 수.
	-- 5자리까지로 제한되어있다.
	MAXCOIN number(5,0) NOT NULL,
	-- 각 스테이지 최종보스의 이름.
	-- pcak.json의 key값을 가지고있다.
	BOSSNAME varchar2(12 char) NOT NULL,
	-- 각 보스가 처음 게임을 시작하기 전에 하는 한 문장
	SENTENSE varchar2(100 char) NOT NULL,
	PRIMARY KEY (STATE)
);


CREATE TABLE USERITEM
(
	-- 유저가 사용하는 게임케릭터의 nickname
	NICKNAME varchar2(12 char) NOT NULL,
	-- 아이템 하나마다 고유로 가지고있는 유니크 코드이다
	ITEMUNICODE varchar2(50 char) NOT NULL,
	-- 유저가 가지고있는 아이템의 갯수이다.
	ITEMCOUNT number(3) DEFAULT 0,
	PRIMARY KEY (ITEMUNICODE)
);



/* Create Foreign Keys */

ALTER TABLE GAMECHAR
	ADD CONSTRAINT GAME_CHAR_NICKNAME_FK FOREIGN KEY (NICKNAME)
	REFERENCES ACCOUNT (USERID)
	ON DELETE CASCADE
;


ALTER TABLE SCORE
	ADD CONSTRAINT SCORE_NICKNAME_FK FOREIGN KEY (NICKNAME)
	REFERENCES GAMECHAR (NICKNAME)
	ON DELETE CASCADE
;


ALTER TABLE USERITEM
	ADD CONSTRAINT USER_ITEM_NICKNAME_FK FOREIGN KEY (NICKNAME)
	REFERENCES GAMECHAR (NICKNAME)
	ON DELETE CASCADE
;


ALTER TABLE USERITEM
	ADD CONSTRAINT USER_ITEM_ITEM_UNICODE_FK FOREIGN KEY (ITEMUNICODE)
	REFERENCES ITEM (ITEMUNICODE)
	ON DELETE CASCADE
;


ALTER TABLE SCORE
	ADD FOREIGN KEY (STATE)
	REFERENCES STAGE (STATE)
;


ALTER TABLE SCRIPT
	ADD CONSTRAINT SCRIPT_STATE_FK FOREIGN KEY (STATE)
	REFERENCES STAGE (STATE)
	ON DELETE CASCADE
;



/* Comments */

COMMENT ON TABLE ACCOUNT IS '로그인시 사용되는 회원의 기본적인 정보들';
COMMENT ON COLUMN ACCOUNT.USERID IS '로그인 및 비밀번호 찾기 시 사용되는 회원의 ID';
COMMENT ON COLUMN ACCOUNT.USERPWD IS '회원의 password';
COMMENT ON COLUMN ACCOUNT.NICKNAME IS '유저가 사용하는 게임케릭터의 nickname';
COMMENT ON COLUMN ACCOUNT.EMAIL IS '유저가 가입, 회원정보 변경(이메일 변경시)';
COMMENT ON COLUMN ACCOUNT.AUTHCODE IS '유저가 회원가입, 회원정보변경, 비밀번호 분실시 인증하기 위한 코드';
COMMENT ON COLUMN ACCOUNT.ISCONFIRM IS '유저가 회원가입, 회원정보변경시 인증을 받았는지 알 수있는 check flag';
COMMENT ON COLUMN GAMECHAR.NICKNAME IS '유저가 사용하는 게임케릭터의 nickname';
COMMENT ON COLUMN GAMECHAR.CHARUNICODE IS '케릭터 고유의 UNICODE
기본(남자) : male
      (여자) : female';
COMMENT ON COLUMN GAMECHAR.COIN IS '유저가 현재 소지하고 있는 금액';
COMMENT ON COLUMN ITEM.ITEMUNICODE IS '아이템 하나마다 고유로 가지고있는 유니크 코드이다';
COMMENT ON COLUMN ITEM.ITEMNAME IS '아이템이 게임상에 표시될 이름';
COMMENT ON COLUMN ITEM.ITEMCOMMENT IS '상점에서 아이템에 관한 설명을 나타내는 컬럼';
COMMENT ON COLUMN ITEM.IMGNAME IS '해당 아이템의 그림파일의 이름';
COMMENT ON COLUMN ITEM.PRICE IS '해당 아이템을 사기위해 들어가는 비용
최대 10자리 수까지 지원된다.';
COMMENT ON TABLE SCORE IS '유저가 게임을 할때마다 기록되는 테이블';
COMMENT ON COLUMN SCORE.SCORESEQ IS '녹음된 번호순으로 저장되는 값.';
COMMENT ON COLUMN SCORE.NICKNAME IS '유저가 사용하는 게임케릭터의 nickname';
COMMENT ON COLUMN SCORE.STATE IS '유저가 실행한 스테이지
실행한 스테이지 및 에피소드가 다름과 같은 문자열로 들어가있다. OO_OO[(STAGE이니셜 두글자)_(EPISODE이니셜 2글자)]';
COMMENT ON COLUMN SCORE.SCORE IS '100이 만점으로 ETRI에서 나온 1~5정도의 값에 20을 곱하여 문장의 정확도와 발음의 유사도를 나타낸다.';
COMMENT ON COLUMN SCRIPT.SCRIPTSEQ IS '등록한 순서의 번호를 나타내는 SEQ';
COMMENT ON COLUMN SCRIPT.STATE IS '유저가 실행한 스테이지
실행한 스테이지 및 에피소드가 다름과 같은 문자열로 들어가있다. OO_OO[(STAGE이니셜 두글자)_(EPISODE이니셜 2글자)]';
COMMENT ON COLUMN SCRIPT.FILENAME IS '.MP3형식의 음성파일의 이름이다. 해당 컬럼의 값은 확장자를 제외한 이름으로 01,02,03식으로 시작한다.';
COMMENT ON COLUMN SCRIPT.SYNTEXENG IS '해당 스테이지,에피소드,몇번째의 영어 대사 문장이 저장되어있다.';
COMMENT ON COLUMN SCRIPT.SYNTEXJAP IS '해당 스테이지,에피소드,몇번째의 일본어 대사 문장이 저장되어있다.';
COMMENT ON COLUMN STAGE.STATE IS '유저가 실행한 스테이지
실행한 스테이지 및 에피소드가 다름과 같은 문자열로 들어가있다. OO_OO[(STAGE이니셜 두글자)_(EPISODE이니셜 2글자)]';
COMMENT ON COLUMN STAGE.MAXCOIN IS '한 에피소드 당 받을 수 있는 최대 코인의 수.
5자리까지로 제한되어있다.';
COMMENT ON COLUMN STAGE.BOSSNAME IS '각 스테이지 최종보스의 이름.
pcak.json의 key값을 가지고있다.';
COMMENT ON COLUMN STAGE.SENTENSE IS '각 보스가 처음 게임을 시작하기 전에 하는 한 문장';
COMMENT ON COLUMN USERITEM.NICKNAME IS '유저가 사용하는 게임케릭터의 nickname';
COMMENT ON COLUMN USERITEM.ITEMUNICODE IS '아이템 하나마다 고유로 가지고있는 유니크 코드이다';
COMMENT ON COLUMN USERITEM.ITEMCOUNT IS '유저가 가지고있는 아이템의 갯수이다.';



