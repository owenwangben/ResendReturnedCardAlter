import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormValidator, WizardService, MyFormControl,
	CustomerInfoModel, MemoryStorage } from 'app/shared/shared.module';
import { SendApplyInfoRequestModel, HomeStatusIntl, EducationGradesIntl
	} from '../../../applycard/services/applycard.models';
import { dateValidator } from 'app/shared/validators/date.validator';
import { ApplyCardPushGTM, ApplyCardPageName, SensorsTrackSubmit } from 'app/shared/utilities';
import { GetLanguage, LocaleMessages } from '../../shared/LocaleMessages';

@Component({
	selector: 'app-applycard-intl-fillout-table3',
	templateUrl: './fillout-table3.component.html'
})
export class FillOutTable3Component implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public homeStatusIntl = HomeStatusIntl;
	public educationGradesIntl = EducationGradesIntl;
	public cminfo: CustomerInfoModel;
	public idNumber: string;
	public arcExpireDate: string;
	public birthday:string;
	language: string = GetLanguage();
	message = LocaleMessages[this.language].FillOutTable3;
	btnMessage = LocaleMessages[this.language].Button;
	checkboxDefault = true;

	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private storage: MemoryStorage,
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'DateOfIssueARC',
				ErrMsg: this.message.ErrMsg.DateOfIssueARC + '<br>居留證核發日期為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(8)
					])
				)
			},
			{
				Name: 'BarCodeNumARC',
				ErrMsg: this.message.ErrMsg.BarCodeNumARC + '<br>條碼號碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'EName',
				ErrMsg: this.message.ErrMsg.ENameErr + '<br>英文姓名格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^[a-zA-Z ,.\-]*$')
					])
				)
			},
			{
				Name: 'HomeStatus',
				ErrMsg: this.message.ErrMsg.SelectDomicileStatus + '<br>請選擇現居地址狀態',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					]))
			},
			{
				Name: 'IsAddressUploadLater',	// 現居地址稍後上傳
				Control: new FormControl(undefined)
			},
			{
				Name: 'Address',
				ErrMsg: this.message.ErrMsg.Address + '<br>請輸入現居地址',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(5)
					])
				)
			},
			{
				Name: 'Phone1',
				ErrMsg: this.message.ErrMsg.TelDomicileErr + '<br>現居電話區碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^0[0-9]{1,4}$')
					])
				)
			},
			{
				Name: 'Phone2',
				ErrMsg: this.message.ErrMsg.TelDomicileErr + '<br>現居電話為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(6)
					])
				)
			},
			{
				Name: 'IsResidenceAddressIsHomeAddress',	// 戶籍地址同現居地址
				Control: new FormControl(undefined)
			},
			{
				Name: 'ResidencePhone_1',
				ErrMsg: this.message.ErrMsg.TelDomicileErr + '<br>戶籍電話區碼格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^0[0-9]{1,4}$')
					])
				)
			},
			{
				Name: 'ResidencePhone_2',
				ErrMsg: this.message.ErrMsg.TelDomicileErr + '<br>戶籍電話格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(6)
					])
				)
			},
			{
				Name: 'IsCompanyAddressSameAsHomeAddress',	// 公司地址同現居地址
				Control: new FormControl(undefined)
			},
			{
				Name: 'IsCompanyAddressUploadLater',	// 公司地址稍後上傳
				Control: new FormControl(undefined)
			},
			{
				Name: 'CompanyAddress',
				ErrMsg: this.message.ErrMsg.FillCompanyAddr + '<br>請輸入公司地址',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required,Validators.minLength(5)
					])
				)
			},
			{
				Name: 'ReceiveAddressType',
				ErrMsg: this.message.ErrMsg.SelectCardMailing + '<br>請選擇您的卡片寄送地址',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'Education',
				ErrMsg: this.message.ErrMsg.SelectEducation + '<br>請選擇您的教育程度',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'Company',
				ErrMsg: this.message.ErrMsg.ComNameErr + '<br>公司名稱為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(2)
					])
				)
			},
			{
				Name: 'CompanyPhoneAreaCode',
				ErrMsg: this.message.ErrMsg.ComTelErr + '<br>公司電話區碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^0[0-9]{1,4}$')
					])
				)
			},
			{
				Name: 'CompanyPhone',
				ErrMsg: this.message.ErrMsg.ComTelErr + '<br>公司電話為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(6)
					])
				)
			},
			{
				Name: 'CompanyPhoneEx',
				Control: new FormControl()
			},
			{
				Name: 'AnnualSalary',
				ErrMsg: this.message.ErrMsg.AnnualSalaryErr + '<br>年薪(新臺幣)為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^[0-9]{1,6}$')
					])
				)
			},
			{
				Name: 'NameOfManpowerBrokerCom',
				ErrMsg: this.message.ErrMsg.NameOfManpowerBrokerCom + '<br>請輸入人力仲介公司名稱',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.minLength(2)
					])
				)
			},
			{
				Name: 'TelOfManpowerBrokerComAreaCode',
				ErrMsg: this.message.ErrMsg.TelOfManpowerBrokerCom + '<br>人力仲介公司電話區碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.pattern('^0[0-9]{1,4}$')
					])
				)
			},
			{
				Name: 'TelOfManpowerBrokerComPhone',
				ErrMsg: this.message.ErrMsg.TelOfManpowerBrokerCom + '<br>人力仲介公司電話為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.minLength(6)
					])
				)
			},
			{
				Name: 'ManagerNameOfManpowerBrokerCom',
				ErrMsg: this.message.ErrMsg.ManagerNameOfManpowerBrokerCom + '<br>請輸入管理師/翻譯師姓名',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.minLength(2)
					])
				)
			},
			{
				Name: 'ManagerTelOfManpowerBrokerCommAreaCode',
				ErrMsg: this.message.ErrMsg.ManagerTelOfManpowerBrokerCom + '<br>管理師/翻譯師電話區碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.pattern('^0[0-9]{1,4}$')
					])
				)
			},
			{
				Name: 'ManagerTelOfManpowerBrokerComPhone',
				ErrMsg: this.message.ErrMsg.ManagerTelOfManpowerBrokerCom + '<br>管理師/翻譯師電話為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.minLength(6)
					])
				)
			},
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	async ngOnInit() {
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.辦卡流程step3, this.storage.ApplyCardSource);
		this.route.data.subscribe(data => {
			this.cminfo = data.cminfo;
			const applyinfo: SendApplyInfoRequestModel = data.applyinfo;
			this.idNumber = applyinfo.IDNumber;
			this.arcExpireDate = applyinfo.ArcExpireDate;
			this.birthday = applyinfo.Birthday ? applyinfo.Birthday : sessionStorage.getItem("ApplyCardIntl.DOB");
			this.form.patchValue({
				DateOfIssueARC: applyinfo.ArcIssueDate,
				BarCodeNumARC: applyinfo.ArcBarcodeNumber,
				EName: applyinfo.EnglishName,
				DOB: applyinfo.Birthday,
				HomeStatus: applyinfo.HomeStatus,
				IsAddressUploadLater: applyinfo.IsUploadAddress,
				Address: applyinfo.Address,
				Phone1: applyinfo.Phone_1,
				Phone2: applyinfo.Phone_2,
				IsResidenceAddressIsHomeAddress: applyinfo.IsResidenceAddressIsHomeAddress,
				ResidencePhone_1: applyinfo.ResidencePhone_1,
				ResidencePhone_2: applyinfo.ResidencePhone_2,
				IsCompanyAddressSameAsHomeAddress: applyinfo.IsCompanyAddressSameAsHomeAddress,
				IsCompanyAddressUploadLater: applyinfo.IsUploadCompanyAddress,
				CompanyAddress: applyinfo.CompanyAddress,
				ReceiveAddressType: applyinfo.ReceiveAddressType,
				Education: applyinfo.Education,
				Company: applyinfo.Company,
				CompanyPhoneAreaCode: applyinfo.CompanyPhoneAreaCode,
				CompanyPhone: applyinfo.CompanyPhone,
				CompanyPhoneEx: applyinfo.CompanyPhoneEx,
				AnnualSalary: applyinfo.AnnualSalary,
				NameOfManpowerBrokerCom: applyinfo.ManpowerBrokerCompany,
				TelOfManpowerBrokerComAreaCode: applyinfo.TelOfManpowerBrokerComAreaCode,
				TelOfManpowerBrokerComPhone: applyinfo.TelOfManpowerBrokerComPhone,
				ManagerNameOfManpowerBrokerCom: applyinfo.ManpowerBrokerCompanyManagerName,
				ManagerTelOfManpowerBrokerCommAreaCode: applyinfo.ManagerTelOfManpowerBrokerCommAreaCode,
				ManagerTelOfManpowerBrokerComPhone: applyinfo.ManagerTelOfManpowerBrokerComPhone,
			});
		});
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}

	submit() {
		if (!this.formValidator.Validate()) { return; }
		this.route.data.subscribe(data => {
			const value = this.form.value;
			const applyinfo: SendApplyInfoRequestModel = data.applyinfo;
			applyinfo.ArcIssueDate = value.DateOfIssueARC;
			applyinfo.ArcBarcodeNumber = value.BarCodeNumARC;
			applyinfo.EnglishName = value.EName;
			applyinfo.Birthday = sessionStorage.getItem("ApplyCardIntl.DOB"); //從auth帶過來
			applyinfo.HomeStatus = value.HomeStatus;
			applyinfo.IsUploadAddress = value.IsAddressUploadLater !=null? value.IsAddressUploadLater:false;
			applyinfo.Address = applyinfo.IsUploadAddress ? "" : value.Address;
			applyinfo.Phone_1 = value.Phone1;
			applyinfo.Phone_2 = value.Phone2;
			applyinfo.Phone = (value.Phone1 && value.Phone2) ? value.Phone1 + "-" + value.Phone2 : "";
			applyinfo.IsResidenceAddressIsHomeAddress = value.IsResidenceAddressIsHomeAddress;
			applyinfo.ResidenceAddress = applyinfo.Address;	// 戶籍地址預設同現居地址
			if (value.ResidencePhone_1 && value.ResidencePhone_2) {
				applyinfo.ResidencePhone = value.ResidencePhone_1 + "-" + value.ResidencePhone_2;
			}
			else {
				applyinfo.ResidencePhone = value.ResidencePhone_1 || value.ResidencePhone_2;
			}
			applyinfo.ResidencePhone_1 = value.ResidencePhone_1;
			applyinfo.ResidencePhone_2 = value.ResidencePhone_2;
			applyinfo.IsCompanyAddressSameAsHomeAddress = value.IsCompanyAddressSameAsHomeAddress != null ? value.IsCompanyAddressSameAsHomeAddress : false;
			applyinfo.IsUploadCompanyAddress = value.IsCompanyAddressUploadLater != null ? value.IsCompanyAddressUploadLater : false;
			if (applyinfo.IsCompanyAddressSameAsHomeAddress) {
				applyinfo.CompanyAddress = applyinfo.Address;
			}
			else if (applyinfo.IsUploadCompanyAddress) {
				applyinfo.CompanyAddress = "";
			}
			else {
				applyinfo.CompanyAddress = value.CompanyAddress;
			}
			applyinfo.ReceiveAddressType = value.ReceiveAddressType;
			applyinfo.Education = value.Education;
			applyinfo.Company = value.Company;
			applyinfo.CompanyPhoneAreaCode = value.CompanyPhoneAreaCode;
			applyinfo.CompanyPhone = value.CompanyPhone;
			applyinfo.CompanyPhoneEx = value.CompanyPhoneEx;
			applyinfo.AnnualSalary = value.AnnualSalary;
			applyinfo.ManpowerBrokerCompany = value.NameOfManpowerBrokerCom;
			applyinfo.TelOfManpowerBrokerComAreaCode = value.TelOfManpowerBrokerComAreaCode ? value.TelOfManpowerBrokerComAreaCode : "";
			applyinfo.TelOfManpowerBrokerComPhone = value.TelOfManpowerBrokerComPhone ? value.TelOfManpowerBrokerComPhone : "";
			applyinfo.ManpowerBrokerCompanyTel = applyinfo.TelOfManpowerBrokerComAreaCode + applyinfo.TelOfManpowerBrokerComPhone
			applyinfo.ManpowerBrokerCompanyManagerName = value.ManagerNameOfManpowerBrokerCom;
			applyinfo.ManagerTelOfManpowerBrokerCommAreaCode = value.ManagerTelOfManpowerBrokerCommAreaCode ? value.ManagerTelOfManpowerBrokerCommAreaCode : "";
			applyinfo.ManagerTelOfManpowerBrokerComPhone = value.ManagerTelOfManpowerBrokerComPhone ? value.ManagerTelOfManpowerBrokerComPhone : "";
			applyinfo.ManpowerBrokerCompanyManagerTel = applyinfo.ManagerTelOfManpowerBrokerCommAreaCode + applyinfo.ManagerTelOfManpowerBrokerComPhone;

			SensorsTrackSubmit('CardApplicationSecondInformationSubmission',
				this.storage.CardTitle, this.storage.CardType, true, '', !!this.storage.UserId, !!this.cminfo,
				applyinfo.IsCardMember, applyinfo.IsOtherCardAuth, applyinfo.Source);

			this.wizardService.GoToNextStep();
		});
	}

	Phone1onChange(value: any) {
		this.form.patchValue({
			ResidencePhone_1: value,
		});
	}

	Phone2onChange(value: any) {
		this.form.patchValue({
			ResidencePhone_2: value,
		});
	}

	defaultTrue() {
		this.form.patchValue({
			IsResidenceAddressIsHomeAddress: true,
		});
	}

	CompanyAddrSwitch(id, a41, a42) {
		if (id == 'a41') {
			if (a42.checked) {
				a41.checked = true;
				a42.checked = false;
			}
		}
		else {
			if (a41.checked) {
				a41.checked = false;
				a42.checked = true;
			}
		}
	}
}
