import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { Auth1Component } from './auth1/auth1.component';
import { Auth2Component } from './auth2/auth2.component';
import { Auth3Component } from './auth3/auth3.component';
import { OTPComponent } from './rwd/otp/otp.component';
import { AuthMMAComponent } from './rwd/mma/mma.component';
import { AuthCardComponent } from './rwd/card/card.component';
import { AuthAccountComponent } from './rwd/account/account.component';
import { AuthHeaderComponent } from './rwd/shared/header/header.component';
import { AuthFooterComponent } from './rwd/shared/footer/footer.component';
import { AuthWarningComponent } from './rwd/shared/warning/warning.component';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './services/auth.resolver';
import { AuthOtherCardComponent } from './rwd/othercard/othercard.component';
import { OTP2Component } from './rwd/otp2/otp2.component';
import { AuthMBillComponent } from './mbill/mbill.component';
import { AuthSelectComponent } from './rwd/select/select.component';
import { AuthCardOrAccountComponent } from './rwd/card-or-account/card-or-account.component';
import { AuthDawhoComponent } from "./rwd/dawho/dawho.Component";
import { ApplyCardService } from 'app/application/applycard/services/applycard.services';
import { AuthOtherBankComponent } from './rwd/otherbank/otherbank.component';
import { AuthCardOrAccountIntlComponent } from './rwd/Intl/card-or-account/card-or-account.component';
import { AuthOtherBankIntlComponent } from './rwd/Intl/otherbank/otherbank.component';
import { OtpIntlComponent } from './rwd/Intl/otp/otp.component';
import { AuthQuickaccountComponent } from './rwd/quickaccount/quickaccount.component';

const routes: Routes = [
	{ path: 'Auth1/:code', component: Auth1Component,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'Auth2', component: Auth2Component,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'Auth3', component: Auth3Component,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'OTP/:code', component: OTPComponent,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'OTP2/:code', component: OTP2Component,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'MMA', component: AuthMMAComponent,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'Card', component: AuthCardComponent,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'Card/:code', component: AuthCardComponent,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'Account', component: AuthAccountComponent,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'Account/:code', component: AuthAccountComponent,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'CardOrAccount', component: AuthCardOrAccountComponent,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'Dawho', component: AuthDawhoComponent,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'OtherCard', component: AuthOtherCardComponent,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'OtherBank', component: AuthOtherBankComponent,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'MBill', component: AuthMBillComponent,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'Select', component: AuthSelectComponent,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'CardOrAccount/Intl/:lang', component: AuthCardOrAccountIntlComponent,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'OtherBank/Intl/:lang', component: AuthOtherBankIntlComponent,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'OTP/Intl/:lang/:code', component: OtpIntlComponent,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
	{ path: 'QuickAccount', component: AuthQuickaccountComponent,
		canActivate: [AuthGuard], resolve: { data: AuthResolver } },
];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		Auth1Component,
		Auth2Component,
		Auth3Component,
		OTPComponent,
		OTP2Component,
		AuthMMAComponent,
		AuthCardComponent,
		AuthAccountComponent,
		AuthOtherCardComponent,
		AuthOtherBankComponent,
		AuthMBillComponent,
		AuthSelectComponent,
		AuthCardOrAccountComponent,
		AuthDawhoComponent,
		AuthHeaderComponent,
		AuthFooterComponent,
		AuthWarningComponent,
		AuthCardOrAccountIntlComponent,
		AuthOtherBankIntlComponent,
		OtpIntlComponent,
		AuthQuickaccountComponent,
	],
	providers: [
		AuthService, AuthResolver, ApplyCardService
	]
})
export class AuthModule { }
