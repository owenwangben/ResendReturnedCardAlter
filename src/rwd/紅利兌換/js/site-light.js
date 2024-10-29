$(document).ready(function(){

  $('.mobile-nav-toggle').mToggleMenu('.mobile-menu','.big-container','.wrapper_1');

  autoScaling();
  $(window).resize(function(){
    autoScaling();
  });
  $(document).on('change', '.check-disabled', function(){
    var ctrls = $(this).closest('.check-disabled-group').find('input, select').not('.check-disabled');
    ctrls.prop('disabled', !ctrls.prop('disabled'));
  });
	
});

function autoScaling() {
  var $width = $(window).width(), $pcent,
      $base = 1024, $mbl = 640;
  if ($base > $width && $width > $mbl) {
    $pcent = ($width / $base) * 100;
    $('html').css('font-size',$pcent + '%');
  } else if ($mbl >= $width) {
    $pcent = ($width / $mbl) * 100;
    $('html').css('font-size',$pcent + '%');
  } else {
    $('html').css('font-size','');
  }
}

(function($){

  $.fn.mToggleMenu = function(mMenuSelector,masterContainer,wrapper){ // 左側選單 plugin
    var menuOpen = false,
        $has3d = has3d(); // uses for no translate3d

    if (!$has3d) {
      $(mMenuSelector).addClass('no3d');
    }

    $(this).click(function(){
      if (menuOpen ^= true) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    $(window).resize(function(){
      if (menuOpen && $(window).width() > 640) {
        closeMenu();
        menuOpen = false;
      }

      if (menuOpen && !$has3d) {
        $(masterContainer).css({
          width: $(window).width() - $(mMenuSelector).width(),
          height: $(window).height()
        });
      }
    });

    function openMenu(){
      $(wrapper).addClass('blocked');
      $('body').delegate(wrapper,'click touchstart touchmove',function(e){
        closeMenu();
        menuOpen = false;
      });

      if (!$has3d) {
        $(masterContainer).css({
          position:'absolute'
        }).animate({
          left: $(mMenuSelector).width()
        },'fast', function(){
          $(this).css({
            width: $(window).width() - $(mMenuSelector).width(),
            height: $(window).height()
          });
        });
        $('body').css({
          overflow: 'hidden'
        });
        $(mMenuSelector).show().animate({
          left: 0
        },'fast');
        return true;
      }

      $(masterContainer).addClass('menuOpened');
    }

    function closeMenu() {
      $(wrapper).removeClass('blocked');
      $('body').undelegate(wrapper,'click touchstart touchmove');

      if (!$has3d) {
        $(masterContainer).animate({
          width: $(window).width(),
          left: 0
        },'fast',function(){
          $(this).css({
            position: '',
            width: '',
            height: '',
            left: ''
          });
          $('body').css({
            overflow: ''
          });
        });
        $(mMenuSelector).animate({
          left: "-" + $(this).width()
        },'fast',function(){
          $(this).hide().css('left','');
        });
        return true;
      }

      $(masterContainer).addClass('reset');
      setTimeout(function(){
        $(masterContainer).removeClass('menuOpened reset');
      },350);
    }

    function has3d() {
      if (!window.getComputedStyle) {
        return false;
      }
      var el = document.createElement('p'), 
          has3d,
          transforms = {
            'webkitTransform':'-webkit-transform',
            'OTransform':'-o-transform',
            'msTransform':'-ms-transform',
            'MozTransform':'-moz-transform',
            'transform':'transform'
          };
      document.body.insertBefore(el, null);
      for (var t in transforms) {
        if (el.style[t] !== undefined) {
          el.style[t] = "translate3d(1px,1px,1px)";
          has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
        }
      }
      document.body.removeChild(el);
      return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
    }
  }

})(jQuery);