import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { SharedService, ErrorPageService } from 'app/shared/shared.module';

@Component({
	selector: 'app-estatement-change-complete',
	templateUrl: './complete.component.html'
})
export class CompleteComponent implements OnInit {
	public IsMobile = environment.IsMobile;
	public formValue: any;
	public sso = false;
	public isMmaMember = false;

	constructor(
		private route: ActivatedRoute,
		private sharedService: SharedService,
		private errorPageService: ErrorPageService,
		private router: Router,
	) {
		route.data.subscribe(data => {
			this.formValue = data.formValue;
			this.sso = data.sso;
		});
	}

	async ngOnInit() {
		this.isMmaMember = await this.sharedService.isMmaMember();
		if (!this.isMmaMember) {
			const mmaApplyMemberUrl = this.IsMobile ? '/m/member/apply/m_cardapply_login.aspx?REFURL=/m/SinoCard/Application/EStatementChange' :
				'/MemberPortal/Member/CreditCardApplyMember.aspx?REFURL=/SinoCard/Application/EStatementChange';
			this.errorPageService.confirm("您已設定完成，請立即申請MMA網銀會員。", "立即前往", null, (ok) => {
				if (ok) {
					window.location.href = mmaApplyMemberUrl;
				}
			});
		}
	}

}
