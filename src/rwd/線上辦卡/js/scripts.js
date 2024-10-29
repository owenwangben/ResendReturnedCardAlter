$(document).ready(function(){

  $('.open-lbox').click(function(e){
    e.preventDefault();
    var $lboxid = $(this).data('lboxid');
    openlbox($lboxid);
  });

  var owl = $('.cards-carousel');
  owl.owlCarousel({
    items: 1,
    nav: true,
    dots: true,
    center: true,
    loop: false,
    navText: ['',''],
    navContainer: '.carousel-nav .nav',
    dotsContainer: '.carousel-nav .dots',
    onInitialized: function(e) {
      changeCard(e);
      jump2Card(247038);
    },
    onTranslated: function(e) {
      changeCard(e);
    },
    responsive: {
      961: {
        margin: 20,
        stagePadding: 0
      },
      769: {
        margin: 40,
        stagePadding: 0
      },
      0: {
        margin: 0,
        stagePadding: 0
      }
    }
  });

  $('#card-type').on('change', function(){
    var val = $(this).val();
    $('#apply-card').val(val);
    $('.cards-carousel .owl-item.active img.selected').fadeOut('fast', function(){
      var card_type = $(this).removeClass('selected').siblings('img[data-card-type-id="'+ val +'"]').addClass('selected').fadeIn('fast').data('card-type');
      $('#card-type').siblings('.icons').removeClass().addClass('icons icon-' + card_type);
    });
  });

  function changeCard(e) {

    var cards_block = $('.cards-showroom-block'),
        current_card = $(e.target).find('.owl-item.active .card-holder'),
        current_card_types = current_card.find('img'),
        current_card_value = current_card.find('img.selected').data('card-type-id'),
        current_card_type = current_card.find('img.selected').data('card-type'),
        cards_lightbox = $('#choose-cards');

    cards_block.find('fieldset legend .card-name').html(current_card.data('title')); // 變更信用卡名稱
    $('#apply-card').val(current_card_value); // hidden input 的 value

    if (e.page.index < 0) {
      e.page.index = 0;
    }
    cards_lightbox.find('input[data-carousel-index="' + e.page.index + '"]').prop('checked', true);

    var card_select = $('#card-type'); // 發卡商類別下拉
    card_select.html('');
    $(current_card_types).each(function(k,v){
      if ($(v).data('card-type-id') == current_card_value) {
        card_select.append($('<option></option>').val($(v).data('card-type-id')).text($(v).data('card-title')).prop('selected', true));
        card_select.siblings('.icons').removeClass().addClass('icons icon-' + current_card_type)
      } else {
        card_select.append($('<option></option>').val($(v).data('card-type-id')).text($(v).data('card-title')));
      }
    });
  }

  function jump2Card(cardid) {
    var current_card, owl_index;
    if (cardid == undefined) {
      return false;
    }
    current_card = owl.find('img[data-card-type-id="'+cardid+'"]');
    if (current_card.length == 0) return false;
    owl_index = $(current_card[0]).closest('.card-holder').data('owl-index');
    current_card.each(function(k,v){
      $(v).show().addClass('selected').siblings().hide().removeClass('selected');
    });
    setTimeout(function() {
      owl.trigger('to.owl.carousel', owl_index);
    }, 1);
  }

  $('#choose-cards').on('click', 'input[type="radio"]', function(){
    var index = $(this).data('carousel-index');
    owl.trigger('to.owl.carousel', index);
    $('.lboxed').trigger('close');
  });

  $('.tab-block').on('click', 'li a', function(e){
    e.preventDefault();
    var tabid = $(this).data('tabid'),
        tab_content = $('.tab-content');

    $(this).parent().addClass('active').siblings().removeClass('active');
    tab_content.find(' > div:visible').removeClass('active').fadeOut(125, function(){
      tab_content.find(tabid).fadeIn(125);
    });
  });

  $(document).on('change', '.check-disabled', function(){
    var ctrls = $(this).closest('.check-disabled-group').find('input, select').not('.check-disabled');
    ctrls.prop('disabled', !ctrls.prop('disabled'));
  });

  var $input_date = $('.ctrl-date');
  if ($input_date.prop('placeholder') == '') {
    $input_date.prop('placeholder',new Date().toDateInputValue());
  }

  $(document).on('change', '.upload-img', function() {
    var file_path = $(this).val();
    if (file_path !== '') {
      file_name = file_path.split('\\').pop().split('#')[0].split('?')[0];
      $(this).siblings('.filename')
             .find('.remove').show()
             .siblings('span').text(file_name);
    }
  });

  $(document).on('click', '.id-upload-block .remove', function(e){
    e.preventDefault();
    $(this).closest('.id-upload-block')
           .find('input[type=file]').val('')
           .siblings('.filename').find('.remove').hide()
           .siblings('span').text('');
  });

  $(document).on('click', '.toggle-inputs, .toggle-inputs + .tooltip:visible', function(){
    var block = $(this).closest('.switch-input');
    block.find('.artfld:hidden').show().siblings('.artfld').hide();
    block.find('.tooltip p:hidden').show().siblings('p').hide();
  });

  
});

function openlbox($lboxid) {
  var src_top = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
  $('.lbox-block').find($lboxid).show().siblings().hide();

  if ($lboxid === '#application') {
    $('.lboxed').lightbox_me({
      centered: false,
			closeClick: false, 
			modalCSS:{top: '0px'},
      onLoad: function(){
        scrollTo($('.lboxed').offset().top);
        $('.lboxed').css('top','0');
      },
      onClose: function(){
        scrollTo(src_top);
          $('.nav-tab:first-child').addClass('nav-tab-active').siblings().removeClass('nav-tab-active');
      },
      overlayCSS: {
        background: 'black', opacity: .8
      }
    });

  } else {
    $('.lboxed').lightbox_me({
      closeClick: false,
      centered: true,
      onLoad: function(){
        scrollTo($('.lboxed').offset().top);
      },
      onClose: function(){
        scrollTo(src_top);
      },
      overlayCSS: {
        background: 'black', opacity: .8
      }
    });

  }
  
}

function scrollTo(pos) {
  $('html, body').animate({
    scrollTop: pos
  },250);
}

Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setFullYear(this.getFullYear() - 20);
  return "例：" + local.toJSON().slice(0,10).replace(/-+/g, '');
});