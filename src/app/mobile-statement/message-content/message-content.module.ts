import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { MobileStatementSharedModule } from '../shared/mobile-statement-shared.module';
import { MessageContentComponent } from './message-content.component';
import { MessageContentResolver } from './message-content.resolver';

const routes: Routes = [{
	path: 'MessageContent/:id/:token',
	canActivate: [AuthGuard],
	component: MessageContentComponent,
	resolve: { Result: MessageContentResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		MobileStatementSharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [MessageContentComponent],
	providers: [
		MessageContentResolver
	]
})
export class MessageContentModule { }
