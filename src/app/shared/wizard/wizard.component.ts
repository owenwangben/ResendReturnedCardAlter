import {
	Component, OnInit, OnChanges, Input, Output, EventEmitter, ComponentFactoryResolver,
	ViewContainerRef, ComponentFactory, ComponentRef, Injector
} from '@angular/core';
import { environment } from 'environments/environment';
import { WizardStep, IWizard } from './typings';
import { WizardService } from './wizard.service';

@Component({
	selector: 'app-wizard',
	templateUrl: './wizard.component.html',
	styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit, OnChanges, IWizard {
	@Input() current = 0;
	@Input() steps: WizardStep[];
	@Input() hidden = false;
	@Output() currentChange = new EventEmitter<number>();
	private injector: Injector;
	public vsteps: WizardStep[];

	public constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private viewContainerRef: ViewContainerRef,
		injector: Injector
	) {
		const service = new WizardService();
		service.GoToNextStep = this.GoToNextStep.bind(this);
		service.GoToPrevStep = this.GoToPrevStep.bind(this);
		service.GoToStep = this.GoToStep.bind(this);
		service.RemoveStep = this.RemoveStep.bind(this);
		service.GetSteps = this.GetSteps.bind(this);
		// this.injector = ReflectiveInjector.resolveAndCreate([{
		//     provide: WizardService,
		//     useValue: service
		// }], injector);
		this.injector = Injector.create([{
			provide: WizardService,
			useValue: service
		}], injector);
	}

	public ngOnInit() {
		// let parentNode = this.viewContainerRef.element.nativeElement;
		// while ((parentNode = parentNode.parentNode).classList.contains('trans-content') === false) {
		// }
		// parentNode.classList.add('container-with-wizard');
		this.vsteps = this.steps.filter(value => value.StepName);
	}

	public ngOnChanges() {
		const step = this.steps[this.current];
		const componentFactory = this.componentFactoryResolver
			.resolveComponentFactory(step.Component);
		this.viewContainerRef.clear();
		const component: ComponentRef<any> =
			this.viewContainerRef.createComponent(componentFactory, 0, this.injector);
	}

	public GoToNextStep() {
		if (this.current < this.steps.length - 1) {
			this.GoToStep(this.current + 1);
		}
	}

	public GoToPrevStep() {
		if (this.current > 0) {
			this.GoToStep(this.current - 1);
		}
	}

	public GoToStep(idx: number) {
		if (idx > -1 && idx < this.steps.length) {
			this.current = idx;
			this.currentChange.emit(idx);
			window.scrollTo(0, 0);
		}
	}

	public RemoveStep(idx: number) {
		this.steps.splice(idx, 1);
	}

	public GetSteps(): WizardStep[] {
		return this.steps;
	}

	// isHideInMobile(step: number): boolean {
	// 	if (this.current === 0) {
	// 		return step > 2;
	// 	}
	// 	if (this.current === this.steps.length - 1) {
	// 		return step < this.steps.length - 3;
	// 	}
	// 	return step < this.current - 1 || step > this.current + 1;
	// }

	private get currentStepNo(): number {
		let stepNum = this.steps[this.current].StepNo;
		if (stepNum === undefined) { stepNum = this.steps.indexOf(this.steps[this.current]); }
		return stepNum;
	}

	public isActive(idx: number): boolean {
		return this.currentStepNo === idx;
	}

	public isVisible(idx: number): boolean {
		if (!environment.IsMobile) { return true; }

		const current = this.currentStepNo;
		if (current === 0) {
			return idx <= 2;
		}
		else if (current === this.vsteps.length - 1) {
			return idx >= this.vsteps.length - 3;
		}
		return idx >= current - 1 && idx <= current + 1;
	}
}
