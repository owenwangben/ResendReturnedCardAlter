var $lboxstyle = '';
$(document).ready(function(){
  $('.openlbox').click(function(e){
	e.preventDefault();
	$lboxid = $(this).data('lboxid');
	$($lboxid).show().siblings().hide();
	$('.lboxed').lightbox_me();
  });

});



