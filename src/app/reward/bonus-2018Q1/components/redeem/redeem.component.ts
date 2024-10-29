import { Component, OnInit } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { OpenLightbox } from 'app/shared/utilities';
import { BonusService } from '../../services/bonus.services';

@Component({
	selector: 'app-reward-bonus2018q1-redeem',
	templateUrl: './redeem.component.html'
})
export class RedeemComponent implements OnInit {
	public transactions;
	public gifts;
	public redeemType: number;
	public redeemGifts;
	public step = 0;

	constructor(
		private route: ActivatedRoute,
		private service: BonusService,
		private errorPageService: ErrorPageService
	) {
		this.route.data.subscribe(data => this.redeemType = data.type);
	}

	async ngOnInit() {
		switch (await this.isOpen()) {
			case "00":
				$('#submitButton').unbind('click');
				$('#submitButton').bind('click', this.submit.bind(this));
				if (!await this.getTransactions()) { return; }
				if (!await this.getGifts()) { return; }
			break;
			case "01":
				this.step = -1;
			break;
			case "02":
				this.step = -2;
			break;
		}
	}

	async submit() {
		this.closelbox();
		this.redeemGifts = this.gifts.filter(item => item.Gift_Redeem_Num > 0);
		if (this.step === 0) {
			this.step = 1;
		}
		else {
			const response = await this.service.Redeem(
				this.transactions.filter(item => item.CHECKED).map(item => item.SeqNo),
				this.redeemGifts.map(item => item.Gift_No + ":" + item.Gift_Redeem_Num),
				this.redeemType === 1 ? 'P' : 'A'
			);
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				this.step = 2;
			}
		}
	}

	cancel() {
		this.step = 0;
	}

	clear() {
		$('#checkAll').prop('checked', false);
		this.transactions.forEach(item => item.CHECKED = false);
		this.gifts.forEach(item => item.Gift_Redeem_Num = 0);
	}

	confirm() {
		if (this.selectedPoints === 0 && this.selectedAmount === 0) {
			this.errorPageService.display('請點選指定交易進行兌換', false);
			return;
		}
		if (this.totalRedeemPoints === 0 && this.totalRedeemAmount === 0) {
			this.errorPageService.display('請點選欲兌換之贈品及選擇份數', false);
			return;
		}
		if (this.redeemType === 1 && (this.totalRedeemPoints > this.selectedPoints)) {
			this.errorPageService.display('兌換贈品所需點數超過您交易合計的點數', false);
			return;
		}
		if (this.redeemType === 2 && (this.totalRedeemAmount > this.selectedAmount)) {
			this.errorPageService.display('兌換贈品所需金額超過您交易合計的金額', false);
			return;
		}
		OpenLightbox('#notice1');
	}

	closelbox() {
		$('.lboxed').trigger('close');
	}

	async isOpen(): Promise<string> {
		const response = await this.service.IsOpen();
		return response.ResultCode;
	}

	async getGifts() {
		const respone = await this.service.GetGifts();
		if (this.errorPageService.validateResponse(respone, { redirect: false })) {
			this.gifts = respone.Result.Items.filter(gift =>
				(this.redeemType === 1 && +gift.Gift_Point > 0) ||
				(this.redeemType === 2 && +gift.Gift_AMT > 0)
			);
			this.gifts = this.gifts.map(item => {
				return {
					Gift_No: item.Gift_No,
					Gift_NM: item.Gift_NM,
					Gift_Point: item.Gift_Point,
					Gift_AMT: item.Gift_AMT,
					Gift_Remain_Num: item.Gift_Remain_Num,
					Gift_Redeem_Num: 0
				};
			});
			return true;
		}
		return false;
	}

	async getTransactions() {
		const respone = await this.service.GetTx();
		if (this.errorPageService.validateResponse(respone, { redirect: false })) {
			this.transactions = respone.Result.Items.map(item => {
				return {
					CHECKED: false,
					SAL_POINT: item.SAL_POINT,
					SeqNo: item.SeqNo,
					TX_DATE: item.TX_DATE,
					TX_AMT: item.TX_AMT
				};
			});
			if (this.redeemType === 1) {
				this.transactions = this.transactions.filter(item => +item.SAL_POINT > 0);
			}
			return true;
		}
		return false;
	}

	onCheckAll(value: boolean) {
		this.transactions.forEach(item => {
			item.CHECKED = value;
		});
	}

	onRedeemNumChange(gift) {
		// this.gifts.forEach(item => { if (item !== gift) { item.Gift_Redeem_Num = 0; }});
	}

	get selectedTransactions() {
		return this.transactions && this.transactions.filter(item => item.CHECKED);
	}

	get selectedPoints(): number {
		const list = this.selectedTransactions;
		return list && list.length && list.map(item => item.SAL_POINT).reduce((acc, cur) => acc + cur);
	}

	get selectedAmount(): number {
		const list = this.selectedTransactions;
		return list && list.length && list.map(item => item.TX_AMT).reduce((acc, cur) => acc + cur);
	}

	get totalRedeemPoints(): number {
		let sum = 0;
		this.gifts.filter(item => item.Gift_Redeem_Num > 0).forEach(item => {
			sum += +item.Gift_Point * +item.Gift_Redeem_Num;
		});
		return sum;
	}

	get totalRedeemAmount(): number {
		let sum = 0;
		this.gifts.filter(item => item.Gift_Redeem_Num > 0).forEach(item => {
			sum += +item.Gift_AMT * +item.Gift_Redeem_Num;
		});
		return sum;
	}
}
