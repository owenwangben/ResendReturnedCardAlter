import { Type } from "@angular/core";

export interface WizardStep {
    StepName: string;
	Component: Type<any>;
	StepNo?: number;
}

interface IWizard {
	GoToNextStep();
	GoToPrevStep();
	GoToStep(idx: number);
	RemoveStep(idx: number);
	GetSteps(): WizardStep[];
}
