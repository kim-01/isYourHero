var ok_pp_lastStep = {x:714 , y:751};//오키나와 파인애플파크 = 보스전
var ok_pp_sscheck = false; // 히어로와의 연습을 끝마쳤는가 에 대한 변수
var ok_pp_plAcheck = false; 
var ok_pp_plBcheck = false;
var ok_av_lastStep = {x:714 , y:751};
var ok_av_sscheck = false;
var ok_av_plAcheck = false;
var ok_av_plBcheck = false;
var ok_kb_lastStep = {x:714 , y:751};
var ok_kb_sscheck = false;
var ok_kb_plAcheck = false;
var ok_kb_plBcheck = false;
var ok_mj_lastStep = {x:714 , y:751};
var ok_mj_sscheck = false;
var ok_mj_plAcheck = false;
var ok_mj_plBcheck = false;
var ok_sc_lastStep = {x:714 , y:751};
var ok_sc_sscheck = false;
var ok_sc_plAcheck = false;
var ok_sc_plBcheck = false;

var sp_sb_lastStep = {x:714 , y:751};// 삿포로 맥주박물관 = 보스전
var sp_sb_sscheck = false;
var sp_sb_plAcheck = false;
var sp_sb_plBcheck = false;
var sp_ct_lastStep = {x:714 , y:751};
var sp_ct_sscheck = false;
var sp_ct_plAcheck = false;
var sp_ct_plBcheck = false;
var sp_op_lastStep = {x:714 , y:751};
var sp_op_sscheck = false;
var sp_op_plAcheck = false;
var sp_op_plBcheck = false;
var sp_ch_lastStep = {x:714 , y:751};
var sp_ch_sscheck = false;
var sp_ch_plAcheck = false;
var sp_ch_plBcheck = false;
var sp_st_lastStep = {x:714 , y:751};
var sp_st_sscheck = false;
var sp_st_plAcheck = false;
var sp_st_plBcheck = false;

var kb_hl_lastStep = {x:714 , y:751};// 고베 하버랜드 = 보스전
var kb_hl_sscheck = false;
var kb_hl_plAcheck = false;
var kb_hl_plBcheck = false;
var kb_hc_lastStep = {x:714 , y:751};
var kb_hc_sscheck = false;
var kb_hc_plAcheck = false;
var kb_hc_plBcheck = false;
var kb_kn_lastStep = {x:714 , y:751};
var kb_kn_sscheck = false;
var kb_kn_plAcheck = false;
var kb_kn_plBcheck = false;
var kb_rs_lastStep = {x:714 , y:751};
var kb_rs_sscheck = false;
var kb_rs_plAcheck = false;
var kb_rs_plBcheck = false;
var kb_pt_lastStep = {x:714 , y:751};
var kb_pt_sscheck = false;
var kb_pt_plAcheck = false;
var kb_pt_plBcheck = false;

var kt_kk_lastStep = {x:714 , y:751};// 교토 금각사 = 보스전
var kt_kk_sscheck = false;
var kt_kk_plAcheck = false;
var kt_kk_plBcheck = false;
var kt_as_lastStep = {x:714 , y:751};
var kt_as_sscheck = false;
var kt_as_plAcheck = false;
var kt_as_plBcheck = false;
var kt_gk_lastStep = {x:714 , y:751};
var kt_gk_sscheck = false;
var kt_gk_plAcheck = false;
var kt_gk_plBcheck = false;
var kt_hm_lastStep = {x:714 , y:751};
var kt_hm_sscheck = false;
var kt_hm_plAcheck = false;
var kt_hm_plBcheck = false;
var kt_km_lastStep = {x:714 , y:751};
var kt_km_sscheck = false;
var kt_km_plAcheck = false;
var kt_km_plBcheck = false;

var tk_tt_lastStep = {x:680,y:760};// 도쿄 도쿄타워  = 보스전
var tk_tt_sscheck = false;
var tk_tt_plAcheck = false;
var tk_tt_plBcheck = false;
var tk_td_lastStep = {x:680,y:760};
var tk_td_sscheck = false;
var tk_td_plAcheck = false;
var tk_td_plBcheck = false;
var tk_ak_lastStep = {x:680,y:760};
var tk_ak_sscheck = false;
var tk_ak_plAcheck = false;
var tk_ak_plBcheck = false;
var tk_od_lastStep = {x:680,y:760};
var tk_od_sscheck = false;
var tk_od_plAcheck = false;
var tk_od_plBcheck = false;
var tk_rb_lastStep = {x:680,y:760};
var tk_rb_sscheck = false;
var tk_rb_plAcheck = false;
var tk_rb_plBcheck = false;

var gamescreensize =  {x:800, y:600};
var selectA = false;
var isPL = false;
var isSS = false;
var selectfunction_guide = ['よく来た、怪人はこの後ろだ。','私たちはあいつを見つけて'+'\n'+'ここまで追い詰めるのに成功したが、','どうしても倒せることわできなかった。',
                            '多分、私たちだけでは足りなかっただろう','もうすぐ我々に気付いて\n敵の援軍が来るはずだ。','君だけが希望だ。'+'\n'+'援軍が来る前に君にあの怪人を倒す力を！'];
var onprogress = ['あと少しだね！頑張ろう！','PrivateLessonとSelfStudyができたら'+'\n'+'怪人にも勝てるさ！'];
var repeatstudy = ['んん？どうした？まだ自信がないのか？','悪いが私たちはここで\nこいつらの相手で忙しいんだ。','君一人で何とかするしかあるまい。','代わりに何度でも君の能力を\nかくにんしてあげる。'];
