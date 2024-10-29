<script type="text/javascript" src="http://code.jquery.com/jquery-latest.pack.js"></script>
<script type="text/javascript">
<!--
$(function(){
	var lang = window.navigator.userLanguage || window.navigator.language ;		
	var relang=lang.toLowerCase();
	switch (relang){
		case "zh-cn":
		$("#tbody").load("minwt_zh-cn.html");
		break;
 
		case "zh-tw":
		$("#tbody").load("minwt_zh-tw.html");
		break;
 
                default:
		$("#tbody").load("minwt_zh-tw.html");
	}			
});
//-->
</script>