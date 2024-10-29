import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { EStatementReprintComponent } from './estatement-reprint.component';
import { EStatementReprintService } from './estatement-reprint.services';
import { EStatementReprintResolver } from './estatement-reprint.resolver';

const routes: Routes = [{
	path: 'EStatementReprint',
	component: EStatementReprintComponent,
	canActivate: [AuthGuard],
	resolve: { data: EStatementReprintResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		EStatementReprintComponent
	],
	providers: [
		EStatementReprintService,
		EStatementReprintResolver
	]
})
export class EStatementReprintModule { }
