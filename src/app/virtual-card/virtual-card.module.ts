import { NgModule } from '@angular/core';
import { PermCliModule } from './perm-cli/perm-cli.module';
import { CardInfoInquiryModule } from './card-info-inquiry/card-info-inquiry.module';
import { VirtualCardService } from './virtual-card-service';

@NgModule({
	imports: [
		PermCliModule, CardInfoInquiryModule
	],
	declarations: []
})
export class VirtualCardModule { }
