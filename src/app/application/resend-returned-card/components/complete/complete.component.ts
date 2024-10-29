import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { sp_CampaignCallList_Resend_Request_Item } from '../../resend-returned-card-models';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styles: []
})
export class CompleteComponent implements OnInit {
  success: boolean = false;
  applyCards: sp_CampaignCallList_Resend_Request_Item[];
  address: string;
  failMessage: string = "";
  failDetailMessage: string = "";
  failCount: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.success = data.success;
      this.applyCards = data.cards;
      this.address = data.address
      this.failCount = data.FailCount;
      this.failMessage = (this.failCount == this.applyCards.length) || (!this.success && this.failCount == 0 ) ?  "申請失敗" : (`申請${this.failCount}筆失敗`);

      if(data.resultCode == "E0"){
        this.failDetailMessage = "系統異常"
      }
    });
  }
}
