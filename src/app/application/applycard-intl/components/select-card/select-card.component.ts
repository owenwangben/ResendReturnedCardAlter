import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SsoService, MemoryStorage, ErrorPageService } from 'app/shared/shared.module';
import { CardInfo } from '../../../applycard/services/applycard.models';
import { ApplyCardService } from '../../../applycard/services/applycard.services';
import { OpenLightbox, ApplyCardPushGTM, ApplyCardPageName, SensorsTrack } from 'app/shared/utilities';
import { GetLanguage, LocaleMessages } from '../../shared/LocaleMessages';
import swal from 'sweetalert2';

@Component({
	selector: 'app-applycard-intl-select-card',
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
	public visible: number;
	public canApply: boolean;
	language: string = GetLanguage();
	message = LocaleMessages[this.language].SelectCard;;
	otherBankHtmlPath: string;

	public get cardinfo() {
		return this.cards && this.cards.find(item => item.Id === this.cardid);
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
    private errorPageService: ErrorPageService,
		private storage: MemoryStorage,
	) {
		this.route.data.subscribe(data => {
			this.route.queryParams.subscribe(params => {
				this.referrer = params.Referrer;
				this.branch = params.Branch;
				const prodtypeParam = +params.prodtype;
				this.prodtype = (isNaN(prodtypeParam) ? 8 : prodtypeParam);
				this.cards = data.cardinfo.ApplyCardApplications.filter(item => item.ProductType === this.prodtype);

				const mode = params.mode;
				this.cardface = +params.CardFace;
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

		sessionStorage.removeItem("ApplyCardIntl.ArcExpireDate");
		this.storage.CardTitle = this.cardinfo ? this.cardinfo.Title : "";
		this.storage.CardType = this.cardinfo ? this.cardinfo.FullCardType : "";
		this.storage.CardFace = this.cardinfo ? this.cardinfo.CardFace.toString() : "";
		const path = '/mma8/card/htmls/他行臺幣帳戶身分驗證指定銀行_{0}.html'
		this.otherBankHtmlPath = path.replace('{0}', this.language);
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.index, this.storage.ApplyCardSource);

    if (!swal.isVisible()){
      this.errorPageService.display("<div style='text-align:left'><span style='color:red;font-weight:bold'>提醒慎防詐騙</span><span style='font-weight:bold'>。如需上傳申辦信用卡補件資料，請透過本行官網上傳相關文件，本行不會透過LINE帳號或其他社群軟體向您索取個人資料。</span></div>", false, null, null, "<span style='font-weight:bold'>我已了解</span>");
    }
	}

	public getCardName(card) {
		return card.Id === 80 ? 'English' : (card.Id === 81 ? 'Vietnamese' : (card.Id === 82 ? 'Indonesian' : card.CardName));
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

		this.storage.CardTitle = this.cardinfo ? this.cardinfo.Title : "";
		this.storage.CardType = this.cardinfo ? this.cardinfo.FullCardType : "";
		this.storage.CardFace = this.cardinfo ? this.cardinfo.CardFace.toString() : "";

		this.getAuthTypeName(auth_type);

		this.router.navigate([auth_type], {
			relativeTo: this.route, queryParams:
			{
				lang: 'en',
				id: this.cardid, br: this.branch, ref: this.referrer, CardFace: isNaN(this.cardface) ? null : this.cardface,
				visible: (isNaN(this.visible) ? null : this.visible), prodtype: this.cardinfo.ProductType
			}
		});
	}

	public getAuthTypeName(auth_type: string): string {
		let authTypeName = '';
		switch (auth_type) {
			case 'CardOrAccount':
				authTypeName = '永豐卡友/存戶';
				break;
			case 'OtherCard':
				authTypeName = '他行信用卡驗證申請';
				break;
			default:
				break;
		}

		if (auth_type === 'New' || auth_type === 'OtherCard') {
			SensorsTrack('CardApplicationVerificationMethod', this.storage.CardTitle, this.storage.CardType,
				authTypeName, '新客戶辦卡/持他行卡申請');
		}
		else {
			SensorsTrack('CardApplicationEnter', this.storage.CardTitle, this.storage.CardType,
				authTypeName);
		}

		return authTypeName;
	}

	public refreshCanApply() {
		this.canApply = this.cardinfo.MaxApplyCount === 0 || this.cardinfo.ApplyCount < this.cardinfo.MaxApplyCount;
	}

	public ShowOtherApplyBox(authType: number) {
		this.openlbox("#choose-signup-method");
	}
}
