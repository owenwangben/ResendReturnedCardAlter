import { Component, OnInit } from '@angular/core';
import { ErrorPageService, WizardService, SharedService, MyFormControl, FormValidator } from 'app/shared/shared.module';
import { RedemptionService } from '../../../services/redemption.services';
import { CartItem } from '../../../services/redemption.models';
import { ActivatedRoute } from '@angular/router';
import { CityAreaZipCode } from 'app/application/applycard/services/applycard.models';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-reward-redemption-cart',
	templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
	Items: CartItem[] = [];
	sso_custId: string;
	public cityAreaZip: CityAreaZipCode[];
	public cities: string[];
	private formValidator = new FormValidator();
	public form: FormGroup;
	isPreview: string = null;

	constructor(
		private wizardService: WizardService,
		private redemptionService: RedemptionService,
		private errorPageService: ErrorPageService,
		private route: ActivatedRoute,
		private sharedService: SharedService
	) {
		this.Items = this.redemptionService.GetCartItems();

		this.route.parent.data.subscribe(data => {
			this.sso_custId = data.sso;
		});
		this.route.queryParams.subscribe(queryParams => {
			this.isPreview = queryParams.isPreview && queryParams.isPreview.toLowerCase() === "true" ? "true" : null;
		});

		const controls: Array<MyFormControl> = [
			{
				Name: 'IsResidenceAddressIsHomeAddress',	// 同現居/通訊地址
				Control: new FormControl(true)
			},
			{
				Name: 'Address1', // 城市
				Control: new FormControl(null)
			},
			{
				Name: 'Address2', // 區域
				Control: new FormControl(undefined)
			},
			{
				Name: 'Address3', // 路名及門牌號碼
				Control: new FormControl(null)
			}
		];
		this.form = this.formValidator.MakeFormGroup(controls, () => {
			if (!this.form.value.IsResidenceAddressIsHomeAddress) {
				if (!this.form.value.Address1) {
					errorPageService.display("請選擇寄送地址城市", false);
					return false;
				}
				if (!this.form.value.Address2) {
					errorPageService.display("請選擇寄送地址區域", false);
					return false;
				}
				if (!this.form.value.Address3) {
					errorPageService.display("請輸入寄送地址", false);
					return false;
				}
			}
			return true;
		});

		this.form.controls.Address1.valueChanges.subscribe(() => {
			this.form.controls.Address2.setValue(undefined);
		});
	}

	async ngOnInit() {
		await this.getZip3Code();
	}

	async getZip3Code() {
		const response = await this.sharedService.getZip3Code();
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.cityAreaZip = response.Result.Items;
			this.cities = Array.from(new Set(this.cityAreaZip.map(item => item.City)));
		}
	}

	getAreas(city: string) {
		return this.cityAreaZip && this.cityAreaZip
			.filter(item => item.City === city)
			.map(item => item.Area);
	}

	get totalPoints() {
		let points = 0;
		this.Items.forEach(item => points += item.TotalPoints);
		return points;
	}

	get totalCount() {
		let count = 0;
		this.Items.forEach(item => count += item.Count);
		return count;
	}

	increase(idx) {
		if (this.Items[idx].Count < 10) {
			this.Items[idx].Count++;
			this.Items[idx].TotalPoints += this.Items[idx].UnitPoints;
		}
	}

	decrease(idx) {
		if (this.Items[idx].Count > 0) {
			this.Items[idx].Count--;
			this.Items[idx].TotalPoints -= this.Items[idx].UnitPoints;
		}
	}

	remove(id) {
		this.Items = this.redemptionService.RemoveFromCart(id);
	}

	async submit() {
		if (this.isPreview === "true") {
			this.errorPageService.display("預覽模式無法進行兌換", false);
			return;
		}
		if (!this.formValidator.Validate()) { return; }
		if (this.totalCount <= 0) {
			this.errorPageService.display("請先挑選欲兌換之商品", false);
			return;
		}
		if (this.sso_custId) {
			// 若已登入則不須再核身
			const value = this.form.value;
			const address = value.IsResidenceAddressIsHomeAddress ? null : (value.Address1 + value.Address2 + value.Address3);
			const response = await this.redemptionService.RedeemRewardProducts(
				null, null, "", address
			);
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				this.route.data.subscribe(data => {
					data.Result = response.Result;
					this.redemptionService.ClearCart();
					this.wizardService.GoToStep(2);
				});
			}
		}
		else {
			this.wizardService.GoToNextStep();
		}
	}
}

