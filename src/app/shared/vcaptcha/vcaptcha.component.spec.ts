import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";

import { VcaptchaComponent } from './vcaptcha.component';

describe('VcaptchaComponent', () => {
	let component: VcaptchaComponent;
	let fixture: ComponentFixture<VcaptchaComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule],
			declarations: [VcaptchaComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(VcaptchaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('image url should start with /api/security/captcha', () => {
		expect(component.vcaptchaUrl).toMatch(/^api\/security\/captcha/);
	})

	it('click refresh will change url', () => {
		const beforeUrl = component.vcaptchaUrl;
		setTimeout(function () {
			component.OnChangeVaptchaImage(undefined);
			expect(component.vcaptchaUrl).not.toBe(beforeUrl);
		}, 100);
	});

	it('should call OnChangeVaptchaImage when ngOnInit', () => {
		var spy = spyOn(component, 'OnChangeVaptchaImage');

		component.ngOnInit();

		expect(spy).toHaveBeenCalled();
	})
});
