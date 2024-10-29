import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MobileStatementNavComponent } from './mobile-statement-nav.component';
import { MobileStatementHeadervComponent } from './mobile-statement-header.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule
	],
	declarations: [
		MobileStatementNavComponent,
		MobileStatementHeadervComponent
	],
	exports: [
		MobileStatementNavComponent,
		MobileStatementHeadervComponent
	]
})
export class MobileStatementSharedModule { }
