$(document).ready(function(){

    $('.inside_container .data-table tr:last-child').find('th, td').css('border-bottom','none');

    if ($(".rowElem").length) {
    	$(".rowElem").fancyfields();
    }

    $('.moneyFormat').blur(function(){
        str = $(this).val().replace(/\D+/g,'');
        $(this).val(moneyFormat(str));
    });

    function moneyFormat(str){
        if(str.length<=3) {
            return str;
        } else {
            return moneyFormat(str.substr(0,str.length-3))+","+(str.substr(str.length-3));
        }
    }
});