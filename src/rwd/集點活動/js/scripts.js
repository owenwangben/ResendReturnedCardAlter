$(document).ready(function(){
  $(this).on('click', '.open-lbox', function(e){
    e.preventDefault();
    var lboxid = $(this).data('lboxid');
    $(lboxid).show().siblings().hide();
    $('.lboxed').lightbox_me({
      centered: true
    });
  })
  $(this).on('change', '.check-all', function(){
    var checked = $(this).prop('checked');
    $(this).closest('table').find('input[type="checkbox"]').prop('checked', checked);
  });
});