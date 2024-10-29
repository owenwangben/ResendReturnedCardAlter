import { Component, OnInit, Input } from "@angular/core";

@Component({
	moduleId: module.id,
	selector: 'app-exec-script',
	template: '<div></div>'
})
export class ExecScriptComponent implements OnInit {
	@Input() src: string;

	constructor() {
	}

	ngOnInit() {
		setTimeout(() => $.getScript(this.src), 2000);
	}
}
