import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodQueryComponent } from './period-query.component';

describe('PeriodQueryComponent', () => {
	let component: PeriodQueryComponent;
	let fixture: ComponentFixture<PeriodQueryComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PeriodQueryComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PeriodQueryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
