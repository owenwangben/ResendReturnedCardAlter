import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, PageInfoService, WizardStep } from 'app/shared/shared.module';
import { IsFromApp } from 'app/shared/utilities';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { CarbonIconComponent } from './carbon-icon/carbon-icon.component';
import { CarbonNocardComponent } from './carbon-nocard/carbon-nocard.component';
import { CarbonPersetComponent } from './carbon-perset/carbon-perset.component';
import { CarbonComponent } from './carbon/carbon.component';
import { CarbonInquiryService } from './services/carbon-inquiry.service';

@Component({
  selector: 'app-carbon-inquiry',
  templateUrl: './carbon-inquiry.component.html',
  styleUrls: ['./carbon-inquiry.component.css']
})
export class CarbonInquiryComponent implements OnInit {
  steps: WizardStep[];
  current = 3;
  public today = moment().startOf('day').toDate();
  isMobile: boolean = environment.IsMobile;
  marginTop: string = '';
  logout: string = window.location.origin + environment.login + '/Reward/CarbonInquiry';
  banksite: string = window.location.origin + environment.indexWeb;
  isBigWeb: boolean = true;
  hamOpen: boolean = false; // true:展開,false:關閉

  constructor(
    private route: ActivatedRoute,
    private errorPageService: ErrorPageService,
    private carbonInquiryService: CarbonInquiryService,
    private pageInfoSer: PageInfoService,
  ) {
    if (this.isMobile) {
      this.pageInfoSer.setHeader = true;
      this.marginTop = '40px';
      this.isBigWeb = false;
    }
    if (IsFromApp()) {
      this.marginTop = 'auto';
      this.isBigWeb = false;
    }
  }

  async ngOnInit() {
    this.steps = [
      { StepName: '未持有特定卡片', Component: CarbonNocardComponent, StepNo: 0, },
      { StepName: '碳足跡條款', Component: CarbonIconComponent, StepNo: 1 },
      { StepName: '碳足跡查詢', Component: CarbonComponent, StepNo: 2 },
      { StepName: '碳足跡資料處理中', Component: CarbonPersetComponent, StepNo: 3 },
    ];
    const response = await this.carbonInquiryService.IsEligibleCard();
    const agreeDate = moment(response.Result.AgreedDate).toDate();// 同意條款時間
    if (this.errorPageService.validateResponse(response, { showMessage: false }) && agreeDate < this.today) {
      this.carbonInquiryService.IsEligibleCardData(response.Result.Cards)
      this.current = 2;
    } else if (response.ResultCode === '01' || response.ResultCode === 'S0') {//未持有指定卡別
      this.current = 0;
    } else if (response.ResultCode === '02') {//尚未同意條款
      this.current = 1;
    }
    else if (agreeDate > this.today) { //已同意條款但簽核日期>today
      this.carbonInquiryService.carbonStart(true);
      this.current = 1;
      return
    }
    else {// ResultCode === 其他
      this.errorPageService.display(response.ResultMessage, true);
      return
    }
  }

  scrollTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  hamClick() {
    this.hamOpen = !this.hamOpen;
    if (this.hamOpen) {
      // 漢堡展開樣式
      $("body").attr('class', "scroll-fixed");
    }
    else {
      // 漢堡關閉樣式
      $("body").removeClass("scroll-fixed");
    }
  }
}
