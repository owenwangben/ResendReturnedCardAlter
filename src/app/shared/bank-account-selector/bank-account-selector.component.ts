import { Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SharedService } from '../shared.services';
import { BankViewModel, BankBranchViewModel, TransferAccountViewModel } from '../shared.models';

const componentbase = {
	selector: 'app-bank-account-selector',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => BankAccountSelectorComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => BankAccountSelectorComponent),
			multi: true
		}
	]
};

const component: Component = {
	templateUrl: './bank-account-selector.component.html',
	selector: componentbase.selector,
	providers: componentbase.providers
};

const mobileComponent: Component = {
	templateUrl: './bank-account-selector.component.mobile.html',
	selector: componentbase.selector,
	providers: componentbase.providers
};

@Component(environment.IsMobile ? mobileComponent : component)
export class BankAccountSelectorComponent implements ControlValueAccessor, OnInit, Validator {
	@Output() bankChange = new EventEmitter<string>();
	@Output() bankDisplayNameChange = new EventEmitter<string>();
	@Output() branchChange = new EventEmitter<string>();
	@Output() branchDisplayNameChange = new EventEmitter<string>();
	@Output() accountChange = new EventEmitter<string>();
	@Input() T24Enabled = true;
	@Input() FunctionName = '';
	private valueSubject= new BehaviorSubject(null);
	public BankAccount: FormGroup;
	public IsSinoPacAccountSelected = false;
	public bankType = '';
	public BankTypes: { Type: string, TypeName: string }[];
	public TransferAccounts: TransferAccountViewModel[] = [];
	public Banks: BankViewModel[];
	public DefaultBanks: BankViewModel[];
	public Branches: BankBranchViewModel[] = [];
	readonly sinoPacBankCode: string = '807';
	private isBranchListLoading = false;
	private onChange: any = (evt: any) => { };

	@Input()
	set bank(value: string) {
		if (this.bank !== value) {
			this.BankAccount.controls.bank.setValue(value ? value : '');
		}
	}
	get bank(): string {
		return this.BankAccount.controls.bank.value;
	}

	@Input()
	set branch(value: string) {
		if (this.branch !== value) {
			this.BankAccount.controls.branch.setValue(value ? value : '');
		}
	}
	get branch(): string {
		return this.BankAccount.controls.branch.value;
	}

	@Input()
	set account(value: string) {
		value = value && value.trim();
		if (this.account !== value) {
			this.BankAccount.controls.account.setValue(value);
		}
	}
	get account(): string {
		return this.BankAccount.controls.account.value;
	}

	get IsSinoPacAccountAvailable() {
		return this.TransferAccounts.length > 0;
	}

	constructor(
		private changeDetector: ChangeDetectorRef,
		private service: SharedService,
		private fb: FormBuilder
	) {
		this.BankTypes = [
			{ Type: '1', TypeName: '本國銀行' },
			{ Type: '2', TypeName: '外國銀行' },
			{ Type: '3', TypeName: '信用合作社' },
			{ Type: '4', TypeName: '農會' },
			{ Type: '5', TypeName: '郵局' },
			{ Type: '6', TypeName: '漁會' },
			{ Type: '9', TypeName: '其他金融機構' }];

		this.BankAccount = fb.group({
			bank: new FormControl('', Validators.required),
			branch: new FormControl('', Validators.required),
			account: new FormControl('', Validators.required),
			isSinoPacAccountAvailable: new FormControl(null),
		});

		this.BankAccount.controls.bank.valueChanges.subscribe($event => this.bankChanged($event));
		this.BankAccount.controls.branch.valueChanges.subscribe($event => this.branchChanged($event));
		this.BankAccount.controls.account.valueChanges.subscribe($event => this.accountChanged($event));
		this.BankAccount.valueChanges.subscribe($event => this.bankAccountChanged($event));
	}

	async ngOnInit() {
		// console.log('bank-account-selector.ngOnInit', this.BankAccount.value);
		this.Banks = await this.service.GetBankList();
		this.DefaultBanks = this.Banks;
		this.TransferAccounts = this.T24Enabled && await this.service.GetTransferAccounts() || [];
		this.valueSubject.subscribe(value => {
			if (value) {
				value.isSinoPacAccountAvailable = this.IsSinoPacAccountAvailable;
				if (!value.bank && this.IsSinoPacAccountAvailable) { value.bank = this.sinoPacBankCode; }
				this.IsSinoPacAccountSelected = this.IsSinoPacAccountAvailable && value.bank === this.sinoPacBankCode;
				if (!this.IsSinoPacAccountSelected) {
					const bank = this.Banks.find(item => item.BankCode === value.bank);
					this.bankType = bank ? bank.Type : '';
				}
				this.BankAccount.setValue(value);
			}
		});
	}

	bankTypeChanged($event) {
		if (!environment.IsMobile) {
			this.Banks = this.DefaultBanks;
			this.Banks = this.Banks.filter(item => item.Type === this.bankType);
			if (!this.IsSinoPacAccountSelected && this.FunctionName.toLowerCase()=='cash'){
				this.Banks = this.Banks.filter(item => item.BankCode !== this.sinoPacBankCode);
			}
		}

		if ($event && this.bank) {
			const bank = this.Banks.find(item => item.BankCode === this.bank);
			// console.log('bankTypeChanged', $event, this.bank, bank);
			if (!bank || $event !== bank.Type) {
				this.bank = '';
				// console.log('bankTypeChanged, bank=empty');
			}
		}
	}

	async bankChanged($event) {
		// console.log('bankChanged', $event, this.IsSinoPacAccountSelected);
		this.BankAccount.controls.branch.setValidators(this.IsSinoPacAccountSelected ? null : Validators.required);
		if (!this.IsSinoPacAccountSelected) {
			if ($event && (this.Branches.length === 0 || this.Branches[0].BankCode !== $event)) {
				if (this.isBranchListLoading) { return; }
				// console.log('********this.Branches 1', $event, this.Branches);
				try {
					this.isBranchListLoading = true;
					this.Branches = [];
					this.Branches = await this.service.GetBranchList($event);
				}
				finally {
					this.isBranchListLoading = false;
				}
				// console.log('********this.Branches 2', $event, this.Branches);
			}

			if ($event === this.valueSubject.value.bank) {
				this.branch = this.valueSubject.value.branch;
			}
			else {
				this.branch = '';
			}
		}
		this.bankChange.emit($event);
		if (this.Banks) {
			const bank = this.Banks.find(item => item.BankCode === $event);
			if (bank) {
				this.bankDisplayNameChange.emit(bank ? bank.BankName : '');
			}
		}
	}

	branchChanged($event) {
		// console.log('branchChanged', $event);
		if ($event === this.valueSubject.value.branch && this.bank === this.valueSubject.value.bank) {
			this.account = this.valueSubject.value.account;
		}
		else {
			this.account = '';
		}
		const branch = (this.Branches || []).find(bank => bank.BranchCode === $event);
		if (branch) {
			this.branchChange.emit($event);
			this.branchDisplayNameChange.emit(branch ? branch.FullName : null);
		}
	}

	accountChanged($event) {
		// console.log('accountChanged', $event);
		this.accountChange.emit($event);
	}

	bankAccountChanged($event) {
		// console.log('bankAccountChanged', $event);
		this.onChange($event);
	}

	IsSinoPacAccountSelectedChange($event) {
		// console.log('IsSinoPacAccountSelectedChange', $event);
		if ($event === true) {
			this.bank = this.sinoPacBankCode;
		}
		else {
			this.bankType = '';
			this.bank = '';
		}
		this.branch = '';
		this.account = '';
	}

	writeValue(value: any) {
		// console.log('writeValue', value);
		this.valueSubject.next(value);
	}

	registerOnChange(fn: (value: any) => void) {
		this.onChange =  fn;
	}

	registerOnTouched(fn: any) {
	}

	validate(c: FormControl) {
		const errors = {
			bank: this.BankAccount.controls.bank.errors,
			branch: this.BankAccount.controls.branch.errors,
			account: this.BankAccount.controls.account.errors
		};
		if (this.BankAccount.invalid) {
			return errors;
		}
		else {
			const bank = this.Banks.find(item => item.BankCode === this.bank);
			const bankLong = bank.BankLong.split(',');
			for (const long of bankLong) {
				if (this.account.length === +long) { return null; }
			}
			return { account: { length: bank.BankLong } };
		}
	}
}
