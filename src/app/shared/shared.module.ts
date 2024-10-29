import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { WizardModule } from './wizard/wizard.module';
import { ChartModule } from './chart/chart.module';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { VcaptchaComponent } from './vcaptcha/vcaptcha.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { PeriodQueryComponent, FastQueryOption } from './period-query/period-query.component';
import { BankAccountSelectorComponent } from './bank-account-selector/bank-account-selector.component';
import { CardNumberInputComponent } from './card-number-input/card-number-input.component';
import { ExpiryDateSelectorComponent } from './expirydate-selector/expirydate-selector.component';
import { LinkButtonComponent } from './link-button/link-button.component';
import { LoadScriptComponent } from './load-script/load-script.component';
import { ExecScriptComponent } from './exec-script/exec-script.component';
import { ErrorPageComponent } from './errorpage/errorpage.component';
import { MaskPipe } from './pipes/mask.pipe';
import { MobilePipe } from './pipes/mobile.pipe';
import { CreditcardPipe } from './pipes/creditcard.pipe';
import { NumberToHMSPipe } from './pipes/number-to-hms.pipe';
import { AgreeOrNotPipe } from './pipes/agreeornot.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { MobileCreditPipe } from './pipes/mobilecredit.pipe';
import { CardTypePipe } from './pipes/cardtype.pipe';
import { DatePickerDirective } from './directive/datepicker.directive';
import { NumberOnlyDirective } from './directive/numberonly.directive';
import { LoadHtmlDirective } from './directive/load-html.directive';
import { MWebSelectDirective } from './directive/mweb-select.directive';
import { CannotPasteDirective } from './directive/cannot-paste.directive';
import { SharedService } from './shared.services';
import { AuthGuard } from './auth.guard';
import { BreadcrumbsService } from './breadcrumbs/breadcrumbs.service';
import { CaseInsensitiveUrlSerializer } from './case-insensitive-url-serializer';
import { ErrorPageService, ErrorPageButton } from './errorpage/errorpage.service';
import { FormValidator, MyFormControl } from './form.validator';
import { GlobalErrorHandler } from './global-error-handler';
import { LoaderService } from './loader.service';
import { MemoryStorage } from './memory.storage';
import { PageInfoService } from './page-info.service';
import { SsoService } from './sso.service';
import { VcaptchaService } from './vcaptcha/vcaptcha.service';
import { WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from './webapi.invoker';
import { WizardService } from './wizard/wizard.service';
import { WizardStep } from './wizard/typings';
import { CustomerInfoModel } from './shared.models';
import { DisableControlDirective } from './directive/disable-control.directive';
import { SafeHtmlPipe } from './pipes/safe-html';
import { RwdFooterComponent } from './footer/rwd-footer.component';
import { PreventDoubleClickDirective } from './directive/prevent-doubleclick.directive';
import { AgreenRegulationHandleService } from './agreen-regulation-handle.service';
import { ScrollCheckDirective } from './directive/scroll-check.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { SessionStorage } from './session.storage';
import { CardNumberMaskPipe } from './pipes/cardnumbermask.pipe';
import { IdMaskDirective } from './directive/id-mask.directive';
import { UppercaseDirective } from './directive/uppercase.directive';


const routes: Routes = [{
	path: 'ErrorPage',
	component: ErrorPageComponent,
	canActivate: [AuthGuard]
}];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FileUploadModule,
		WizardModule,
		RouterModule.forChild(routes),
		NgxPaginationModule,
	],
	declarations: [
		BreadcrumbsComponent,
		VcaptchaComponent,
		FileuploadComponent,
		PeriodQueryComponent,
		BankAccountSelectorComponent,
		CardNumberInputComponent,
		ExpiryDateSelectorComponent,
		LinkButtonComponent,
		LoadScriptComponent,
		ExecScriptComponent,
		ErrorPageComponent,
		MaskPipe,
		MobilePipe,
		CreditcardPipe,
		CardNumberMaskPipe,
		NumberToHMSPipe,
		AgreeOrNotPipe,
		FilterPipe,
		MobileCreditPipe,
		CardTypePipe,
		SafeHtmlPipe,
		LoadHtmlDirective,
		DatePickerDirective,
		NumberOnlyDirective,
		MWebSelectDirective,
		CannotPasteDirective,
		DisableControlDirective,
		IdMaskDirective,
		RwdFooterComponent,
		PreventDoubleClickDirective,
		ScrollCheckDirective,
    UppercaseDirective
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		WizardModule,
		ChartModule,
		BreadcrumbsComponent,
		VcaptchaComponent,
		FileuploadComponent,
		PeriodQueryComponent,
		BankAccountSelectorComponent,
		CardNumberInputComponent,
		ExpiryDateSelectorComponent,
		LinkButtonComponent,
		LoadScriptComponent,
		ExecScriptComponent,
		DatePickerDirective,
		NumberOnlyDirective,
		MWebSelectDirective,
		CannotPasteDirective,
		LoadHtmlDirective,
		DisableControlDirective,
    UppercaseDirective,
		MaskPipe,
		MobilePipe,
		NumberToHMSPipe,
		CreditcardPipe,
		CardNumberMaskPipe,
		AgreeOrNotPipe,
		FilterPipe,
		MobileCreditPipe,
		CardTypePipe,
		IdMaskDirective,
		SafeHtmlPipe,
		RwdFooterComponent,
		PreventDoubleClickDirective,
		ScrollCheckDirective,
		NgxPaginationModule
	],
	providers: [
		SharedService
	]
})
export class SharedModule { }
export {
	AuthGuard,
	BreadcrumbsService,
	CaseInsensitiveUrlSerializer,
	ErrorPageService, ErrorPageButton,
	FastQueryOption,
	FormValidator, MyFormControl,
	GlobalErrorHandler,
	LoaderService,
	MemoryStorage,
	SessionStorage,
	PageInfoService,
	SsoService,
	VcaptchaService,
	SharedService, CustomerInfoModel,
	WebApiInvoker, BaseRequest, RequestHeader, BaseResponse,
	WizardService, WizardStep,
	AgreenRegulationHandleService
};
