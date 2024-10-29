$(document).ready(function(){
    $('.navigate-bar > ul > li > a').click(function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop: $('.'+$(this).data('tag')).offset().top});
        $('.navigate-bar > ul > li').removeClass('active');
        $(this).parent().addClass('active');
    });
});

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}