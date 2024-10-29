var index = 0;

function callBackFunction(){
	$("#nations img:eq("+index+")").animate({opacity:1},2000,callBackFunction);
	$("#nations img:not(:eq("+index+"))").animate({opacity:0},2000);
	index++;
	index%=menuTotal;
}

function MenuAdcycle() {
  $("*.jqCycle").after('<div id="jqCycle_pager" style="height:2PX;">').cycle({   
    fx:    'fade',  //特效           
    speed:    'fast',  //速度
    timeout:  3000, //超時
    random:  1,
    pager:  '#jqCycle_pager' 
  });
}