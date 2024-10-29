import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms/';
import { SafeUrl } from '@angular/platform-browser';
import { ErrorPageService, FormValidator, MyFormControl, PageInfoService, VcaptchaService, MemoryStorage } from 'app/shared/shared.module';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-auth-mbill',
	templateUrl: './mbill.component.html',
	styles: [`
    input[type="number"] {
		border: 1px solid #CCC;
		border-radius: 3px;
		background-color: #FFF;
		padding: 8px;
		margin-bottom: 10px;
    }
  `]
})
export class AuthMBillComponent implements OnInit {
	private token: string;
	private returnUrl: string;
	private returnParams: string;
	private formValidator = new FormValidator();
	public form: FormGroup;
	public vcaptchaUrl: SafeUrl | string;
	public language = '';
	public selectedLanguage;
	public languageList = [
		{Code: 'zh_TW', Name: '中文'},
		{Code: 'en', Name: 'English'},
		{Code: 'vi', Name: 'Tiếng Việt'},      // 越南文
		{Code: 'id', Name: 'Bahasa Indonesia'} // 印尼文
	];
	public title: string;
	public messages;
	public LocaleMessages = {
		zh_TW: {
			Header: {
				Title: '信用卡行動帳單'
			},
			Auth: {
				HeaderText: '登入行動帳單',
				IDText: '身分證字號(統編)末四碼',
				IsAutoDebitText: '新台幣帳單繳款方式是否為自動扣款',
				Yes: '是',
				No: '否',
				captchaText: '輸入驗證碼',
				captchaPlaceholder: '驗證碼',
				submitText: '登入',
				FormControlErrors: {
					ID: '身分證字號(統編)末四碼為空或格式有誤',
					IsAutoDebit: '請選擇新台幣帳單繳款方式是否為自動扣款',
					captcha: '驗證碼為空或格式錯誤'
				},
				OkBtn: '確定',
				ResultMessage: {
					'01': '資料輸入錯誤，驗證失敗。',
					'02': '帳單年月超過一年',
					'03': '資料輸入錯誤，驗證失敗。',
					'E0': '系統整理中，請稍後再試。',
					'S0': '系統整理中，請稍後再試。',
				}
			}
		},
		en: {
			Header: {
				Title: 'Statement'
			},
			Auth: {
				HeaderText: 'Log in mobile billing statement',
				IDText: 'Last 4 digits of ID card No./uniform No./Alien Resident Certificate(ARC)',
				IsAutoDebitText: 'Autopay for NTD billing charge?',
				Yes: 'Yes',
				No: 'No',
				captchaText: 'Input  the verification code',
				captchaPlaceholder: 'verification code',
				submitText: 'Log in',
				FormControlErrors: {
					ID: 'Last four digits of ID Card No. are blank  or its format is wrong',
					IsAutoDebit: 'Please select whether NTD billing charges are to be paid by automatic debiting',
					captcha: 'Verification code is blank or in incorrect format'
				},
				OkBtn: 'OK',
				ResultMessage: {
					'01': 'Error input of data; verification fails',
					'02': 'year/month of billing statement exceeds one year',
					'03': 'Error input of data; verification fails',
					'E0': 'System is preparing; please try again later',
					'S0': 'System is preparing; please try again later',
				}
			}
		},
		vi: {
			Header: {
				Title: 'Statement'
			},
			Auth: {
				HeaderText: 'Đăng nhập Hóa đơn di động',
				IDText: '4 mã cuối của Số CMND/Mã số/Thẻ cư trú',
				IsAutoDebitText: 'Có tự động khấu trừ tiền Đài tệ để thanh toán hóa đơn không',
				Yes: 'Có',
				No: 'Không',
				captchaText: 'Nhập mã xác thực',
				captchaPlaceholder: 'Mã xác nhận',
				submitText: 'Trang đăng',
				FormControlErrors: {
					ID: '4 mã cuối của số Chứng minh thư (Thẻ cư trú) bị trống hoặc định dạng sai',
					IsAutoDebit: 'Vui lòng chọn có tự động khấu trừ tiền Đài tệ để thanh toán hóa đơn không',
					captcha: 'Mã xác nhận trống hoặc định dạng sai'
				},
				OkBtn: 'OK',
				ResultMessage: {
					'01': 'Thông tin nhập vào không đúng, xác nhận thất bại',
					'02': 'Tháng và năm của hóa đơn quá thời gian 1 năm',
					'03': 'Thông tin nhập vào không đúng, xác nhận thất bại',
					'E0': 'Hệ thống đang bận, vui lòng thử lại sau.',
					'S0': 'Hệ thống đang bận, vui lòng thử lại sau.',
				}
			}
		},
		id: {
			Header: {
				Title: 'Statement'
			},
			Auth: {
				HeaderText: 'Login ke tagihan mobile',
				IDText: 'Nomor KTP / basis data terpadu / izin tinggal 4 digit terakhir',
				IsAutoDebitText: 'Apakah metode pembayaran tagihan NTD secara pemotongan otomatis',
				Yes: 'Ya',
				No: 'Tidak',
				captchaText: 'Masukkan kode verifikasi',
				captchaPlaceholder: 'kode verifikasi',
				submitText: 'Log in',
				FormControlErrors: {
					ID: 'Empat digit terakhir nomor ID (basis data terpadu) kosong atau salah format',
					IsAutoDebit: 'Pilih apakah metode pembayaran tagihan NTD secara pemotongan otomatis',
					captcha: 'Kode verifikasi kosong atau salah format'
				},
				OkBtn: 'Baik',
				ResultMessage: {
					'01': 'Kesalahan input data, verifikasi gagal',
					'02': 'Tahun dan bulan penagihan melebihi satu tahun',
					'03': 'Kesalahan input data, verifikasi gagal',
					'E0': 'Sistem dalam penataan, coba lagi nanti',
					'S0': 'Sistem dalam penataan, coba lagi nanti',
				}
			}
		}
	};
	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private router: Router,
		private vcaptchaService: VcaptchaService,
		private storage: MemoryStorage,
		private authService: AuthService,
		private errorPageService: ErrorPageService,
	) {
		this.route.queryParams.subscribe(params => {
			this.token = params.token;
			this.returnUrl = params.return;
			this.returnParams = this.returnUrl && this.returnUrl.split('?')[1];

		});

		this.selectedLanguage = 'zh_TW';
		this.messages = this.LocaleMessages[this.selectedLanguage].Auth;
		this.title = this.LocaleMessages[this.selectedLanguage].Header.Title;
		const controls: Array<MyFormControl> = [
			{
				Name: 'ID',
				ErrMsg: '身分證字號(統編)末四碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^[0-9a-zA-Z]{4}$')
					])
				)
			},
			{
				Name: 'IsAutoDebit',
				ErrMsg: '請選擇新台幣帳單繳款方式是否為自動扣款',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'captcha',
				ErrMsg: '驗證碼為空或格式錯誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(6)
					])
				)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	public async ngOnInit() {
		sessionStorage.clear();
		await this.changeVcaptcha();
	}

	public async changeVcaptcha() {
		this.vcaptchaUrl = await this.vcaptchaService.getVcaptchaUrl();
	}

	public async submit() {
		if (!this.formValidator.Validate(this.messages.FormControlErrors, this.messages.OkBtn)) { return; }

		const value = this.form.value;
		const response = await this.authService.verifyMBill(this.token, value.ID, value.IsAutoDebit, value.captcha);
		const errMsg = this.messages.ResultMessage[response.ResultCode] ?
			this.messages.ResultMessage[response.ResultCode] : response.ResultMessage;
		if (this.errorPageService.validateResponse(response, { redirect: false, errMessage: errMsg },
			this.messages.OkBtn)) {

			if (response.Result) {
				sessionStorage.setItem("MBILL.STMTDATE", response.Result.STMTDATE);
				sessionStorage.setItem("MBILL.STMTMM", response.Result.STMTMM);
				sessionStorage.setItem("MBILL.Language", this.selectedLanguage);
			}
			this.router.navigateByUrl(this.returnUrl);
		}
	}

	public onSelectLanguage($event) {
		this.selectedLanguage = $event;
		this.messages = this.LocaleMessages[$event].Auth;
		this.title = this.LocaleMessages[$event].Header.Title;
	}
}
