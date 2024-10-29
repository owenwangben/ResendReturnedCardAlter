import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { IsFromApp, ShowSelection } from '../utilities';
import { PageInfoService } from '../page-info.service';

@Component({
	selector: 'app-link-button',
	templateUrl: './link-button.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: LinkButtonComponent,
			multi: true
		}
	]
})
export class LinkButtonComponent implements ControlValueAccessor {
	@Input() type: string;
	private readonly links = {
		cancel: {	// 取消
			eweb: "/Shared/HomePageTwd.aspx?CH=card&ID=",
			mweb: "/m/m_menu.aspx?num=2",
			app: "sinopacaction:{exitwebview}{}"
		},
		payment1: {	// 立即繳費
			eweb: "/mma/card/card_payment/mma_card_payment.aspx",
			mweb: [
				{ name: "網銀轉帳繳卡費", href: "/m/card/card_payment/m_card_payment.aspx" },
				{ name: "活存帳戶繳卡費", href: "https://paybill.sinopac.com/CreditCard/QueryBill?menuid=42d47797-67b7-4337-a8ff-7a1ca05cf9d5" },
				{ name: "7-11繳款條碼", href: "/m/card/card_payment/m_card_payment_seven.aspx" },
				{ name: "全家/萊爾富繳款條碼", href: "/m/card/card_payment/m_card_payment_family.aspx" }
			],
			app: [
				{ name: "網銀轉帳繳卡費", href: "sinopacaction:{cardpayinput}{}" },
				{ name: "活存帳戶繳卡費", href: "sinopacaction:{paybill}{}" },
				{ name: "7-11繳款條碼", href: "sinopacaction:{cardpayseven}{}" },
				{ name: "全家/萊爾富繳款條碼", href: "sinopacaction:{cardpayfamily}{}" }
			]
		},
		payment2: {	// 預約繳費 (已下架)
			eweb: "/mma/card/card_prepayment/mma_card_prepayment.aspx",
			mweb: "/m/card/card_payment/m_card_payment.aspx",
			app: "sinopacaction:{cardpayinput}{}"
		},
		payment3: {	// 活存帳戶繳卡費
			eweb: "https://paybill.sinopac.com/CreditCard/QueryBill?menuid=42d47797-67b7-4337-a8ff-7a1ca05cf9d5",
			mweb: "https://paybill.sinopac.com/CreditCard/QueryBill?menuid=42d47797-67b7-4337-a8ff-7a1ca05cf9d5",
			app: "sinopacaction:{paybill}{}"
		}
	};
	private onChangeCallback: any = (evt: any) => { };
	private onTouchedCallback: any = (evt: any) => { };

	public constructor(private pageinfo: PageInfoService) {
	}

	private selectLink(link) {
		if (link instanceof Array) {
			const options = [];
			for (const option of link) {
				options.push({ key: option.href, value: option.name });
			}
			ShowSelection("請選擇繳款方式", options, href => { window.location.href = href; });
		}
		else {
			window.location.href = link;
		}
	}

	public onclick() {
		const link: { eweb, mweb, app } = this.links[this.type];
		if (link) {
			if (environment.IsMobile) {
				if (IsFromApp()) {
					this.selectLink(link.app);
				}
				else {
					this.selectLink(link.mweb);
				}
			}
			else {
				let url = link.eweb;
				if (url.endsWith("ID=")) {
					url += this.pageinfo.category;
				}
				window.location.href = url;
			}
		}
	}

	registerOnChange(fn: any): void {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouchedCallback = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
	}

	writeValue(obj: any): void {
		this.onChangeCallback(obj);
	}
}
