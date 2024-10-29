import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, UrlSerializer, Router } from '@angular/router';
import { HomeModule } from 'app/home/home.module';
import { CoreModule } from 'app/core/core.module';
import { AgreenRegulationHandleService, AuthGuard, CaseInsensitiveUrlSerializer, ErrorPageService, GlobalErrorHandler, LoaderService,
	MemoryStorage, PageInfoService, SsoService, VcaptchaService, WebApiInvoker } from 'app/shared/shared.module';
import { AppComponent } from './app.component';
import localeZH from '@angular/common/locales/zh-Hant';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

registerLocaleData(localeZH);

const routes: Routes = [
	{ path: 'Account', loadChildren: 'app/account/account.module#AccountModule' },
	{ path: 'Activity', loadChildren: 'app/activity/activity.module#ActivityModule' },
	{ path: 'Application', loadChildren: 'app/application/application.module#ApplicationModule' },
	{ path: 'Auth', loadChildren: 'app/auth/auth.module#AuthModule' },
	{ path: 'Reward', loadChildren: 'app/reward/reward.module#RewardModule' },
	{ path: 'Transaction', loadChildren: 'app/transaction/transaction.module#TransactionModule' },
	{ path: 'DebitCard', loadChildren: 'app/debit-card/debit-card.module#DebitCardModule' },
	{ path: 'MobileStatement', loadChildren: 'app/mobile-statement/mobile-statement.module#MobileStatementModule' },
	{ path: 'VirtualCard', loadChildren: 'app/virtual-card/virtual-card.module#VirtualCardModule' }
];

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		CoreModule,
		HomeModule,
		RouterModule.forRoot(routes),
		NgIdleKeepaliveModule.forRoot()
	],
	providers: [
		{ provide: UrlSerializer, useClass: CaseInsensitiveUrlSerializer },
		{ provide: ErrorHandler, useClass: GlobalErrorHandler },
		{ provide: LOCALE_ID, useValue: 'zh-Hant' },
		AuthGuard,
		ErrorPageService,
		LoaderService,
		MemoryStorage,
		PageInfoService,
		SsoService,
		VcaptchaService,
		WebApiInvoker,
		AgreenRegulationHandleService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
