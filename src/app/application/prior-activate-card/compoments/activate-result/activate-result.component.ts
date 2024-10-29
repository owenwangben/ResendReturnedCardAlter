import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, WizardService } from 'app/shared/shared.module';
import { copyMessage } from 'app/shared/utilities';
import { environment } from 'environments/environment';
import { CardInfo } from '../../services/prior-activate-card-model';

@Component({
  selector: 'app-activate-result',
  templateUrl: './activate-result.component.html',
  styles: []
})
export class ActivateResultComponent implements OnInit {
  model: CardInfo;
  hideSensitiveData = false;
  IsMobile = environment.IsMobile;
  typeface: string;
  expDate: string;

  constructor(
    private route: ActivatedRoute,
    private wizardService: WizardService,
    private errorPageService: ErrorPageService
  ) { }

  ngOnInit() {
    $("body").removeAttr("style");
    this.route.data.subscribe(data => {
      this.model = data.model;
      this.typeface = data.typeface;
      this.expDate = this.typeface == "428001" || this.typeface == "428178" ? '60' : '30';
      if (this.model.IsPriorActivated) {
        if(this.typeface == "283178" || this.typeface == "488178")
          openlbox('#confirm1');
        else if(this.typeface == "428001" || this.typeface == "428178")
          openlbox('#dawayNotice');
      }
    });
  }

  openTaiwantaxiApp() {
    window.open('https://www.taiwantaxi.com.tw/app', '_blank');
  }

  closelbox() {
		$('.lboxed').trigger('close');
	}

  toggleSensitiveData() {
    this.hideSensitiveData = !this.hideSensitiveData;
  }

  copyCardNo() {
    copyMessage(this.model.CardNo);
    $('body').addClass('noScroll');
    $('#popup-copied').addClass('overlay--active');
    setTimeout(function () {
      $('body').removeClass('noScroll');
      $('#popup-copied').removeClass('overlay--active');
    }, 1000);
  }

  goPrev() {
    this.wizardService.GoToPrevStep();
  }
}

function openlbox($lboxid) {
  var src_top = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
  $('.lbox-block').find($lboxid).show().siblings().hide();

  $('.lboxed').lightbox_me({
    closeClick: false,
    centered: true,
    onLoad: function () {
      $('body').addClass('noScroll');
      scrollTo($('.lboxed').offset().top);
    },
    onClose: function () {
      $('body').removeClass('noScroll');
      scrollTo(src_top);
    },
    overlayCSS: {
      background: 'black', opacity: .8
    }
  });
}

function scrollTo(pos) {
  $('html, body').animate({
    scrollTop: pos
  }, 250);
}
