$(document).ready(function(){

  $('.mobile-nav-toggle').mToggleMenu('.mobile-menu','.big-container','.wrapper_1');

  autoScaling();
  $(window).resize(function(){
    autoScaling();
  });

  $('.selectWrapper').dropdown();

});

function autoScaling() {
  var $width = $(window).width(), $pcent,
      $base = 1024, $mbl = 640;
  if ($base > $width && $width > $mbl) {
    $pcent = ($width / $base) * 100;
    $('body').css('font-size',$pcent + '%');
  } else if ($mbl >= $width) {
    $pcent = ($width / $mbl) * 100;
    $('body').css('font-size',$pcent + '%');
  } else {
    $('body').css('font-size','');
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


  $.fn.dropdown = function(){

    var ua = window.navigator.userAgent,
        isMac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false,
        msie = ua.indexOf('MSIE '),
        winnt = ua.indexOf('Windows NT '),
        ieVer = 0,
        WinVer = 0,
        selector = this.selector;

    if (msie == -1) {
      msie = ua.indexOf('; rv:');
    }
    if (msie > 0) { 
      ieVer = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)));
    }
    if (winnt > 0) {
      WinVer = parseFloat(ua.substring(winnt + 11, ua.indexOf(';', winnt)));
    }

    $(document).ajaxComplete(function(){
      init($(selector));
    });

    init($(this));
    function init($this) {
      $($this).each(function(k,v){
        if ($(v).find('.select .selected').hasClass('disabled')) {
          $(v).addClass('disabled');
        }
        if ($(v).find('input[type=hidden]').data('type') === 'date') {
          genDate($(v));
        }
        if ($(v).find('.select .selected').text().trim() !== '') {
          return;
        } else if ($(v).find('.optionsMid li.on').length) {
          $(v).find('.select .selected').text($(v).find('.optionsMid li.on').text());
          writeInput($(v), $(v).find('.optionsMid li.on'));
        } else if ($(v).find('.optionsMid li').length) {
          $(v).find('.select .selected').text($($(v).find('.optionsMid li')[0]).text());
          writeInput($(v), $($(v).find('.optionsMid li')[0]));
        }
      });
    }

    function writeInput(obj, $this) {
      var $objinput = obj.find('input[type="hidden"]');
      $objinput.val($this.data('value') !== undefined ? $this.data('value') : $this.text());
      if ($objinput.attr('onchange') !== undefined) {
        if ($objinput.attr('onchange').trim() === '') { //trim if $objinput undefined will get error
          $objinput.change();
        }
      } else if ($objinput.attr('onchange') === undefined) {
        $objinput.change();
      }
    }

    function genDate($this) {

      if ($this.data('date-rendered')) {
        return;
      }

      var $input = $this.find('input[type=hidden]'),
          $dategroup = $input.data('dategroup'),
          $datetype = $input.data('datetype'),
          $gregorian = $input.data('dategregorian'),
          $offset = $input.data('dateoffset'),
          $default_value = $input.data('defvalue'),
          $date = new Date(),
          $yyyy = $date.getFullYear(),
          $lis = [];

      switch ($datetype) {
        case 'year':
          if ($gregorian === undefined || $gregorian === false) {
            for (var $i = 1; $i <= ($yyyy - 1911); $i++) {
              var $li = document.createElement('li');
              $li.setAttribute('data-value',$i);
              $li.appendChild(document.createTextNode($i + '年'));
              if ($i === $default_value) {
                $li.setAttribute('class','on');
              }
              $lis.push($li);
            }
          } else if ($gregorian) {
            for (var $i = 0; $i < $offset; $i++) {
              var $li = document.createElement('li');
              $li.setAttribute('data-value',$yyyy + $i);
              $li.appendChild(document.createTextNode($yyyy + $i + '年'));
              if (($yyyy + $i) === $default_value) {
                $li.setAttribute('class','on');
              }
              $lis.push($li);
            }
          }
          break;
        case 'month':
          for (var $i = 1; $i <= 12; $i++) {
            var $li = document.createElement('li');
            $li.setAttribute('data-value',$i);
            $li.appendChild(document.createTextNode($i + '月'));
            if ($i === $default_value) {
              $li.setAttribute('class','on');
            }
            $lis.push($li);
          }
          break;
        case 'day':
          var $groupyear, $groupmonth, $groupdays;
          $(selector).find('input[type=hidden]').each(function(k,v){
            if ($(v).data('dategroup') === $dategroup) {
              switch ($(v).data('datetype')) {
                case 'year':
                  $groupyear = $(v).val() ? parseInt($(v).val()) : 0;
                  if ($(v).data('dategregorian') === undefined || $(v).data('dategregorian') === false) {
                      $groupyear = $groupyear+1911;
                  }
                  break;
                case 'month':
                  $groupmonth = $(v).val() ? parseInt($(v).val()) : 0;
                  break;
                default:
                  return false;
              }
            }
          });
          if ($groupyear !== 0 || $groupmonth !== 0) {
            $groupdays = new Date($groupyear, $groupmonth, 0).getDate();
          }

          for (var $i = 1; $i <= $groupdays; $i++) {
            var $li = document.createElement('li');
            $li.setAttribute('data-value',$i);
            $li.appendChild(document.createTextNode($i + '日'));
            if ($i === $default_value) {
              $li.setAttribute('class','on');
            }
            $lis.push($li);
          }
          break;
      }
      $this.find('.optionsMid ul').html($lis);

      if ($datetype === 'year' || $datetype === 'month') {
        $input.on('change', function(){
          $(selector).find('input[type="hidden"]').each(function(k,v){
            if ($(v).data('dategroup') === $dategroup && $(v).data('datetype') === 'day') {
              var $daySelect = $(v).closest(selector);
              $daySelect.data('date-rendered', false).find('.select .selected').text('');
              init($daySelect);
            }
          });
        });
      }

      $this.data('date-rendered',true);
    }

    $(document).on('mouseenter touchstart', selector, function() {

      if ($(this).data('dpstate') === 'rendered') {
        return this;
      }

      var obj = $(this),
          options = obj.find('.options'),
          select = obj.find('.select'),
          selected = obj.find('.selected');

      if (ieVer > 0 && WinVer > 6.1) {
        overoption = false;
        $(options).hover(function(){
          overoption = true;
        }, function(){
          overoption = false;
        });
        $(document).mouseup(function(e){
          if (!overoption) {
            $(options).slideUp('fast');
          }
        });
      } else {
        $(document).mouseup(function(e){
          if (!options.is(e.target) && (options.has(e.target).length === 0)) {
            $(options).slideUp('fast');
          }
        });
      }

      if (isMac) {
        obj.addClass('macscroll');
      }

      select.click(function() {
        if(obj.hasClass('disabled')){
          return false;
        }
        if (!options.is(':visible')) {
          options.slideDown( 'fast');
          if (options.data('initScroll') === undefined && options.find('.optionsMid ul li.on').length) {
            options.find('.optionsMid').scrollTop(options.find('.optionsMid ul li.on').position().top - 6);
            options.data('initScroll',true);
          }
        } else {
          options.slideUp( 'fast');
        };
      });
      
      options.on('click', 'li', function() {
        options.slideUp('fast').find('li.on').removeClass('on');
        $(this).addClass('on');
        selected.text($(this).text());
        writeInput(obj, $(this));
      });
      
      obj.data('dpstate','rendered');

    });

    return this;
  };

})(jQuery);