import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { StmtPdfButtonComponent } from './stmt-pdf-button.component';
import { SharedService } from './shared.services';
import { StmtRTEButtonComponent } from './stmt-rte-button.component';
import { StmtExcelButtonComponent } from './stmt-excel-button.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule
	],
	declarations: [
		StmtPdfButtonComponent,
		StmtRTEButtonComponent,
		StmtExcelButtonComponent
	],
	exports: [
		StmtPdfButtonComponent,
		StmtRTEButtonComponent,
		StmtExcelButtonComponent
	],
	providers: [
		SharedService
	]
})
export class AccountSharedModule { }
