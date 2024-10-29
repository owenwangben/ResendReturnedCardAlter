import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { HanshinarenaCardTransferComponent } from './hanshinarena-card-transfer.component';
import { HanshinarenaCardTransferResolver } from './hanshinarena-card-transfer-resolver';
import { HanshinarenaCardTransferService } from './hanshinarena-card-transfer.service';

const routes: Routes = [{
	path: 'HanshinarenaCardTransfer',
	component: HanshinarenaCardTransferComponent,
	canActivate: [AuthGuard],
	resolve: { data: HanshinarenaCardTransferResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [HanshinarenaCardTransferComponent],
	providers: [
		HanshinarenaCardTransferService,
		HanshinarenaCardTransferResolver
	]
})
export class HanshinarenaCardTransferModule { }
