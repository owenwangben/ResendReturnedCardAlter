import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyDataDoRequestModel, MyDataLoginResponseModel } from 'app/shared/shared.models';
import { SharedService } from 'app/shared/shared.services';
import { GetMyDataLoginData, encryptStringToObject } from 'app/shared/utilities';

@Component({
  selector: 'app-relay',
  templateUrl: './relay.component.html'
})
export class RelayComponent implements OnInit {
  mydataForm : MyDataLoginResponseModel;
  // TwidPortalUrl: string;
  // ApiVersion: string;
  // BusinessNo: string;
  // HashKeyNo: string;
  // IdentifyNo: string;
  // Token: string;
  // VerifyNo: string;

  constructor(private route: ActivatedRoute,private sharedService: SharedService) {

	}
  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.mydataForm = params.do ? encryptStringToObject<MyDataLoginResponseModel>(params.do) : GetMyDataLoginData();
    })

    const model = {
			VerifyNo: this.mydataForm.VerifyNo
		} as MyDataDoRequestModel;
		await this.sharedService.mydataDo(model);

    $("#mydata-form").attr("action", this.mydataForm.TwidPortalUrl + '/DO').submit();
  }

}
