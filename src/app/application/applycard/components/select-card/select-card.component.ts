import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WizardService, SsoService, ErrorPageService, MemoryStorage, SharedService, SessionStorage } from 'app/shared/shared.module';
import { ApplyInfoLogRequestModel, CardInfo } from '../../services/applycard.models';
import { ApplyCardService } from '../../services/applycard.services';
import { OpenLightbox, ApplyCardPushGTM, ApplyCardPageName, ApplyCardSource, SensorsTrack } from 'app/shared/utilities';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-applycard-select-card',
  templateUrl: './select-card.component.html'
})
export class SelectCardComponent implements OnInit, AfterViewInit, OnDestroy {
  public titles: string[];
  public cards: CardInfo[];
  public cardid: number;
  public branch: string;
  public prodtype: number;
  public selectedTab = 1;
  public sso = false;
  sso_custId: string;
  public referrer: string;
  cardface: number;
  flag: string;
  public source: number;
  public visible: number;
  public isMobile = environment.IsMobile;
  canApplyDawhoCard = false;
  dawhoStatus: string;
  dsno: string;
  public canApply: boolean;
  public personalDataTermsUrl = '';
  public token: string;
  private session = new SessionStorage<ApplyInfoLogRequestModel>(ApplyInfoLogRequestModel);

  public get cardinfo() {
    return this.cards && this.cards.find(item => item.Id === this.cardid);
  }

  public get period() {
    const cardinfo = this.cardinfo;
    return cardinfo && this.decodeHTML(cardinfo.Period);
  }

  public get promotion() {
    const cardinfo = this.cardinfo;
    return cardinfo && this.decodeHTML(cardinfo.FirstBrushCeremony);
  }

  public get rights() {
    const cardinfo = this.cardinfo;
    return cardinfo && this.decodeHTML(cardinfo.ProductInterests);
  }

  private decodeHTML(content: string): string {
    // const div = document.createElement('div') as HTMLDivElement;
    // div.innerHTML = content;
    // return div.childNodes.length === 0 ? "" : div.childNodes[0].nodeValue;
    return content;
  }

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ssoService: SsoService,
    private applyCardService: ApplyCardService,
    private wizardService: WizardService,
    private errorPageService: ErrorPageService,
    private storage: MemoryStorage,
    private sharedService: SharedService,
  ) {
    this.route.data.subscribe(data => {
      this.route.queryParams.subscribe(params => {
        this.token = params.token;
        this.referrer = params.Referrer;
        this.branch = params.Branch;
        this.flag = params.Flag;
        this.dsno = params.DsNo;
        const prodtypeParam = +params.prodtype;
        this.prodtype = (params.IsHouseLoanCard === "true" ? 2 :
          params.VirtualCard === "true" ? 3 : (isNaN(prodtypeParam) ? 0 : prodtypeParam));
        this.cards = data.cardinfo.ApplyCardApplications.filter(
          item => (this.prodtype === 0 && (item.ProductType !== 2 && item.ProductType !== 3 &&
            (!this.dsno || (item.CardFace !== 479088 && item.CardFace !== 479178)))) ||
            item.ProductType === this.prodtype && item.ProductType !== 2);
        if (this.prodtype === 5) {
          this.cards = this.cards.filter(item => item.CardFace !== 426090);
        }
        const mode = params.mode;
        this.cardface = +params.CardFace;
        this.source = +params.source;
        this.visible = +params.visible;
        if (mode === "1" && this.cardface) {
          this.cards = this.cards.filter(item => item.CardFace === this.cardface);
        }
        this.titles = Array.from(new Set(this.cards.map(item => item.Title)));
        this.cardid = this.cards[0].Id;
        this.refreshCanApply();
        if (this.cardface) {
          const cardinfo = this.cards.find(item => item.CardFace === this.cardface);
          if (cardinfo) {
            this.cardid = cardinfo.Id;
            if (!cardinfo.FirstBrushCeremony) {
              this.selectedTab = 2;
            }
          }
        }
      });
    });
  }

  public async ngOnInit() {
    this.sso = !!await this.ssoService.getSsoResult();
    this.sso_custId = await this.ssoService.getSsoCustId();
    await this.applyCardService.clearAuth();
    this.session.ResetSession();
    if (this.sso) {
      this.session.SetValue({
        Auth1: "MMA登入",
        Auth2: "MMA會員"
      } as ApplyInfoLogRequestModel);
    }

    this.storage.CardTitle = this.cardinfo ? this.cardinfo.Title : "";
    this.storage.CardType = this.cardinfo ? this.cardinfo.FullCardType : "";
    this.storage.CardFace = this.cardinfo ? this.cardinfo.CardFace.toString() : "";
    this.storage.ApplyCardSource = this.source === 1 ? ApplyCardSource[ApplyCardSource.DAWHO] : "";
    this.storage.WorkTXN = "";
    ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.index, this.storage.ApplyCardSource);
    if (this.source === 1 && this.cardinfo.ShowDawhoAuthDebitUI && this.sso) {
      await this.GetDawhoData();
    }
    const response = await this.sharedService.ApplyCardTermsUrl();
    if (response.ResultCode === "00") {
      this.personalDataTermsUrl = response.Result.PersonalDataTermsUrl;
    }

    if (!swal.isVisible()){
      this.errorPageService.display("<div style='text-align:left'><span style='color:red;font-weight:bold'>提醒慎防詐騙</span><span style='font-weight:bold'>。如需上傳申辦信用卡補件資料，請透過本行官網上傳相關文件，本行不會透過LINE帳號或其他社群軟體向您索取個人資料。</span></div>", false, null, null, "<span style='font-weight:bold'>我已了解</span>");
    }
  }

  async CanApplyWealthUnlimiteCard(pid: string, cardFace: number) {
    const response = await this.applyCardService.CanApplyWealthUnlimiteCard(pid, cardFace);
    if (response.ResultCode === "00") {
      return true;
    }
    else {
      if (response.ResultCode === "01") {
        this.errorPageService.display("感謝您申請，「永豐財富無限卡」是專為本行尊榮理財貴賓打造的信用卡，" +
        "現行為邀請制，暫未開放申辦，尚祈見諒！" +
        "誠摯邀請您成為本行尊榮理財貴賓，享有專屬於您的禮遇，詳情歡迎洽詢永豐銀行各分行理財專員。" +
        "<br/><br/>*尊榮理財貴賓：於本行往來資產規模維持在等值新台幣300萬元(含)以上。", false, () => {
          window.location.href = "Application/ApplyCard";
        });
      }
      else if (response.ResultCode === "02") {
        this.errorPageService.display("感謝您申請，「永傳世界卡」為邀請制，暫未開放申辦，尚祈見諒！" +
        "誠摯邀請您成為本行尊榮理財永傳會員，享有專屬於您的禮遇，詳情歡迎洽詢永豐銀行各分行理財專員。", false, () => {
          window.location.href = "Application/ApplyCard";
        });
      }
      else {
        this.errorPageService.display(response.ResultMessage, false);
      }

      return false;
    }
  }

  async checkToken(cardface: string) {
    const response = await this.applyCardService.checkToken(cardface, this.token, this.sso_custId);
    if (response.ResultCode === "00") {
      return true;
    } else {
      if (response.ResultCode === "U2") {
        this.errorPageService.confirm(response.ResultMessage, "確定", "返回辦卡頁", (ok) => {
          if (!ok) {
            window.location.href = 'https://app-api.taiwantaxi.com.tw/SinoPacCard/Apply';
          }
        });
        return;
      }
      else if (response.ResultCode === "U3") {
        this.errorPageService.confirm("申請人之身分證字號需與大車隊會員驗證頁相同，您目前為永豐網路銀行登入狀態，留存於本行之身份證字號與大車隊會員驗證頁不同，請先登出網路銀行或重新返回辦卡頁面申請55688聯名卡喔！",
          "確定", "返回辦卡頁", (ok) => {
            if (!ok) {
              window.location.href = 'https://app-api.taiwantaxi.com.tw/SinoPacCard/Apply';
            }
          });
        return;
      } else {
        this.errorPageService.display(response.ResultMessage, false);
      }
      return false;
    }
  }

  public ngAfterViewInit() {
    $('.cards-carousel').owlCarousel({
      items: 1,
      nav: true,
      dots: this.titles.length >= 2,
      center: true,
      loop: this.titles.length >= 3,
      navText: ['', ''],
      navContainer: '.carousel-nav .nav',
      dotsContainer: '.carousel-nav .dots',
      onInitialized: ($event) => {
        setTimeout(() => {
          this.changeCard($event, true);
          this.jump2Card($event);
        }, 4000);
      },
      onTranslated: ($event) => {
        this.changeCard($event, false);
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
  }

  ngOnDestroy() {
    $('.lboxed').remove();
  }

  private changeCard($event, init: boolean) {
    const current_card = $($event.target).find('.owl-item.active .card-holder');
    const current_card_types = current_card.find('img');
    const current_card_value = current_card.find('img.selected').data('card-type-id');
    const current_card_type = current_card.find('img.selected').data('card-type');
    const cards_lightbox = $('#choose-cards');

    if (!init) {
      this.cardid = +current_card_value;
    }

    if ($event.page.index < 0) {
      $event.page.index = 0;
    }
    cards_lightbox.find('input[data-carousel-index="' + $event.page.index + '"]').prop('checked', true);

    const card_select = $('#card-type'); // 發卡商類別下拉
    card_select.html('');
    $(current_card_types).each(function (k, v) {
      if ($(v).data('card-type-id') === current_card_value) {
        card_select.append($('<option></option>').val($(v).data('card-type-id')).text($(v).data('card-title')).prop('selected', true));
      }
      else {
        card_select.append($('<option></option>').val($(v).data('card-type-id')).text($(v).data('card-title')));
      }
    });
    this.refreshCanApply();
  }

  private jump2Card($event) {
    const owl = $('.cards-carousel');
    const current_card = owl.find('img[data-card-type-id="' + this.cardid + '"]');
    const owl_index = $(current_card[0]).closest('.card-holder').data('owl-index');
    current_card.each(function (k, v) {
      $(v).show().addClass('selected').siblings().hide().removeClass('selected');
    });
    owl.trigger('to.owl.carousel', owl_index);
    if (owl_index === 0 && this.cardid !== this.cards[0].Id) {
      this.changeCard($event, false);
    }
  }

  public cardTypeChange($event) {
    this.refreshCanApply();
    const val = $event.target.value;
    this.cardid = +val;
    $('.cards-carousel .owl-item.active img.selected').fadeOut('fast', function () {
      const card_type = $(this).removeClass('selected')
        .siblings('img[data-card-type-id="' + val + '"]')
        .addClass('selected').fadeIn('fast').data('card-type');
    });
  }

  public chooseCardsClick(idx) {
    $('.cards-carousel').trigger('to.owl.carousel', idx);
    this.closelbox();
  }

  public getCards(title: string) {
    return this.cards.filter(item => item.Title === title);
  }

  public openlbox(lboxid) {
    OpenLightbox(lboxid);
  }

  closelbox() {
    $('.lboxed').trigger('close');
  }

  public tabClick(tabid) {
    this.selectedTab = tabid;
  }

  public async submit(auth_type: string) {
    this.closelbox();
    if (this.sso_custId && (this.sso_custId.length >= 8 && this.sso_custId.length <= 9)) {
      this.errorPageService.display('公司戶尚未開放此服務', false);
      return;
    }

    const cardface = this.cardinfo ? this.cardinfo.CardFace.toString() : "";
    if (cardface === "273088" ||cardface === "273089" ) {
      this.errorPageService.confirm("感謝您申請，「永傳世界卡」為邀請制，須為永豐尊榮理財永傳會員等邀請貴賓。" +
      " 正卡年費NT$24,000，每人限申請乙卡。請問是否確定申請?", "確定", null, (ok) => {
        if (ok) {
          this.nextStep(auth_type);
        }
      });
    }
    else if((cardface === "220088" || cardface === "220178") && !(auth_type === "OtherCard" || auth_type === "OtherBank" || auth_type === "New")){
      this.errorPageService.confirm("感謝您申請，「永富世界卡」，正卡年費NT$10,000，" +
      "每人限申請乙卡。請問是否確定申請?", "確定", null, (ok) => {
        if (ok) {
          this.nextStep(auth_type);
        }
      });
    }
    else {
      this.nextStep(auth_type);
    }
  }

  public async nextStep(auth_type: string) {
    const cardface = this.cardinfo ? this.cardinfo.CardFace.toString() : "";
    const isVirealApplyCardOnly: boolean = this.cardinfo ? this.cardinfo.IsVirealApplyCardOnly : false;
    if (this.sso && this.sso_custId && (cardface == "283178" || cardface == "488178")) {
      // 已登入 MMA 且為大車隊卡別時
      if (!await this.checkToken(cardface)) {
        return;
      }
    }

    if (this.source === 1 && this.cardinfo.ShowDawhoAuthDebitUI && this.sso && !this.canApplyDawhoCard) {
      this.ShowDawhoPopup();
      return;
    }

    if (this.sso && this.sso_custId && (this.cardinfo.ProductType === 4
      || cardface === "273088" || cardface === "273089")) {
      // 已登入 MMA 要申辦財富無限卡時，要檢查是否符合資格
      if (!await this.CanApplyWealthUnlimiteCard(this.sso_custId, this.cardinfo.CardFace)) {
        return;
      }
    }

    this.storage.CardTitle = this.cardinfo ? this.cardinfo.Title : "";
    this.storage.CardType = this.cardinfo ? this.cardinfo.FullCardType : "";
    this.storage.CardFace = this.cardinfo ? this.cardinfo.CardFace.toString() : "";

    this.getAuthTypeName(auth_type);

    if (this.prodtype === 2) { auth_type = auth_type + '2'; }
    if (this.prodtype === 3) { auth_type = auth_type + this.prodtype; }

    if (this.prodtype === 5 || cardface === "273088" || cardface === "273089") { this.cardface = this.cardinfo.CardFace; }

    if(isVirealApplyCardOnly) { this.flag = '01'; }
    this.router.navigate([auth_type], {
      relativeTo: this.route, queryParams:
      {
        id: this.cardid, br: this.branch, ref: this.referrer, CardFace: isNaN(this.cardface) ? null : this.cardface,
        visible: (isNaN(this.visible) ? null : this.visible), flag: this.flag,
        source: (isNaN(this.source) ? null : this.source),
        prodtype: this.cardinfo.ProductType, DsNo: this.dsno, token: this.token
      }
    });
  }

  ShowDawhoPopup() {
    if (this.dawhoStatus === "無資料") {
      this.errorPageService.confirm("您尚未申辦數位帳戶喔!", "立即開戶", null, (ok) => {
        if (ok) {
          window.location.href =
            "https://dawho.tw/?utm_source=bank&utm_medium=links&utm_term=non-paid&utm_content=na&utm_campaign=bank20190617";
        }
      });
    }
    else if (this.dawhoStatus === "拒絕") {
      const dawhoApplyFailMsg = "您的數位帳戶未申辦成功，請洽銀行客服" +
        (this.isMobile ? "<a style='color: #004d99;' href='tel:0225059999'>02-2505-9999</a>" : "02-2505-9999") + "，謝謝!";
      this.errorPageService.confirm(dawhoApplyFailMsg, "確定", null);
    }
  }

  async GetDawhoData() {
    const response = await this.applyCardService.getCustomerInfo(5);
    if (response.ResultCode === "00") {
      this.canApplyDawhoCard = response.Result.CanApplyDawhoCard;
      this.dawhoStatus = response.Result.DawhoStatus;
    }
    else {
      this.errorPageService.display(response.ResultMessage, false);
    }
  }

  public twoFactorAuthButtonText(sso: boolean) {
    if (this.source === 1) {
      return 'DAWHO辦卡';
    }
    else if (this.source === 2) {
      return '立即申辦';
    }
    else if (sso) {
      return '我要辦卡';
    }
    else {
      return '永豐卡友/存戶';
    }
  }

  public notTwoFactorApplyClick() {
    this.openlbox('#choose-signup-method');
    SensorsTrack('CardApplicationEnter', this.storage.CardTitle, this.storage.CardType, '', '新客戶辦卡/持他行卡申請');
  }

  public getAuthTypeName(auth_type: string): string {
    let authTypeName = '';
    switch (auth_type) {
      case 'New':
        authTypeName = '下載申請書填寫郵寄申辦';
        break;
      case 'MMA':
        authTypeName = 'MMA會員';
        break;
      case 'CardOrAccount':
        authTypeName = '永豐卡友/存戶';
        break;
      case 'Dawho':
        authTypeName = 'DAWHO辦卡';
        break;
      case 'OtherCard':
        authTypeName = '他行信用卡驗證申請';
        break;
      case 'OtherBank':
        authTypeName = '他行臺幣帳戶驗證申請';
        break;
      case 'QuickAccount':
        authTypeName = '雲端開戶辦卡';
        break;
      default:
        break;
    }

    SensorsTrack('CardApplicationEnter', this.storage.CardTitle, this.storage.CardType, '', authTypeName);

    return authTypeName;
  }

  public refreshCanApply() {
    this.canApply = this.cardinfo.MaxApplyCount === 0 || this.cardinfo.ApplyCount < this.cardinfo.MaxApplyCount;
  }

  public ShowOtherApplyBox() {
    const cardface = this.cardinfo ? this.cardinfo.CardFace.toString() : "";
    if (cardface == "211840" || cardface == "212392" || cardface == "213978") {
      this.openlbox('#terms4-lbox');
      return;
    }

    if (this.cardinfo.ProductType === 4) {
      this.errorPageService.display("感謝您申請，「永豐財富無限卡」是專為本行尊榮理財貴賓打造的信用卡，" +
      "現行為邀請制，暫未開放申辦，尚祈見諒！" +
      "誠摯邀請您成為本行尊榮理財貴賓，享有專屬於您的禮遇，詳情歡迎洽詢永豐銀行各分行理財專員。" +
      "<br/><br/>*尊榮理財貴賓：於本行往來資產規模維持在等值新台幣300萬元(含)以上。", false);
    } else if (cardface === "273088" || cardface === "273089") {
      this.errorPageService.display("感謝您申請，「永傳世界卡」為邀請制，暫未開放申辦，尚祈見諒！" +
      "誠摯邀請您成為本行尊榮理財永傳會員，享有專屬於您的禮遇，詳情歡迎洽詢永豐銀行各分行理財專員。", false);
    }else if(cardface === "220088" || cardface === "220178"){
      this.errorPageService.confirm("感謝您申請，「永富世界卡」，正卡年費NT$10,000，" +
      "每人限申請乙卡。請問是否確定申請?", "確定", null, (ok) => {
        if (ok) {
          this.openlbox('#choose-signup-method');
        }
      });
    } else {
      this.openlbox('#choose-signup-method');
    }
  }
}
