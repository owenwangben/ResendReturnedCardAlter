import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CardActivationService } from "./cardactivation.services";
import { ActivateCardResponseModel } from './cardactivation.models';
import { ErrorPageService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { IsFromApp } from 'app/shared/utilities';

@Component({
	selector: 'app-cardactivation-complete',
	templateUrl: './cardactivation-complete.component.html'
})
export class CardActivationCompleteComponent implements OnInit {
	model: ActivateCardResponseModel;
	isMobile = environment.IsMobile;
  public isApp = IsFromApp();

	constructor(private router: Router,
		private route: ActivatedRoute,
		private errorPageService: ErrorPageService,
	) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.model = data.result;
			if (this.model.IsMmaMember === false) {
				// const mmaApplyMemberUrl = this.isMobile ? '/m/member/apply/m_cardapply_login.aspx' :
				// 	'/MemberPortal/Member/CreditCardApplyMember.aspx';
				this.errorPageService.confirm("恭喜開卡成功，歡迎下載永豐卡友專屬【大咖DACARD APP】，立即掌握最新優惠權益並設定國內外交易開關。",
					"立即下載", "下次再說", (ok) => {
					if (ok) {
						window.location.href = 'https://dmp.sinopac.com/DMP_SA/r/4B#open-browser';
					}
				}, true, true);
			}
		});
	}

  public redirectToEStatementChange():void{
    if(this.isApp){
      location.href = 'sinopacaction:{estatementchange}{}';
    }else{
      this.router.navigateByUrl('/Application/EStatementChange');
    }
  }

  public redirectToLineBinding():void{
    window.open('https://linebc.sinopac.com/SmartRobotbcweb/1k9lZ5#open-browser', '_blank');
  }
}
