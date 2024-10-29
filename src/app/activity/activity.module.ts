import { NgModule } from '@angular/core';
import { AirportPickupModule } from './airport-pickup/airport-pickup.module';
import { AnnualFeeModule } from './annualfee/annualfee.module';
import { ActivityRegisterModule } from './register/register.module';
import { ActivityRegisteredInquiryModule } from './registered-inquiry/registered-inquiry.module';

@NgModule({
	imports: [
		AirportPickupModule,
		AnnualFeeModule,
		ActivityRegisterModule,
		ActivityRegisteredInquiryModule
	]
})
export class ActivityModule { }
