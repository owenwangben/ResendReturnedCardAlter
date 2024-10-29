//$.loadFundList = function (val) {
//$.loadConsent = function(){
/*
function loadConsent(JQObject) {		
	// gold Consent

	$('body').append( "<div id='overlay'></div>" );
	$('html').css('overflow','hidden');
	$('#overlay').css({'z-index':'9000'});
	JQObject.stop(false, true).fadeIn();
	JQObject.find('.close, a').click(function() {
	    alert('123');
		$('html').css('overflow','auto');
		$('body').find('#overlay').remove();
		JQObject.stop(false, true).fadeOut();
		return false;
	});


	//$('.select').dropdown();
};
*/

function loadConsent(JQObject) {
    $('body').append("<div id='overlay'></div>");
    $('html').css('overflow', 'hidden');
    $('#overlay').css({ 'z-index': '9000' });
    JQObject.stop(false, true).fadeIn();
    JQObject.find('.close, a').click(function() {
        if ($(this).hasClass('disabled')) {
            // do nothing
        } else {
            $('html').css('overflow', 'auto');
            $('body').find('#overlay').remove();
            JQObject.stop(false, true).fadeOut();
            return false;
        }
        
    });
};

//$.loadPopup = function () {
//$(function(){
function loadPopup() {
	//$('.select').dropdown();
	$('.popup_toggle').popup();
	// $('.numPad_toggle').numpad();

	$('#NPA_toggle').click(function(){
		
		$('body').append( "<div id='overlay'></div>" );
		$('html').css('overflow','hidden');
		$('#NPA_list').css({
			'opacity': 0,
			'display':'block'
		});

		var panelHeight = $('#NPA_list').outerHeight(),
			winWidth = $(window).width(),
			headerHeight = $('header').outerHeight(),
			// panelMLeft = "-" + options.outerWidth() / 2 + "px",
			panelMTop = "-" + panelHeight / 2 + "px";
		var styles = {
			// marginLeft : panelMLeft,
			marginTop: panelMTop 
	    };

	    if(winWidth > 960){
	    	$('#NPA_list').width(960).css('marginLeft', '-480px');
	    }
	    $('#NPA_list').css(styles).animate({
		    opacity: 1
		  }, 400, function() {
		    // Animation complete.
		  });

		$('#NPA_list').find('li').click(function() { //onclick event, change field value with selected 'list' item and fadeout 'list'
			
			$('#NPA_list').fadeOut( 400, function() {
			    $('html').css('overflow','auto');
				$('body').find('#overlay').remove();
			});
		});
	});

};
