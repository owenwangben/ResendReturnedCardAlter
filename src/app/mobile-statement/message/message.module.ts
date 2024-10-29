import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DxGalleryModule } from 'devextreme-angular';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { MobileStatementSharedModule } from '../shared/mobile-statement-shared.module';
import { MessageComponent } from './message.component';
import { MessageResolver } from './message.resolver';

const routes: Routes = [{
	path: 'Message/:token',
	canActivate: [AuthGuard],
	component: MessageComponent,
	resolve: { Result: MessageResolver }
}];

@NgModule({
	imports: [
		DxGalleryModule,
		SharedModule,
		MobileStatementSharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [MessageComponent],
	providers: [
		MessageResolver
	]
})
export class MessageModule { }
