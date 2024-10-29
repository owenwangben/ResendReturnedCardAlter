import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardService } from 'app/shared/shared.module';
import { ResendReturnedCardApplyRequestModel,
  sp_CampaignCallList_Resend_Request_Item
 } from '../../resend-returned-card-models';
 import { ResendReturnedCardService } from '../../services/resend-returned-card.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styles: []
})
export class ConfirmComponent implements OnInit {

  address : string;
  addressType : string;
  cards : sp_CampaignCallList_Resend_Request_Item[];
  successCards : sp_CampaignCallList_Resend_Request_Item[]=[];
  failCards:sp_CampaignCallList_Resend_Request_Item[]=[];
  errorMessage = "";

  constructor(
    private route : ActivatedRoute,
    private wizardService : WizardService,
    private ResendReturnedCardService : ResendReturnedCardService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(async data => {
      this.cards = data.cards;
      this.cards = this.cards.filter(x => x.Selected);
      this.address = data.address;
      this.addressType = data.addressType;
    });
  }

  goPrev(){
    this.wizardService.GoToPrevStep();
  }

  async submit(){
    const cardNoList = this.cards.map(x => x.CardNo);
    const response = await this.ResendReturnedCardService.apply({
      Cards: cardNoList,
      AddrType: this.addressType,
    } as ResendReturnedCardApplyRequestModel);

    var failCardNoList: string[] = response.Result.FailCards;
    if(failCardNoList){
      for (let index = 0 ; index < this.cards.length ; index++){
        const card = this.cards[index];
        var findResault = failCardNoList.filter(x => x == card.CardNo);
        if(findResault.length == 0){
          this.successCards.push(card);
        }
        else{
          card.CardName = "[失敗]" + card.CardName;
          this.failCards.push(card);
        }
      }
    }
    else{
      this.successCards = this.cards;
    }
    this.route.data.subscribe(data => {
      data.resultCode = response.ResultCode;
      data.success = response.ResultCode == "00";
      data.cards = this.successCards.concat(this.failCards);
      data.address = this.address;
      data.FailCount = this.failCards.length;
      this.wizardService.GoToNextStep();
    });
  }
}
