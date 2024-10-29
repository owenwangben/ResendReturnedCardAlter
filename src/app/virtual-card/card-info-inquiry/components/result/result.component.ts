import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorPageService, WizardService, FormValidator, MyFormControl, SharedService } from 'app/shared/shared.module';
import { CardInfoInquiryViewModel } from '../../../virtual-card.models';
import { VirtualCardService } from '../../../virtual-card-service';
import swal from 'sweetalert2';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-result',
	templateUrl: './result.component.html',
	styles: []
})
export class ResultComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	data: CardInfoInquiryViewModel;
	isMobile = environment.IsMobile;
	showPermCliButton = false;
	showApplyMmaMemberButton = false;
	public cardImagePath = "";

	constructor(
		private wizardService: WizardService,
		private route: ActivatedRoute,
		private errorPageService: ErrorPageService,
		private dataService: VirtualCardService,
		private sharedService: SharedService,
		private router: Router,
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'CardNo',
				ErrMsg: '請選擇卡號',
				Control: new FormControl(undefined, Validators.required)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	async ngOnInit() {
		this.route.data.subscribe(async(data) => {
			this.data = data.data;

			this.data.CardInfos.map(x => {
				x.DisplayCardNo = x.CardNo.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
			});

			this.form.patchValue({
				CardNo: this.data.SelectedCardNo
			});

			await this.showCardInfo(this.form.value.CardNo);
		});
	}

	async showCardInfo(cardno) {
		this.showPermCliButton = false;
		this.showApplyMmaMemberButton = false;
		if (this.data.CardInfos) {
			const cards = this.data.CardInfos.filter(it => it.CardNo === cardno);
			if (cards) {
				this.data.SelectedCardInfo = cards[0];
				if (this.data.SelectedCardInfo && this.data.SelectedCardInfo.IsActived) {
					if (await this.sharedService.isMmaMember()) {
						this.showPermCliButton = true;
					}
					else {
						this.showApplyMmaMemberButton = true;
					}
				}
				if (this.data.SelectedCardInfo) {


					this.cardImagePath = '/mma8/card/images/cardfaces/' +
						this.data.SelectedCardInfo.ProductCode + this.data.SelectedCardInfo.CardFace + '.png';
				}
			}
		}
	}

	onCardNoChange(cardno) {
		this.showCardInfo(cardno);
	}

	async onSubmit() {
		if (!this.formValidator.Validate()) { return; }

		const response = await this.dataService.VirtualCardActivation(this.form.value.CardNo, this.data.SelectedCardInfo.ExpDate);
		if (response.ResultCode === "00") {
			this.data.SelectedCardInfo.IsActived = true;
			if (await this.sharedService.isMmaMember()) {
				this.confirm('您已開卡成功，請立即前往虛擬卡額度調整。', '立即前往', '/VirtualCard/PermCLI', null);
			}
			else {
				const mmaApplyMemberUrl = this.isMobile ? '/m/member/apply/m_cardapply_login.aspx?REFURL=/m/SinoCard/VirtualCard/PermCLI' :
					'/MemberPortal/Member/CreditCardApplyMember.aspx?REFURL=/SinoCard/VirtualCard/PermCLI';
				this.confirm('您已開卡成功，請立即申請MMA網銀會員，以進行虛擬卡額度調整。', '立即前往', null, mmaApplyMemberUrl);
			}
		}
		else {
			if (this.isMobile) {
				this.errorPageService.display("開卡失敗，請撥打客服專線<a style='color: #004d99;' href='tel:0225287776'>02-2528-7776</a>。", false);
			}
			else {
				this.errorPageService.display("開卡失敗，請撥打客服專線02-2528-7776。", false);
			}
		}
	}

	confirm(message, confirmButtonText, confirmUrl, confirmExternalUrl) {
		swal({
			html: message,
			confirmButtonText: confirmButtonText,
			cancelButtonText: '下次再說',
			showCancelButton: true,
			reverseButtons: true
		})
			.catch(swal.noop)
			.then((ok) => {
				if (ok) {
					if (confirmUrl) {
						this.router.navigate([confirmUrl]);
					}
					else if (confirmExternalUrl) {
						window.location.href = confirmExternalUrl;
					}
				}
			});
	}
}
