import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PageInfoService, FormValidator, WizardService, MyFormControl,
	ErrorPageService, CustomerInfoModel, SharedService, MemoryStorage } from 'app/shared/shared.module';
import { ApplyCardService } from '../../services/applycard.services';
import { CityAreaZipCode, SendApplyInfoRequestModel, HomeStatus,
	JobCategories, EducationGrades, IdCardIssueLocations, IdCardIssueTypes, JobTitles } from '../../services/applycard.models';
import { dateValidator } from 'app/shared/validators/date.validator';
import * as moment from 'moment';
import { pad, ApplyCardPushGTM, ApplyCardPageName, SensorsTrackSubmit } from 'app/shared/utilities';

@Component({
	selector: 'app-applycard-fillout-table3',
	templateUrl: './fillout-table3.component.html'
})
export class FillOutTable3Component implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public cityAreaZip: CityAreaZipCode[];
	public cities: string[];
	public homeStatus = HomeStatus;
	public jobCategories = JobCategories;
	public jobTitles = JobTitles;
	public educationGrades = EducationGrades;
	public cminfo: CustomerInfoModel;
	public idCardIssueLocations = IdCardIssueLocations;
	public idCardIssueTypes = IdCardIssueTypes;
	public idNumber: string;
	public Address1OldValue: string;
	public ResidenceAddress1OldValue: string;
	public CompanyAddress1OldValue: string;
  public cardFace: string;

	constructor(
		private route: ActivatedRoute,
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService,
		private wizardService: WizardService,
		private sharedService: SharedService,
		private storage: MemoryStorage,
	) {


		const controls: Array<MyFormControl> = [
			{
				Name: 'IdCardIssueDateYYY',
				ErrMsg: '身分證發證日期民國年為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^[1-9][0-9]{0,2}$')
					])
				)
			},
			{
				Name: 'IdCardIssueDateMM',
				ErrMsg: '身分證發證日期月份為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^0*[1-9]$|^1[0-2]$')
					])
				)
			},
			{
				Name: 'IdCardIssueDateDD',
				ErrMsg: '身分證發證日期為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^0*[1-9]$|^[1-2][0-9]$|^3[01]$')
					])
				)
			},
			{
				Name: 'IdCardIssueLocation',
				ErrMsg: '身分證發證地點為空',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'IdCardIssueType',
				ErrMsg: '身分證領換補類別為空',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'EName',
				ErrMsg: '英文姓名輸入有誤，僅能使用半形英文字及半形符號「,」、「.」、「-」或半形空白',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.pattern('^[A-Z ,.\-]*$')
					])
				)
			},
			//出生年月日，格式判斷and年齡限制判斷
			{
				Name: 'DOB',
				ErrMsg: "出生年月日為空或格式有誤",
				Control: new FormControl(
					undefined,
					Validators.compose([
						dateValidator(),
						Validators.required, Validators.minLength(8),
						this.ageValidator()
					])
				)
			},
			{
				Name: 'HomeStatus',
				Control: new FormControl(undefined)
			},
			{
				Name: 'Address1',
				ErrMsg: '請選擇現居地址城市',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'Address2', // 現居地址區域
				Control: new FormControl(undefined)
			},
			{
				Name: 'ZipCodeId',
				ErrMsg: '請選擇現居地址區域',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'Address3',
				ErrMsg: '現居地址為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(5)
					])
				)
			},
			{
				Name: 'Phone1',
				ErrMsg: '現居電話區碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.pattern('^0[0-9]{1,4}$')
					])
				)
			},
			{
				Name: 'Phone2',
				ErrMsg: '現居電話為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.minLength(6)
					])
				)
			},
			{
				Name: 'IsResidenceAddressIsHomeAddress',	// 同現居地址
				Control: new FormControl(undefined)
			},
			{
				Name: 'ResidenceAddress1',
				ErrMsg: '請選擇戶籍地址城市',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'ResidenceAddress2', // 戶籍地址區域
				Control: new FormControl(undefined)
			},
			{
				Name: 'ResidenceZipCodeId',
				ErrMsg: '請選擇戶籍地址區域',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'ResidenceAddress3',
				ErrMsg: '戶籍地址為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(5)
					])
				)
			},
			{
				Name: 'ResidencePhone_1',
				ErrMsg: '戶籍電話區碼格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.minLength(2)
					])
				)
			},
			{
				Name: 'ResidencePhone_2',
				ErrMsg: '戶籍電話格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.minLength(6)
					])
				)
			},
			{
				Name: 'IsCompanyAddressSameAsHomeAddress',	// 同現居地址
				Control: new FormControl(undefined)
			},
			{
				Name: 'CompanyAddress1',
				ErrMsg: '請選擇公司地址城市',
				Control: new FormControl(undefined)
			},
			{
				Name: 'CompanyAddress2', // 公司地址區域
				Control: new FormControl(undefined)
			},
			{
				Name: 'CompanyZipCodeId',
				ErrMsg: '請選擇公司地址區域',
				Control: new FormControl(undefined)
			},
			{
				Name: 'CompanyAddress3',
				ErrMsg: '公司地址為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.minLength(5)
					])
				)
			},
			{
				Name: 'ReceiveAddressType',
				ErrMsg: '請選擇您的卡片寄送地址',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'JobCategoryIndex',
				ErrMsg: '請選擇您的職業類型',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'JobTitle',
				ErrMsg: '請選擇您的職業名稱',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'Education',
				ErrMsg: '請選擇您的教育程度',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'Company',
				ErrMsg: '公司名稱為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(2)
					])
				)
			},
			{
				Name: 'CompanyPhoneAreaCode',
				ErrMsg: '公司電話區碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^0[0-9]{1,4}$')
					])
				)
			},
			{
				Name: 'CompanyPhone',
				ErrMsg: '公司電話為空或格式有誤',
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
				ErrMsg: '年薪(新臺幣)為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^[0-9]{1,6}$')
					])
				)
			},
			{
				Name: 'LegalName',
				ErrMsg: '父母或法定代理人中文姓名為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(2)
					])
				)
			},
			{
				Name: 'LegalPhone1',
				ErrMsg: '父母或法定代理人連絡電話區碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(2)
					])
				)
			},
			{
				Name: 'LegalPhone2',
				ErrMsg: '父母或法定代理人連絡電話為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(6)
					])
				)
			},
			{
				Name: 'AgreeInspectLandRegisterDoc',
				Control: new FormControl(undefined)
			},
			{
				Name: 'LandRegisterAddressType',
				ErrMsg: '請選擇不動產謄本地址',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'LandRegisterAddress1',
				ErrMsg: '請選擇不動產謄本地址城市',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'LandRegisterZipCodeId', // 不動產謄本地址的郵地區號
				ErrMsg: '請選擇不動產謄本地址區域',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'LandRegisterAddress2',
				Control: new FormControl(undefined)
			},
			{
				Name: 'LandRegisterAddress3',
				ErrMsg: '不動產謄本地址為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(5)
					])
				)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls, () => {
			if (!this.cminfo || (!this.cminfo.ID || !this.cminfo.IsCardMember)) {
				const yyyy = (parseInt( this.form.value.IdCardIssueDateYYY, 10) + 1911).toString();
				const mm = pad("00", this.form.value.IdCardIssueDateMM);
				const dd = pad("00", this.form.value.IdCardIssueDateDD);
				const idCardIssueDate = yyyy + "-" + mm + "-" + dd;
				const d = moment(idCardIssueDate);
				if (!d.isValid() || !d.isBefore(moment().format('YYYY-MM-DD'))) {
					errorPageService.display("身分證發證日期不正確", false);
					return false;
				}
			}

			if (!this.form.controls.IsCompanyAddressSameAsHomeAddress.value &&
				(this.form.controls.CompanyAddress1.value || this.form.controls.CompanyZipCodeId.value !== undefined ||
					this.form.controls.CompanyAddress3.value) &&
				(!this.form.controls.CompanyAddress1.value || this.form.controls.CompanyZipCodeId.value === undefined ||
					!this.form.controls.CompanyAddress3.value)) {
				errorPageService.display("公司地址資料不完整", false);
					return false;
			}

			return true;
		});

		this.form.controls.Address1.valueChanges.subscribe(() => {
			this.form.controls.ZipCodeId.setValue(undefined);
			this.form.controls.Address2.setValue(undefined);

			if (!this.form.controls.Address3.dirty && this.form.controls.Address1.value && !this.Address1OldValue) {
				this.form.controls.Address3.setValue(undefined);
			}
			this.Address1OldValue = this.form.controls.Address1.value;
		});

		this.form.controls.ResidenceAddress1.valueChanges.subscribe(() => {
			this.form.controls.ResidenceZipCodeId.setValue(undefined);
			this.form.controls.ResidenceAddress2.setValue(undefined);

			if (!this.form.controls.ResidenceAddress3.dirty && this.form.controls.ResidenceAddress1.value && !this.ResidenceAddress1OldValue) {
				this.form.controls.ResidenceAddress3.setValue(undefined);
			}
			this.ResidenceAddress1OldValue = this.form.controls.ResidenceAddress1.value;
		});
		this.form.controls.CompanyAddress1.valueChanges.subscribe(() => {
			this.form.controls.CompanyZipCodeId.setValue(undefined);
			this.form.controls.CompanyAddress2.setValue(undefined);

			if (!this.form.controls.CompanyAddress3.dirty && this.form.controls.CompanyAddress1.value && !this.CompanyAddress1OldValue) {
				this.form.controls.CompanyAddress3.setValue(undefined);
			}
			this.CompanyAddress1OldValue = this.form.controls.CompanyAddress1.value;
		});
		this.form.controls.IsResidenceAddressIsHomeAddress.valueChanges.subscribe(value => {
			this.form.controls.ReceiveAddressType.setValue(value && this.form.value.IsCompanyAddressSameAsHomeAddress ? 1 : undefined);
		});
		this.form.controls.IsCompanyAddressSameAsHomeAddress.valueChanges.subscribe(value => {
			this.form.controls.ReceiveAddressType.setValue(value && this.form.value.IsResidenceAddressIsHomeAddress ? 1 : undefined);
		});
		this.form.controls.JobCategoryIndex.valueChanges.subscribe(value => {
			if (value === "24" || value === "25" || value === "26") {
				this.form.controls.JobTitle.setValue(undefined);
				this.form.controls.Company.setValue(undefined);
				this.form.controls.CompanyPhoneAreaCode.setValue(undefined);
				this.form.controls.CompanyPhone.setValue(undefined);
				this.form.controls.CompanyPhoneEx.setValue(undefined);
				this.form.controls.AnnualSalary.setValue(undefined);
			}
		});
	}

	async ngOnInit() {
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.辦卡流程step3, this.storage.ApplyCardSource);
		await this.getZipCodeData();
    this.cardFace = this.storage.CardFace;
		this.route.data.subscribe(data => {
			this.cminfo = data.cminfo;
			const applyinfo: SendApplyInfoRequestModel = data.applyinfo;
			this.idNumber = applyinfo.IDNumber;
			if (!!applyinfo.Address) {
				const NewAddress = this.GetCityAreaFromAddress(applyinfo.Address);
				applyinfo.Address1 = NewAddress.CityArea.City;
				applyinfo.Address3 = NewAddress.NewAddress;
				applyinfo.ZipCodeId = NewAddress.CityArea.Id;
			}
			if (!!applyinfo.ResidenceAddress) {
				const NewResidenceAddress = this.GetCityAreaFromAddress(applyinfo.ResidenceAddress);
				applyinfo.ResidenceAddress1 = NewResidenceAddress.CityArea.City;
				applyinfo.ResidenceAddress3 = NewResidenceAddress.NewAddress;
				applyinfo.ResidenceZipCodeId = NewResidenceAddress.CityArea.Id;
			}
			if (!!applyinfo.CompanyAddress) {
				const NewCompanyAddress = this.GetCityAreaFromAddress(applyinfo.CompanyAddress);
				applyinfo.CompanyAddress1 = NewCompanyAddress.CityArea.City;
				applyinfo.CompanyAddress3 = NewCompanyAddress.NewAddress;
				applyinfo.CompanyZipCodeId = NewCompanyAddress.CityArea.Id;
			}

			this.form.patchValue({
				IdCardIssueDateYYY: applyinfo.IdCardIssueDateYYY,
				IdCardIssueDateMM: applyinfo.IdCardIssueDateMM,
				IdCardIssueDateDD: applyinfo.IdCardIssueDateDD,
				IdCardIssueLocation: applyinfo.IdCardIssueLocation,
				IdCardIssueType: applyinfo.IdCardIssueType,
				EName: applyinfo.EnglishName && applyinfo.EnglishName.toUpperCase(),
				DOB: applyinfo.Birthday,

				HomeStatus: applyinfo.HomeStatus,
				Address1: applyinfo.Address1,
				Address2: applyinfo.Address2,
				Address3: applyinfo.Address3,
				ZipCode: applyinfo.ZipCode,
				ZipCodeId: applyinfo.ZipCodeId,
				Phone1: applyinfo.Phone_1,
				Phone2: applyinfo.Phone_2,
				IsResidenceAddressIsHomeAddress: applyinfo.IsResidenceAddressIsHomeAddress,
				ResidenceAddress1: applyinfo.ResidenceAddress1,
				ResidenceAddress2: applyinfo.ResidenceAddress2,
				ResidenceAddress3: applyinfo.ResidenceAddress3,
				ResidenceZipCode: applyinfo.ResidenceZipCode,
				ResidenceZipCodeId: applyinfo.ResidenceZipCodeId,
				ResidencePhone_1: applyinfo.ResidencePhone_1,
				ResidencePhone_2: applyinfo.ResidencePhone_2,
				IsCompanyAddressSameAsHomeAddress: applyinfo.IsCompanyAddressSameAsHomeAddress,
				CompanyAddress1: applyinfo.CompanyAddress1,
				CompanyAddress2: applyinfo.CompanyAddress2,
				CompanyAddress3: applyinfo.CompanyAddress3,
				CompanyZipCode: applyinfo.CompanyZipCode,
				CompanyZipCodeId: applyinfo.CompanyZipCodeId,
				ReceiveAddressType: applyinfo.ReceiveAddressType,
				JobCategoryIndex: applyinfo.JobCategoryIndex,
				JobCategoryCode: applyinfo.JobCategoryCode,
				JobCategory: applyinfo.JobCategory,
				JobTitle: applyinfo.JobTitle,
				Education: applyinfo.Education,
				Company: applyinfo.Company,
				CompanyPhoneAreaCode: applyinfo.CompanyPhoneAreaCode,
				CompanyPhone: applyinfo.CompanyPhone,
				CompanyPhoneEx: applyinfo.CompanyPhoneEx,
				IsMaster: applyinfo.IsMaster,
				AnnualSalary: applyinfo.AnnualSalary,
				LegalName: applyinfo.LegalName,
				LegalPhone1: applyinfo.LegalPhone1,
				LegalPhone2: applyinfo.LegalPhone2,
				AgreeInspectLandRegisterDoc: applyinfo.AgreeInspectLandRegisterDoc,
				LandRegisterAddress: applyinfo.LandRegisterAddress,
				LandRegisterZipCode: applyinfo.LandRegisterZipCode,
				LandRegisterZipCodeId: applyinfo.LandRegisterZipCodeId,
				LandRegisterAddress1: applyinfo.LandRegisterAddress1,
				LandRegisterAddress2: applyinfo.LandRegisterAddress2,
				LandRegisterAddress3: applyinfo.LandRegisterAddress3,
				LandRegisterAddressType: applyinfo.LandRegisterAddressType
			});
		});
	}

	async getZipCodeData() {
		const response = await this.sharedService.getZip3Code();
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.cityAreaZip = response.Result.Items.map((x, i) => {
				return {
					Id: i,
					City: x.City,
					Area: x.Area,
					ZipCode: x.ZipCode
				} as CityAreaZipCode;
			});

			this.cities = Array.from(new Set(this.cityAreaZip.map(item => item.City)));
		}
	}

	getAreas(city: string) {
		return this.cityAreaZip && this.cityAreaZip
			.filter(item => item.City === city)
			.map(item => item);
	}

	getArea(zipCodeId: number) {
		const areas = this.cityAreaZip && this.cityAreaZip
			.filter(item => item.Id === zipCodeId)
			.map(item => item.Area);
		return areas[0];
	}

	getZipCode(zipCodeId: number) {
		const data = this.cityAreaZip && this.cityAreaZip
			.filter(item => item.Id === zipCodeId)
			.map(item => item.ZipCode);
		return data[0];
	}

	private GetCityAreaFromAddress(Address: string) {
		const CityArea = new CityAreaZipCode();
		if ( !Address ) {
			return { CityArea: CityArea, NewAddress: undefined};
		}
		let Area ;
		let NewAddress = Address;
		CityArea.City = this.cities && this.cities
			.find(item => Address.indexOf(item) !== -1);
		Area = CityArea.City && this.getAreas(CityArea.City)
			.find(item => Address.indexOf(item.Area) !== -1);
		CityArea.Id = Area && Area.Id;

		if (CityArea.City) {
			NewAddress = NewAddress.replace(CityArea.City, '');
			if (Area) {
				NewAddress = NewAddress.replace(Area.Area, '');
			}
		}
		return { CityArea : CityArea , NewAddress : NewAddress };
	}

	goPrev() {
		if(+this.storage.CifType == 5){
			this.wizardService.GoToStep(1);
		}
		else{
			this.wizardService.GoToPrevStep();
		}

	}

	checkOCRModify(applyinfo: SendApplyInfoRequestModel, value: any) {
		if (applyinfo.IdCardIssueDateYYY != value.IdCardIssueDateYYY) {
			return true;
		}
		if (applyinfo.IdCardIssueDateMM != value.IdCardIssueDateMM) {
			return true;
		}
		if (applyinfo.IdCardIssueDateDD != value.IdCardIssueDateDD) {
			return true;
		}
		if (applyinfo.IdCardIssueLocation != value.IdCardIssueLocation) {
			return true;
		}
		if (applyinfo.IdCardIssueType != value.IdCardIssueType) {
			return true;
		}
		if (applyinfo.Birthday != value.DOB) {
			return true;
		}
		return false;
	}

	submit() {
		if (!this.formValidator.Validate()) { return; }

		if ((!this.cminfo.IsCardMember && (!!this.cminfo.EName && (this.form.value.EName !== this.cminfo.EName && this.form.value.EName !== this.cminfo.EName.toUpperCase())))) {

			this.errorPageService.confirm("您填具的英文姓名與本行資料不符，請再次確認", "確認無誤", "重新輸入", (ok) => {
				if (ok) {
					this.doSubmit();
				}
				else {
					this.formValidator.SetFocus("EName");
				}
			});
		}
		else {
			this.doSubmit();
		}
	}

	doSubmit() {

		this.route.data.subscribe(data => {
			const value = this.form.value;
			const applyinfo: SendApplyInfoRequestModel = data.applyinfo;
			if (applyinfo.IsModifyOcrInfo == false) {
				applyinfo.IsModifyOcrInfo = this.checkOCRModify(applyinfo, value);
			}
			applyinfo.IdCardIssueDateYYY = value.IdCardIssueDateYYY;
			applyinfo.IdCardIssueDateMM = value.IdCardIssueDateMM;
			applyinfo.IdCardIssueDateDD = value.IdCardIssueDateDD;
			applyinfo.IdCardIssueLocation = value.IdCardIssueLocation;
			applyinfo.IdCardIssueType = value.IdCardIssueType;
			applyinfo.EnglishName = value.EName;
			applyinfo.Birthday = value.DOB;
			applyinfo.HomeStatus = value.HomeStatus;

			value.Address2 = this.getArea(value.ZipCodeId);
			applyinfo.Address = value.Address1 + value.Address2 + value.Address3;
			applyinfo.Address1 = value.Address1;
			applyinfo.Address2 = value.Address2;
			applyinfo.Address3 = value.Address3;
			applyinfo.ZipCode = this.getZipCode(value.ZipCodeId);
			applyinfo.ZipCodeId = value.ZipCodeId;

			applyinfo.Phone_1 = value.Phone1;
			applyinfo.Phone_2 = value.Phone2;
			if (value.Phone2) {
				applyinfo.Phone = value.Phone1 + (value.Phone1 ? "-" : "") + value.Phone2;
			}
			else {
				applyinfo.Phone = "";
			}
			applyinfo.IsResidenceAddressIsHomeAddress = value.IsResidenceAddressIsHomeAddress;
			if (applyinfo.IsResidenceAddressIsHomeAddress) {
				applyinfo.ResidenceAddress = null;
				applyinfo.ResidenceAddress1 = null;
				applyinfo.ResidenceAddress2 = null;
				applyinfo.ResidenceAddress3 = null;
				applyinfo.ResidenceZipCode = null;
				applyinfo.ResidenceZipCodeId = undefined;
			}
			else {
				value.ResidenceAddress2 = this.getArea(value.ResidenceZipCodeId);
				applyinfo.ResidenceAddress = value.ResidenceAddress1 + value.ResidenceAddress2 + value.ResidenceAddress3;
				applyinfo.ResidenceAddress1 = value.ResidenceAddress1;
				applyinfo.ResidenceAddress2 = value.ResidenceAddress2;
				applyinfo.ResidenceAddress3 = value.ResidenceAddress3;
				applyinfo.ResidenceZipCode = this.getZipCode(value.ResidenceZipCodeId);
				applyinfo.ResidenceZipCodeId = value.ResidenceZipCodeId;
			}
			if (value.ResidencePhone_1 && value.ResidencePhone_2) {
				applyinfo.ResidencePhone = value.ResidencePhone_1 + "-" + value.ResidencePhone_2;
			}
			else {
				applyinfo.ResidencePhone = value.ResidencePhone_1 || value.ResidencePhone_2;
			}
			applyinfo.ResidencePhone_1 = value.ResidencePhone_1;
			applyinfo.ResidencePhone_2 = value.ResidencePhone_2;
			applyinfo.IsCompanyAddressSameAsHomeAddress = value.IsCompanyAddressSameAsHomeAddress;
			if (applyinfo.IsCompanyAddressSameAsHomeAddress) {
				applyinfo.CompanyAddress = null;
				applyinfo.CompanyAddress1 = null;
				applyinfo.CompanyAddress2 = null;
				applyinfo.CompanyAddress3 = null;
				applyinfo.CompanyZipCode = null;
				applyinfo.CompanyZipCodeId = undefined;
			}
			else {
				value.CompanyAddress2 = this.getArea(value.CompanyZipCodeId);
				applyinfo.CompanyAddress = value.CompanyAddress1 + value.CompanyAddress2 + value.CompanyAddress3;
				applyinfo.CompanyAddress1 = value.CompanyAddress1;
				applyinfo.CompanyAddress2 = value.CompanyAddress2;
				applyinfo.CompanyAddress3 = value.CompanyAddress3;
				applyinfo.CompanyZipCode = this.getZipCode(value.CompanyZipCodeId);
				applyinfo.CompanyZipCodeId = value.CompanyZipCodeId;
			}
			applyinfo.ReceiveAddressType = value.ReceiveAddressType;
			applyinfo.JobCategoryIndex = value.JobCategoryIndex;
			applyinfo.JobCategoryCode = this.jobCategories.find(it => it.Index === value.JobCategoryIndex).Key;
			applyinfo.JobCategory = this.jobCategories.find(it => it.Index === value.JobCategoryIndex).Value ;
			applyinfo.JobTitle = value.JobTitle;
			applyinfo.IsStudent = value.JobCategoryIndex === "24";
			applyinfo.IsMeido = value.JobCategoryIndex === "26";
			applyinfo.Education = value.Education;
			if (!applyinfo.IsStudent && !applyinfo.IsMeido) {
				applyinfo.Company = value.Company;
				applyinfo.CompanyPhoneAreaCode = value.CompanyPhoneAreaCode;
				applyinfo.CompanyPhone = value.CompanyPhone;
				applyinfo.CompanyPhoneEx = value.CompanyPhoneEx;
				applyinfo.IsMaster = value.IsMaster;
				applyinfo.AnnualSalary = value.AnnualSalary;
			}
			if (applyinfo.IsStudent) {
				applyinfo.LegalName = value.LegalName;
				applyinfo.LegalPhone = value.LegalPhone1 + "-" + value.LegalPhone2;
				applyinfo.LegalPhone1 = value.LegalPhone1;
				applyinfo.LegalPhone2 = value.LegalPhone2;
			}
			applyinfo.AgreeInspectLandRegisterDoc = value.AgreeInspectLandRegisterDoc;
			if (applyinfo.AgreeInspectLandRegisterDoc) {
				applyinfo.LandRegisterAddressType = value.LandRegisterAddressType;
				if (applyinfo.LandRegisterAddressType === 3) {
					value.LandRegisterAddress2 = this.getArea(value.LandRegisterZipCodeId);
					applyinfo.LandRegisterAddress = value.LandRegisterAddress1 + value.LandRegisterAddress2 + value.LandRegisterAddress3;
					applyinfo.LandRegisterAddress1 = value.LandRegisterAddress1;
					applyinfo.LandRegisterAddress2 = value.LandRegisterAddress2;
					applyinfo.LandRegisterAddress3 = value.LandRegisterAddress3;
					applyinfo.LandRegisterZipCode = this.getZipCode(value.LandRegisterZipCodeId);
					applyinfo.LandRegisterZipCodeId = value.LandRegisterZipCodeId;
				}
			}
			if (!applyinfo.AgreeInspectLandRegisterDoc || applyinfo.LandRegisterAddressType !== 3) {
				if (!applyinfo.AgreeInspectLandRegisterDoc) {
					applyinfo.LandRegisterAddressType = null;
				}
				applyinfo.LandRegisterAddress = null;
				applyinfo.LandRegisterAddress1 = undefined;
				applyinfo.LandRegisterAddress2 = undefined;
				applyinfo.LandRegisterAddress3 = null;
				applyinfo.LandRegisterZipCode = null;
				applyinfo.LandRegisterZipCodeId = undefined;
			}

			SensorsTrackSubmit('CardApplicationSecondInformationSubmission',
				this.storage.CardTitle, this.storage.CardType, true, '', !!this.storage.UserId, !!this.cminfo,
				applyinfo.IsCardMember, applyinfo.IsOtherCardAuth, applyinfo.Source);

			this.wizardService.GoToNextStep();
		});
	}

	// 2023年1月1日民法成年人變更為18歲
	checkLegalAge() {
		const date = new Date();
		const today = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
		return today >= this.applyCardService.legalAgeDate;
	}

	ageValidator(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } => {
			//基本設定
			const dateStr = control.value;
			const invalidObj = { 'age': false };
			//取得滿20/18歲的日期
			const today = new Date();
			const age = this.checkLegalAge() ? 18 : 20;
			const max_dob = (today.getFullYear() - age) * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
			//進行比對
			if(dateStr > max_dob) {
				this.errorPageService.display(this.checkLegalAge()? "須年滿18歲":"須年滿20歲", false);
				return invalidObj
			}
			return null;
		};
	}
}
