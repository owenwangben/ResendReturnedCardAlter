$('.filter-tab a').click(function(e){ 
  e.preventDefault();
  if (!$(this).parent().hasClass('active')) {
    $('.filter-panel').removeClass('hide');
  } else {
    $('.filter-panel').addClass('hide');
  }
  $tabid = $(this).data('tabid');
  $(this).parent().toggleClass('active').siblings().removeClass('active');
  $($tabid).addClass('active').siblings().removeClass('active');
  if ($tabid === '#t5') {
    $('.filter-widget .emb-search').show();
  } else {
    $('.filter-widget .emb-search').hide();
  }
  setScrollHeight('.dyn-scroll-height', '.filter-options.active');
  updateScrollbar();
});
$('.filter-listing .cancel').click(function(e){
  e.preventDefault();
  $(this).parent().remove();
});
(function(){
  $(document).on('click','.fund-compare-count', function(e){
    e.preventDefault();
    $('.fund-compare-popup').addClass('open');
  });
  $(document).on('click', function(e){
    if (onTarget(e, '.observe-popup.open')) {
      return true;
    }
    if ($('.obs-list').is(e.target)) {
      e.preventDefault();
      $('.observe-popup.open').removeClass('open');
      $(e.target).closest('.observe').find('.observe-popup').toggleClass('open');
    } else {
      $('.observe-popup.open').removeClass('open');
    }
  });
  $(document).on('click', '.observe-popup .nbtn', function(e){
    e.preventDefault();
    $('.observe-popup.open').removeClass('open');
  });
  $(document).on('click', function(e){
    if (onTarget(e, '.fund-compare-popup.open, .fund-compare-count')) {
      return true;
    }
    $('.fund-compare-popup.open').removeClass('open');
  });
  $(document).on('click', '.fund-compare-popup .btn-zone .close', function(e){
    e.preventDefault();
    $('.fund-compare-popup').removeClass('open');
  });

  function onTarget(e, elem) {
    return $(elem).is(e.target) || $(elem).has(e.target).length;
  }

  $('.fund-mobile-menu .sbnav li a').click(function(e){
    e.preventDefault();
    if ($(this).attr('href').trim() === '' || $(this).attr('href').trim() === '#') {
      $(this).siblings('.sbnav').slideToggle();
    }
  });

  $('.filter-options input[type="checkbox"]').on('change', function(){
    checkFilters();
  });
  $(document).ajaxComplete(function(){
    checkFilters();
  });

  function checkFilters() {
    var $fl, $count=0;
    $('.filter-result > ul > li').each(function(k,v){
      $fl = $(v).find('.item ul');
      if ($fl.hasClass('filter-listing')) {
        if($fl.find('li').length === 0) {
          $(v).removeClass().hide();
        } else {
          $count++;
          $(v).show();
        }
      }
      return $count;
    }).promise().done(function(args){
      if ($count > 0) {
        $('.fund-clear-all').show();
      } else {
        $('.fund-clear-all').hide();
      }
    });
  }

  $('.data-table-main3').on('click', '.fund-ranking .UpdateCompare', function(e){
    if ($('.fund-ranking .UpdateCompare:checked').length > 6) {
      e.preventDefault();
      return false;
    }
  });

}());