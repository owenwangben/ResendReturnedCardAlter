import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PageInfoService } from 'app/shared/shared.module';
import { ActivityAirportPickup } from "./airport-pickup.models";

@Component({
	moduleId: module.id,
	selector: 'app-airport-pickup',
	templateUrl: './airport-pickup.component.html'
})
export class AirportPickupComponent implements OnInit {
	model: ActivityAirportPickup;

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
    this.route.data.subscribe(data => {
			this.model = data.data;
			this.processResult(this.model);
		});
	}

	processResult(model: ActivityAirportPickup) {
		const now = new Date();
    const year = (now.getFullYear() - 1911).toString();
		model.EffectiveDateRange = year + ".01.01~" + year + ".12.31";
    const isTwentyTwentyFour = year >= '113' ;
		if (model.SYS_INS === "N") {
      model.AvailableTime = model.LASTUSED_NUM + "次(僅供參考，並未扣除已使用之次數，實際尚餘可用次數請洽0800-825-588預約中心)";
      if (isTwentyTwentyFour) {
        model.Messages = ['●您前一年度累積消費未達活動門檻，未享有機場接送使用次數。', '●每次使用前需以適用本優惠之信用卡刷卡支付本人當次出國機票全額或80%以上旅遊消費，鈦金卡/御璽卡/晶緻卡/無限卡/世界卡機團費消費需滿NT2萬(含)以上；永傳世界卡及永富世界卡需滿NT1.5萬(含)以上，並依規定完成預約。'];
      }else{
        model.Messages = ['●您前一年度累積消費未達活動門檻，未享有機場接送使用次數。', '●每次使用前需以適用本優惠之信用卡刷卡支付本人當次出國機票全額或 80% 以上旅遊團費，且前述機票及團費單筆金額皆需滿NT$1萬(含)以上，並依規定完成預約者。'];
      }
		}
		else if (model.MEMO.includes("國旅")) {
			model.AvailableTime = "您持有國旅卡欲查詢機場接送次數，請詳洽客服02-25287776";
      if (isTwentyTwentyFour) {
        model.Messages = [`●每次使用前需以適用本優惠之信用卡刷卡支付本人當次出國機票全額或80%以上旅遊消費，鈦金卡/御璽卡/晶緻卡/無限卡/世界卡機團費消費需滿NT2萬(含)以上；永傳世界卡及永富世界卡需滿NT1.5萬(含)以上，並依規定完成預約。`];
      }else{
        model.Messages = [`●每次使用前需以適用本活動之信用卡刷卡支付本人當次出國機票全額或 80% 以上旅遊團費，且前述機票及團費單筆金額皆需滿NT$1萬(含)以上，並依規定完成預約者。`];
      }
		}
		else {
			model.AvailableTime = model.LASTUSED_NUM + "次(僅供參考，並未扣除已使用之次數，實際尚餘可用次數請洽0800-825-588預約中心)";
      if (isTwentyTwentyFour) {
        model.Messages = model.LASTUSED_NUM === 0
				  ? ['●您前一年度累積消費未達活動門檻，未享有機場接送使用次數。', '●每次使用前需以適用本優惠之信用卡刷卡支付本人當次出國機票全額或80%以上旅遊消費，鈦金卡/御璽卡/晶緻卡/無限卡/世界卡機團費消費需滿NT2萬(含)以上；永傳世界卡及永富世界卡需滿NT1.5萬(含)以上，並依規定完成預約。']
				  : ['●每次使用前需以適用本優惠之信用卡刷卡支付本人當次出國機票全額或80%以上旅遊消費，鈦金卡/御璽卡/晶緻卡/無限卡/世界卡機團費消費需滿NT2萬(含)以上；永傳世界卡及永富世界卡需滿NT1.5萬(含)以上，並依規定完成預約。'];
      }else{
        model.Messages = model.LASTUSED_NUM === 0
				  ? ['●您前一年度累積消費未達活動門檻，未享有機場接送使用次數。', '●每次使用前需以適用本優惠之信用卡刷卡支付本人當次出國機票全額或 80% 以上旅遊團費，且前述機票及團費單筆金額皆需滿NT$1萬(含)以上，並依規定完成預約者。']
				  : ['●每次使用前需以適用本活動之信用卡刷卡支付本人當次出國機票全額或 80% 以上旅遊團費，且前述機票及團費單筆金額皆需滿NT$1萬(含)以上，並依規定完成預約者。'];
      }
		}
	}
}
