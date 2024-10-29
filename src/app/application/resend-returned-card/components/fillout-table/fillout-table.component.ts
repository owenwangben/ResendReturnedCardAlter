import { Component, OnInit } from '@angular/core';
import { ResendReturnedCardGetDataResultModel } from '../../resend-returned-card-models';
import { ActivatedRoute } from'@angular/router';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { WizardService, MyFormControl, FormValidator, ErrorPageService } from 'app/shared/shared.module';


@Component({
  selector: 'app-fillout-table',
  templateUrl: './fillout-table.component.html',
  styles: []
})
export class FilloutTableComponent implements OnInit {
  public address = '';
  public residenceAddress = '';
  public companyAddress = '';
  public model: ResendReturnedCardGetDataResultModel;
  private formVaildator = new FormValidator();
  public form: FormGroup;
  public addressStyle = [
    { display: 'none'},
    { display: 'none'},
    { display: 'none'}
  ];

  constructor(
    private route: ActivatedRoute,
    private wizardService: WizardService,
    private errorPageService: ErrorPageService,
  ) { 
    const controls: Array<MyFormControl>= [
      {
        Name: 'address',
        Control: new FormControl()
      }
    ];

    this.form = this.formVaildator.MakeFormGroup(controls, () => {
      return true;
    });

    this.form.controls.address.valueChanges.subscribe($event => {
      this.addressChanged($event);
    });
   }

  async ngOnInit() {
    this.route.data.subscribe(async data => {
      this.model = data.data;
      if(this.model.Items && this.model.Items.length > 0){
        this.address = this.model.Items[0].HomeAddr;
        this.residenceAddress = this.model.Items[0].RegisterAddr;
        this.companyAddress = this.model.Items[0].CompanyAddr;
      }
      this.form.controls.address.setValue(data.addressType);
    });
  }

  addressChanged($event:any){
    for(let index = 0 ; index < this.addressStyle.length ; index++ ){
      this.addressStyle[index] =
        (index == $event - 1 ) ? { display:'block'} : { display: 'none'};
    }
  }

  submit(){
    var selectedCards = this.model.Items.filter(x => x.Selected);
    if(selectedCards.length <= 0){
      this.errorPageService.display("請選擇要寄送的卡片",false);
      return;
    }
    else if(!this.form.value.address){
      this.errorPageService.display("請選擇卡片寄送地址",false);
      return;
    }

    this.route.data.subscribe(data => {
      data.cards = this.model.Items;
      data.address = this.getAddress(this.form.value.address);
      data.addressType = this.form.value.address
      this.wizardService.GoToNextStep();
    });
  }

  getAddress(type:string){
    switch(type){
      case '1':
        return this.address;
      case '2':
        return this.residenceAddress;
      case '3':
        return this.companyAddress;
      default:
        break;
    }
  }
}
