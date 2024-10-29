import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { StatementReprintComponent } from './statement-reprint.component';
import { StatementReprintService } from './statement-reprint.services';
import { StatementReprintResolver } from './statement-reprint.resolver';

const routes: Routes = [{
	path: 'StatementReprint',
	component: StatementReprintComponent,
	canActivate: [AuthGuard],
	resolve: { data: StatementReprintResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		StatementReprintComponent
	],
	providers: [
		StatementReprintService,
		StatementReprintResolver
	]
})
export class StatementReprintModule { }
