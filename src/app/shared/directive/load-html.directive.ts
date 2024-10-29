import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';

/**
 *
 * example: <div loadHtml="assets/perm-cli-memo.html"></div>
 * @export
 * @class LoadHtmlDirective
 * @implements {OnInit}
 * @implements {OnChanges}
 */
@Directive({
	selector: '[loadHtml]'
})
export class LoadHtmlDirective implements OnInit, OnChanges {
	@Input('loadHtml') url: string;
	@Input('backupHtml') backupUrl: string;

	constructor(private _elementRef: ElementRef, private http: HttpClient) { }

	ngOnInit() {
		// this.loadHtml();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.url.currentValue !== changes.url.previousValue) {
      this.loadHtml(this.url);
		}
	}

	async loadHtml(url,readTimes = 1) {
    try {
      if(readTimes == 3) return;
      if (url) {
        const response = await this.http.get(url, { responseType: 'text' }).toPromise();
        this._elementRef.nativeElement.innerHTML = response || '';
        let scripts = this._elementRef.nativeElement.getElementsByTagName('script');
        for (let script of scripts){
          eval(script.text)
        }
      }
    } catch (error) {
      this.loadHtml(this.backupUrl,readTimes+1);
    }
	}
}
