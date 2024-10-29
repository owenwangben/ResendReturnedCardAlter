import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorPageService, ErrorPageButton, MemoryStorage, WizardService, FormValidator, MyFormControl } from 'app/shared/shared.module';
import { VirtualCardService } from '../../../virtual-card-service';
import { environment } from 'environments/environment';
import { PermanentCreditViewModel, VirtualCardInfo } from '../../../virtual-card.models';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styles: [`
		th {
			width: 40%;
		}
	`]
})
export class EditorComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	data: PermanentCreditViewModel;
	isMobile = environment.IsMobile;
	cardinfos: VirtualCardInfo[];
	cardinfo: VirtualCardInfo;

	constructor(
		private wizardService: WizardService,
		private dataService: VirtualCardService,
		private storage: MemoryStorage,
		private route: ActivatedRoute,
		private errorPageService: ErrorPageService
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'CardNo',
				ErrMsg: '請選擇卡號',
				Control: new FormControl(undefined, Validators.required)
			},
			{
				Name: 'NewLine',
				ErrMsg: '請輸入以仟元為單位的金額',
				Control: new FormControl(undefined,
					Validators.compose([
						Validators.required,
						Validators.pattern('^[0-9]{1,6}000$')])
				)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls, () => {
			if (this.form.value.NewLine > this.cardinfo.PermanentCreditLimit) {
				this.errorPageService.display("您輸入的調整額度超過總信用額度，請重新輸入。", false);
				return false;
			}

			if (this.cardinfo.CreditAvailable <= 0) {
				if (this.isMobile) {
					this.errorPageService.display("因您的虛擬卡已無可用餘額，若您有調額需求，請撥打客服專線<a style='color: #004d99;' href='tel:0225287776'>02-2528-7776</a>。", false);
				}
				else {
					this.errorPageService.display("因您的虛擬卡已無可用餘額，若您有調額需求，請撥打客服專線02-2528-7776。", false);
				}

				return false;
			}

			return true;
		});

	}

	async ngOnInit() {
		this.route.data.subscribe(async(data) => {
			this.data = data.data;
			if (this.data) {
				this.form.patchValue({
					CardNo: this.data.CardNo ? this.data.CardNo : this.data.Cards[0].CardNo,
					NewLine: this.data.NewLine
				});
				const cardNoList = this.data.Cards.map(it => it.CardNo);
				const response = await this.dataService.GetVirtualCardInfo(cardNoList);
				if (response.ResultCode === "00" && response.Result) {
					this.cardinfos = response.Result.Items;
				}

				this.showCardInfo(this.form.value.CardNo);
			}
		});
	}

	showCardInfo(cardno) {
		if (this.cardinfos) {
			const cards = this.cardinfos.filter(it => it.CardNo === cardno);
			if (cards) {
				this.data.SelectedCard = this.cardinfo = cards[0];
			}
			else {
				this.data.SelectedCard = this.cardinfo = null;
			}
		}
	}

	onCardNoChange(cardno) {
		this.showCardInfo(cardno);
	}

	async onSubmit() {
		if (!this.formValidator.Validate()) { return; }
		this.data.CardNo = this.form.value.CardNo;
		this.data.NewLine = this.form.value.NewLine;
		this.route.data.subscribe(data => {
			data.data = this.data;
			this.wizardService.GoToNextStep();
		});
	}
}
