import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardService } from 'app/shared/shared.module';

@Component({
  selector: 'app-new-apply',
  templateUrl: './new-apply.component.html'
})
export class NewApplyComponent implements OnInit {

  constructor(
	private wizardService: WizardService,
  ) { }

  ngOnInit() {
  }

  submit() {
	this.wizardService.GoToStep(4);
  }

}
