import { Injectable } from '@angular/core';
import { WizardStep } from './typings';

@Injectable()
export class WizardService {
	// public component: WizardComponent;

	// static factory(component: WizardComponent): WizardService {
	//     return new WizardService(component);
	// }

	// constructor(private wizard: WizardComponent) {}

	GoToNextStep: () => void;
	GoToPrevStep: () => void;
	GoToStep: (stepIndex: number) => void;
	RemoveStep: (stepIndex: number) => void;
	GetSteps: () => WizardStep[];
}
