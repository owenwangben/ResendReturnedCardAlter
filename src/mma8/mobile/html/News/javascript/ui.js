$(document).ready(function(){
	
	//修正因為無法使用 viewport device-width 造成 Android 2.x 元素寬度超出螢幕寬度的 bug。 
	function objGetWidth(){
		var w = $(window).width();
		$('.main').outerWidth(w);
		if( w >= 720 ){
			var rw = w-120;
		}else{
			var rw = w-90;
		}
		$('.subbar .title').width(rw).addClass('ellipsis');
	};
	objGetWidth();
	$(window).resize(objGetWidth);
	
	//iScroll //2013.05.21
	var myScroll;
	function loaded() {
        try {
		    myScroll = new iScroll('scroll-wrap', { scrollbarClass: 'myScrollbar' });
        } catch(e) {
        }
	}
//	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	window.addEventListener('load', loaded, false);
	
});

