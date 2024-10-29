import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { MyDataComponent } from './mydata.component';
import { CompleteComponent } from './components/complete/complete.component';
import { MyDataResolver } from './services/mydata-resolver';
import { FailComponent } from './components/fail/fail.component';
import { RelayComponent } from './components/relay/relay.component';
import { ATMRelayComponent } from './components/atmRelay/atmRelay.component';

const routes: Routes = [{
	path: 'MyDataComplete/:type',
	component: MyDataComponent,
	canActivate: [AuthGuard],
	resolve: { data: MyDataResolver },
	data: { step: 0 }
},
{
	path: 'MyDataComplete2/:type',
	component: MyDataComponent,
	canActivate: [AuthGuard],
	resolve: { data: MyDataResolver },
	data: { step: 0 }
},
{
	path: 'MyDataFail/:type',
	component: FailComponent,
	canActivate: [AuthGuard],
	resolve: { data: MyDataResolver },
	data: {  }
},
{
	path: 'MyDataRelay',
	component: RelayComponent,
	canActivate: [AuthGuard],
	resolve: { data: MyDataResolver },
	data: {  }
},
{
	path: 'MyDataATMRelay',
	component: ATMRelayComponent,
	canActivate: [AuthGuard],
	resolve: { data: MyDataResolver },
	data: {  }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		MyDataComponent,
		CompleteComponent,
		FailComponent,
		RelayComponent,
    ATMRelayComponent
	],
	entryComponents: [
		CompleteComponent,
		FailComponent,
		RelayComponent,
    ATMRelayComponent
	],
	providers: [
		MyDataResolver
	]
})
export class MyDataModule { }
