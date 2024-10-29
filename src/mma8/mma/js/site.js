var $scrolling_table = $('.scrolling_table'),
    renderedTabs = false;

function loadMenu() {

    //20160607 for new style datePikder

    $(".datePicker li").append('<span class="checkmark" style="display:none;"><span></span></span>');
    $(".datePicker li").click(function() {                             
        $(this).toggleClass('on').children('span.checkmark').toggle();
    });
    $('.dateallclear').click(function() { 
        $(".datePicker li").removeClass('on').children('span.checkmark').hide();
    });
    $('.dateselectall').click(function() { 
        $(".datePicker li").addClass('on').children('span.checkmark').show();
    });
    //20160518
    $(".rowElem .selectWrapper").not('.disabled').click(function (e) {
        $(this).siblings('.ffRadioWrapper').find('.ffRadio').click();   
    }); 
    //My common functions 20160316 start--
    $('.full-func').hide();
    $('.showall').click(function(e){
        $('.left-func,.right-func').fadeOut().hide();
        $('.full-func').fadeIn().show();
        $('.slide-menu-wrapper,.menu_iframe').addClass('tall');
    });
    function settingreset() {
        
            $('.full-func').fadeOut();
            $('.left-func,.right-func').fadeIn();
            $('.slide-menu-wrapper').removeClass('tall');
        
    }
    $('.shownormal').click(function(e){
        settingreset();
    });

    
    //20160226
    $('.mdownload .btn a').bind('mouseover', function()
    {
        $('.mdownload .bubblebox').show();
    });
    $('.mdownload .btn a').bind('mouseout', function()
    {
        var menu = this;
        setTimeout(function()
        {
            $('.mdownload .bubblebox').hide();
        }, 1500);
    });
    //20160226
    
    $('.vfoot').find('li:first-child').addClass('first');//20160226
    $('.vfoot').find('li:last-child').addClass('last');//20160226
    $('.cfund tr').find('td:nth-child(1),td:nth-child(3),td:nth-child(4),td:nth-child(5),td:nth-child(6)').addClass('nowrap'); //20150921
    $('.kb-block a').addClass('gradient'); //20160105
    $('.kb-block a').click(function(e){e.preventDefault();}); //20160105
    $('.data-table tr:last-child').find('th, td').css('border-bottom','none');
    $('.fund_msg tr').find('td:nth-child(5),td:nth-child(6)').addClass('nowrap'); //20150921
    $('.cashtable tr').find('td:first-child').addClass('fontw');//20150924 
    $('#allon,#alloff').click(function(e){   //20150921
        e.preventDefault();
    });
    $('.dynlast li:last-child').addClass('last');
    $('.dynlast-bt li:last-child a').addClass('clear-last-bt');

    if ($('.index_fund .rowElem,.con_fund .rowElem,.con_bondinsure .rowElem').length) {
        $('.index_fund .rowElem,.con_fund .rowElem,.con_bondinsure .rowElem').fancyfields();
    }
    if ($('.index-login .rowElem input').length) {
        $('.index-login .rowElem input').ie89placeholder();
    }
    $('.selectWrapper').dropdown();
    $(".cashtable").each(function(){
        $(this).find("tr:even").addClass("row2");
        $(this).find("tr:odd").addClass("row1");
    }); //20150924
    
    
    //20150924
    var labelID;

    $('label').click(function() {
           labelID = $(this).attr('dataname');
           $('#'+labelID).trigger('click');
    });
    //20150924
    
    (function(){
        var checkscrolling = setInterval(function(){
            if ($('.scrolling_table').length) {
                $scrolling_table = $('.scrolling_table');
                $scrolling_table.tinyscrollbar();
                clearInterval(checkscrolling);
                fixAssetsTableHead();
            }    
        },500);
    }());

    if ($('.datepicker').length) {
        $( '.datepicker' ).datepicker({
            showOn: 'both',
            buttonImage: '/MMA8/mma/images/calendar.gif',
            buttonImageOnly: true,
            dateFormat: 'yymmdd',
            regional: "zh-TW"
        });
    }
    
    var hptparam = getUrlParameter('ID');
    if (typeof hptparam !== "undefined") {
        $('section.sub-menu .sbnav-lv1 > li').each(function(){
            if(hptparam == $(this).attr('index')) {
                $(this).addClass('active');
            }
        });
    }
    function moneyFormat(str){
        if(str.length<=3) {
            return str;
        } else {
            return moneyFormat(str.substr(0,str.length-3))+','+(str.substr(str.length-3));
        }
    }

    var searchOpen = 0,
        searchadj = true;
        
    function schop2adjpos() {
        if (searchadj) {
            sblock = parseInt($('.search-block').css("top"));
            ctspopup = $('.search-block').offset().top;
            searchadj = false;
        }
        $('.search-block').css("top",sblock * 2 - ctspopup);
    }
        
    var ffClick = true;
    $('#icon-search').click(function(e){
        e.preventDefault();
        if (searchOpen ^= 1) {
            $(this).addClass('active');
            $('#search-block').show();
            schop2adjpos();
            if (ffClick) {
                searchKeyword();
                searchAutocomplete();
                $('.srowElem,.search-area .rowElem').fancyfields();
                ffClick = false;
            }
        } else {
            $(this).removeClass('active');
            $('#search-block').hide();
        }
    });

    //20150924-------------------------------for plus minus button--------------
    $(".qtybutton").on("click", function() {

      var $button = $(this);
      var oldValue = $button.parent().find("input").val();
    
      if ($button.text() == "+") {
          var newVal = parseFloat(oldValue) + 1;
        } else {
       // Don't allow decrementing below zero
        if (oldValue > 0) {
          var newVal = parseFloat(oldValue) - 1;
        } else {
          newVal = 0;
        }
      }
    
      $button.parent().find("input").val(newVal);
    
    }); 
    
    //20150924-------------------------------for plus minus button--------------

    $(document).mouseup(function(e){
        var searchBlock = $('#search-block');
        if (onTarget(e, searchBlock)) {
            searchBlock.hide();
            $('#icon-search').removeClass('active');
        }
        var slideMenuWrapper = $('.slide-menu-wrapper');
        if (onTarget(e, slideMenuWrapper)) {
            settingreset();//20160316
            slideMenuWrapper.slideUp('fast');
            $('.menu_iframe').slideUp('fast').removeClass('tall'); //20160316
            $('.nav-lv1 .watermark').slideUp('fast');
            slideMenuWrapper.find('.container').fadeOut(250);
        }
        var sbnavlv2 = $('.sbnav-lv2');
        if (onTarget(e, sbnavlv2)) {
            sbnavlv2.hide();
            $('.sbnav-iframe').hide();
        }
        var sbnavlv3 = $('.sbnav-lv3');
        if (onTarget(e, sbnavlv3)) {
            sbnavlv3.hide();
        }
    });

    function onTarget(e,selector) {
        return (!selector.is(e.target) && (selector.has(e.target).length === 0));
    }

    var currMenu = null;
    $('.nav-lv1 > li a').click(function(e){
        if (checkHref2go(e.target)) {
            e.preventDefault();
            var theClass = $(this).parent().attr('class');
            if (theClass.indexOf(currMenu) == -1) {
                $('#' + $(this).parent().data('mid')).fadeIn(250);
                $('.nav-lv1 a').removeClass('active');
                $(this).addClass('active');
                $(this).parent().find('.watermark').slideDown('fast');
                $('.slide-menu-wrapper').slideDown('fast');
                settingreset();//20160316
                $('.menu_iframe').slideDown('fast').removeClass('tall');//20160316
                currMenu = theClass;
            } else {
                currMenu = null;
            }
        }
    });

    if ($('.index_fund section.sub-menu.lsmfund, .con_fund section.sub-menu.lsmfund, .con_bondinsure section.sub-menu').length) {
        (function(){
            var checksbnav = setInterval(function(){
                if ($('.sbnav-lv1 > li').length) {
                    bindingSbnav();
                    hoverSubMenu('.sbnav-lv1 > li', '.sbnav-lv2');
                    hoverSubMenu('.sbnav-lv2 > li', '.sbnav-lv3');
                    clearInterval(checksbnav);
                }
            },500);
        }());
    } else {
        $('.sbnav-lv1 > li').click(function(e){
           if (checkHref2go(e.target)) {
                e.preventDefault();
                click_left_menu(this);
            }
        });
    }

    function bindingSbnav() {
    $('.sbnav-lv1 > li').click(function(e){
        if (checkHref2go(e.target)) {
            e.preventDefault();
            click_left_menu(this);
        }        
        subMenuToggle(this,'.sbnav-lv2','show');
    });
    $('.sbnav-lv2 > li').click(function(e){
        if (checkHref2go(e.target)) {
            e.preventDefault();
        }
        subMenuToggle(this,'.sbnav-lv3','show');
    });
    }

    function hoverSubMenu (main, sub) {
        var timeout;
        var currSubMenu = undefined;
        $(main).hover(function(){
            var $this = this;
            timeout = setTimeout(function() {
                if (currSubMenu != $this) {
                    subMenuToggle(currSubMenu,sub,'hide');
                    currSubMenu = $this;
                }
                subMenuToggle($this,sub,'show');
            }, 300);
        },function(){
            clearTimeout(timeout);
        });
    }

    $('.sbnav-lv2 > li').each(function(){
        if ($(this).find('.sbnav-lv3').length) {
            $(this).find('> a').addClass('sbnav-arrow');
        }
    });

    function subMenuToggle(data,selector,toggle) {
        if (toggle == 'show') {
            $(data).find(selector).length && $(data).find(selector).show('slide',{direction: 'left'},'fast')
                && $(data).find('.sbnav-iframe').show('slide',{direction: 'left'},'fast');
        } else if (toggle == 'hide') {
            $(data).find(selector).length && $(data).find(selector).hide('slide',{direction: 'left'},'fast')
                && $(data).find('.sbnav-iframe').hide('slide',{direction: 'left'},'fast');
        }
    }

    var toggle = 0;
    $('.balance-zoomin').click(function(e){
        e.preventDefault();
        toggle ^= 1;
        $(this).hide();
        $('.balance-zoomin').eq(toggle).show();
        $('.data-table-main2').find('tr').each(function(){
            $(this).find('td').eq(2).toggleClass('zoom18');
            $(this).find('td').eq(3).toggleClass('zoom18');
        });
        fixAssetsTableHead();
    });

    if ($('.cycle-slideshow').length) {
        var currSlide = undefined;
        cycleSlide = $('.cycle-slideshow');
        cycleSlide.on('cycle-update-view', function(e, optionHash, API, html){
            if (currSlide != API.currSlide) {
                overlay_block = API.cycleOverlayCustom;
                overlay_tpl_block = API.cycleOverlayCustomTemplate;
                overlay_target = $(html).find(overlay_tpl_block)[0].outerHTML;
                $(overlay_block).html(overlay_target);
                $(overlay_block + ' ' + overlay_tpl_block).fadeIn('fast');
                currSlide = API.currSlide;
            }
        });
        cycleSlide.on('cycle-initialized',function(e, optionHash){
            if (optionHash.cycleMainWordingSwitch) {
                $('.cycle-pager').find('span:first-child').addClass('home').text(optionHash.cycleMainWording);
            }
        });
    }

    justify_Let('.update-info .info1 .th');
    function justify_Let(obj){
        var obj=$(obj);
        var lengths=[];
        obj.each(function(){
            lengths.push($(this).text().length);
        });
        if(lengths.length==0){return;}
        for(var i=0,smax=lengths[0],len=lengths.length;i<len;i++){
            if(lengths[i]>smax){
                smax=lengths[i];
            }
        }
        for(var i=0,len=lengths.length;i<len;i++){
            var currlen=lengths[i];
            if(currlen==smax){continue;}
            obj.eq(i).css({'letter-spacing': (((smax-currlen)/(currlen-1))-1)+'em'});
        }
    }
    
    $('.maction').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('action_open');
        $(this).parent().siblings('.showlist').slideToggle();
     });

    (function(){
        var checkflist = setInterval(function(){
            if ($('.toggle-footlist').length) {
                toggleFootList();
                clearInterval(checkflist);
            }
        },500);
    }());
    
    function toggleFootList() {
        var toggleFoot = 0;
        $('.toggle-footlist').click(function(){
            toggleFoot ^= 1;
            $('footer .footer-list').slideToggle({
                duration: 400,
                start: function(){
                    if (toggleFoot) {
                        checkFooterbdTop();
                    }
                    $('html, body').animate({
                        scrollTop: document.body.scrollHeight
                    },400);
                },
                complete: function(){ 
                    if (!toggleFoot) {
                        checkFooterbdTop();
                    }
                    $('.toggle-footlist .tglfl').eq(toggleFoot ^ 1).fadeOut(100,function(){
                        $('.toggle-footlist .tglfl').eq(toggleFoot).fadeIn();                    
                    });
                }
            });
        });
    }

    if ($('div.con_bondinsure .sbnav-lv1').length) {
        $('div.con_bondinsure .sbnav-lv1').iframeOverJava();
    }

    $(document).ready(function(){
        
        $("#mcf").click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('#mcfmenu').fadeToggle('fast');

            var outer = $('.outer_container, .inside_container, #aspnetForm > .container'),
                mcf = $('#mcfmenu').outerHeight() + $('.breadcrumbs').outerHeight();
                
            if ( outer.outerHeight() < mcf ) {
              outer.height(mcf);
            }
        });
        $("#mcfmenu").click(function(e){
            e.stopPropagation();
        });
        $(document).click(function(e){
            $("#mcfmenu").hide();
        });
        
        if(!($('section.sub-menu').is(':visible'))) {
            $("#mcf").css('display','inline-block');
        }
        
        initMiniTabs($('ul.tabs'), true);
        
        var chatType = $(":hidden#chatType").val();
        if(chatType == null)
        {
            chatType = '1';
        }       
        var $livechat_url = 'https://bank.sinopac.com/MMA8/bank/service/livechat_index.html?department=' + chatType + '&site=mma';

        $(".livechat-wrap").find("a").attr("href", $livechat_url);
        
        if (getUrlFilename() == 'HomeNewsMore.aspx') {
            switch (getUrlParameter('page')) {
                case 'event':
                    $('#liActivity a').click();
                    break;
                default:
                    return true;
            }
        }
    });

    setScrollHeight('.dyn-scroll-height', '.filter-options.active');

    $(document).on('click', '.sorting-table .sorting', function(e){
        e.preventDefault();

        $(this).parent().siblings('th').find('.sorting').removeClass('asc desc')
               .closest('tr').siblings('tr').find('.sorting').removeClass('asc desc');

        var state = $(this).hasClass('asc');
        $(this).toggleClass('asc', !state).toggleClass('desc',state);
    });

    $(document).on('click', '.openlbox', function(e){
      e.preventDefault();
      $lboxid = $(this).data('lboxid');
      $closeclick = $(this).data('lboxcloseclick') ? true : false;
      $($lboxid).show().siblings().hide();
      if ($(this).data('lboxtop')) {
        $('html, body').scrollTop(0);
      }
      $opentarget = $(this).data('opento');
      if ($opentarget !== undefined) {
        $($opentarget).click();
      }
      $('.lboxed').lightbox_me({
        closeClick: $closeclick,
        centered: false
      });
    });

    $('.togglePanel').click(function(e){
        e.preventDefault();
        $panelid = $(this).data('panelid');
        $($panelid).toggle('display');
        $(this).toggleClass('active');
    });

    $('.art-tab a').click(function(e){
        e.preventDefault();
        $parent = $(this).closest('.art-tab');
        $tabid = $(this).attr('href');
        $(this).addClass('active').parent().siblings().find('a').removeClass('active');
        $($tabid).show().siblings().hide();
    });

    $('.arttooltip').prepend(function(){
        $direction = $(this).data('tipdirection') ? $(this).data('tipdirection') : '' ;
        $tipClass = $(this).data('tipclass') ? $(this).data('tipclass') : '';
        return '<div class="tip-block '+$direction+' '+$tipClass+'">'+$(this).data('tooltiptxt')+'</div>';
    });

    if ($('.enable-cbox').length) {
        $('.enable-cbox').click(function(e){
            if ($(this).attr('href') === '' || $(this).attr('href') === '#') {
                e.preventDefault();
            }
            $($(this).data('cboxid')).prop('disabled', false).closest('.arttooltip').addClass('disabled-tip');
        });
    }
    autofocus();
}

function autofocus() {
    $('.autofocus').keyup(function(){
      if ($(this).val().length >= $(this).attr('maxlength')) {
        $(this).next('.autofocus').focus();
      }
    });
}

function fixAssetsTableHead() {
    $('.assets-fix-head li').each(function(k, v){
        $(v).width($('.fixed-head tr').eq(0).find('td').eq(k).outerWidth());
    });
}

function setScrollHeight(elem, target) {
    $(elem).height($(elem).find(target).height());
}

function playWrapperMask(elem, action)
{
    if (action) {
        $(elem).addClass('masks').html('<div class="loading-data"><img src="/MMA8/mma/images/loading2.gif" /></div>');
    } else {
        $(elem).removeClass('masks').html('');
    }
}

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

function getUrlFilename()
{
    return location.pathname.substring(location.pathname.lastIndexOf('/')+1);
}

function checkFooterbdTop() {
    if ($('footer').hasClass('less')) {
        $('footer').removeClass('less');
    } else {
        $('footer').addClass('less');
    }
}

function updateScrollbar() {
    if ($scrolling_table.length) {
        $scrolling_table.data('plugin_tinyscrollbar').update();
    }
}

function checkHref2go(data) {
    href = $(data).attr('href');
    if (href == '#' || href == '' || href == undefined) {
        return true;
    }
    return false;
}

function initMiniTabs(element, showAll, index) {
    var _showTab = 0, index = parseInt(index);

    if (index >= 0) {
        _showTab = index;
    }

    if (!showAll && index >= 0) {
        var $currentLi = $(element).find('li').addClass('disabled').eq(_showTab).removeClass('disabled');
        $($currentLi.find('a').attr('href')).show().siblings().hide();
    } else {
        var $currentLi = $(element).find('li').removeClass('disabled');
        $($currentLi.eq(_showTab).find('a').attr('href')).show().siblings().hide();
    }

    var $defaultLi = $(element).find('li').removeClass('active').eq(_showTab).addClass('active');
    $($defaultLi.find('a').attr('href')).siblings().hide();
    
    if (renderedTabs) {
        return false;
    }

    $(element).find('li').click(function() {

        if ($(this).hasClass('disabled')) {
            return false;
        }
        var $this = $(this),
            _clickTab = $this.find('a').attr('href');

        $this.addClass('active').siblings('.active').removeClass('active');
        $(_clickTab).stop(false, true).fadeIn().siblings().hide();

        return false;
    }).find('a').focus(function(){
        this.blur();
    });
    renderedTabs = true;
}

(function($){
    $.fn.ie89placeholder = function () {
      
      var ua = window.navigator.userAgent,
          msie = ua.indexOf('MSIE '),
          ieVer = 0;

      if (msie > 0) { 
        ieVer = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)));
      }

      if (ieVer > 9 || ieVer < 7) {
        return true;
      }

      $(this).each(function(){
        $(this).closest('.rowElem').find('.ie89placeholder').text($(this).attr('placeholder')).show().click(function(){
            $(this).hide().closest('.rowElem').find('input').focus();
        });
      });
      $(this).focus(function(){
        $(this).closest('.rowElem').find('.ie89placeholder').hide();
      });
      $(this).blur(function(){
        if($(this).val() == '') {
            $(this).closest('.rowElem').find('.ie89placeholder').show();
        }
      });
      $(this).keypress(function(){
          $(this).closest('.rowElem').find('.ie89placeholder').hide();
      });
    };
})(jQuery);

(function($){

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
            // $(v).addClass('disabled');
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
(function($){
    $.fn.iframeOverJava = function(){
        $(this).find('.sbnav-lv2').each(function(){
            $('<iframe/>',{
                href: "/MMA8/mma/blank.html",
                "class": "sbnav-iframe",
                frameborder : 0,
                width: $(this).width(),
                height: $(this).height()
            }).insertAfter(this);
        });
    };
})(jQuery);


// fed end

var global_menu;
var local_menu;
var footer_menu;
var leftTpl;
var rightTpl;
var adTpl_1;
var adTpl_2;
var footerTpl;

function load_left(name, c) {
  for (var i = 0; i < global_menu.items.length; i++) {
    if (global_menu.items[i].description == name) {
      local_menu = global_menu.items[i];
      var leftHtml = Mustache.to_html(leftTpl, local_menu);
      $('#left-menu').html(leftHtml);
      var rightHtml = Mustache.to_html(rightTpl, local_menu.items1[c]);
      $('#right-menu').html(rightHtml);
      break;
    }
  }
}
var click_left_menu = function(data) {
  if (local_menu != null) {
    var i = $(data).attr('index');
  }
};
function renderAd(block, json, i) {
  var adTemplate;
  if (json.ads[i].items.length == 1) {
    adTemplate = adTpl_1;
  }
  else if (json.ads[i].items.length == 2) {
    adTemplate = adTpl_2;
  }
  var html = Mustache.to_html(adTemplate, json.ads[i]);
  $('#'+block).html(html);
}
function redirectto(url, open_window) {
  validNavigation = true;
  if (open_window == '1') window.open(url);
  else window.location = url;
}

var menuTpl = $('#menuTpl').html();
var subTpl = $('#subTpl').html();
var rootTpl = $('#rootTpl').html();
leftTpl = $('#leftTpl').html();
rightTpl = $('#rightTpl').html();
adTpl_1 = $('#adTpl_1').html();
adTpl_2 = $('#adTpl_2').html();
footerTpl = $('#footerTpl').html();

function sendMenu() {
$.ajax({
  type: 'POST',
  url: mma_path + '/Shared/ws_WebMenu.ashx',
  jsonpCallback: 'jsonCallback1',
  dataType: 'jsonp',
  data: 'mmacat=web+webShortcuts&callback=jsonCallback1' + external_site,
  error: function(xhr) {
  },
  success: function(response) {
    if (response != null) {
      global_menu = response;
      var mainHtml = Mustache.to_html(menuTpl, response);
      var subHtml = Mustache.to_html(subTpl, response);
      var rootHtml = Mustache.to_html(rootTpl, response.global);
      $('#main-menu').html(mainHtml);
      $('#slide-menu-wrapper').html(subHtml);
      $('#myassets').html(rootHtml);
      $("#bondinsureAll").remove();
      $("#funcashierAll").remove();
      if ('undefined' !== typeof load_left_menu) {
        load_left_menu();
      }
      loadMenu();
    }
  }
});
}
function loadRate(postSource,tplName,blockName, callbackName) {
$.ajax({
  type: "POST",
  url: postSource,
  jsonpCallback: callbackName,
  dataType: 'jsonp'
})
.done(function(html) {
  var d = html[0].SubInfo;
  for (var i in d) {
    var c = -1;
    var cname = d[i].DataValue5;
    if ( cname == null ) cname = d[i].DataValue4;
    if (!Array.prototype.indexOf)
    {
      Array.prototype.indexOf = function(elt /*, from*/)
      {
        var len = this.length >>> 0;
    
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
             ? Math.ceil(from)
             : Math.floor(from);
        if (from < 0)
          from += len;
    
        for (; from < len; from++)
        {
          if (from in this &&
              this[from] === elt)
            return from;
        }
        return -1;
      };
    }
    if ((c = currency.indexOf(cname)) > -1) {
      viewData.data[c].RATE1 = d[i].DataValue2;
      viewData.data[c].RATE2 = d[i].DataValue3;
    }
  }
  var frTpl = $(tplName).html();
  var rate = Mustache.to_html(frTpl, viewData);
  
  $(blockName).html(rate);
});
}

// search engine
var search_web_url;

function searchAutocomplete() {
  $('#txtKeyword').autocomplete({ 
    source: search_web_url + '/search/wildcard.aspx', 
    autoFocus: true 
  }); 
}
function searchKeyword(){ 
  var $data=''; 
  $.ajax({ 
    url: search_web_url + '/search/Listhotkeyword.aspx', 
    type: 'get', 
    datatype: 'jsonp', 
    jsonp: 'callback', 
    jsonpCallback: 'jsonpCallback', 
    success: function (data) {
      $data = JSON.parse(jsonpCallback(data)); 
      for (var i in $data) { 
        setHotKeyword($data[i]); 
      }
    }
  }); 
}
 
function jsonpCallback(data) { 
  return data; 
} 
function setHotKeyword(keyword) { 
  var a = document.createElement('a'); 
  a.setAttribute('href', search_web_url + '/search/SearchIndex.aspx?Keyword=' + keyword); 
  a.setAttribute('title', keyword); 
  a.setAttribute('class', 'blue-link'); 
  a.setAttribute('target', '_blink'); 
  a.innerHTML = keyword; 
  $('.hk-list li').append(a); 
}
function search_subtim() {
  $('#search_form').submit();
}

$(document).ready(function(){
  var $hosts = [
    {hostname: "mma.sinopac.com", gaid: 'UA-48453817-1'},
    {hostname: "mmafund.sinopac.com", gaid: 'UA-48453817-3'}
  ];

  $($hosts).each(function(k,v){
    if (v.hostname == location.host) {

      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', v.gaid, 'auto');
      ga('send', 'pageview');

    }
  });

});