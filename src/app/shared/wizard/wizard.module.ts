import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WizardComponent } from './wizard.component';
import { WizardService } from './wizard.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		WizardComponent
	],
	exports: [
		WizardComponent
	]
})
export class WizardModule {

}
