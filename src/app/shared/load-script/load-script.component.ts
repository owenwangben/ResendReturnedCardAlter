import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';

@Component({
	moduleId: module.id,
	selector: 'app-load-script',
	template: '<div #div></div>'
})
export class LoadScriptComponent implements OnInit {
	private static subject = new Subject<HTMLScriptElement>();
	@Input() src: string;
	@Input() loadCSS = true;
	@Output() complete = new EventEmitter();
	@ViewChild('div') div: ElementRef;
	public scripts: string;

	constructor(private http: HttpClient) {
		Observable.from(LoadScriptComponent.subject).pipe(
			switchMap(elm => {
				try {
					this.div.nativeElement.appendChild(elm);
				}
				catch (error) {
					console.error(error);
				}
				return Observable.fromEvent(elm, 'load');
			})
		).subscribe(result => {
			setTimeout(() => {
				this.ExecuteScripts();
				this.complete.emit();
			}, 500);
		});
	}

	async ngOnInit() {
		this.scripts = '';
		let content = this.src ? await this.http.get(this.src, { responseType: 'text' }).toPromise() : '';
		if (content.startsWith('document.write')) {
			const from = content.indexOf('"');
			const end = content.lastIndexOf('"');
			content = content.substring(from + 1, end);
		}
		const tmp = document.createElement('div');
		tmp.innerHTML = content;
		const nodes = tmp.childNodes;

		for (let idx = 0; idx < nodes.length; idx++) {
			const node = nodes[idx];
			if (node instanceof HTMLScriptElement) {
				if (!node.src && node.type !== 'text/template') {
					this.scripts += node.innerHTML + ';';
					continue;
				}
				if (node.type === 'text/javascript') {
					const script = document.createElement('script');
					script.src = node.src;
					if (!this.resourceLoaded('script', 'text/javascript', 'src', script.src)) {
						LoadScriptComponent.subject.next(script);
					}
					continue;
				}
			}
			else if (node instanceof HTMLLinkElement && node.type.toLowerCase() === 'text/css') {
				if (!this.loadCSS || this.resourceLoaded('link', 'text/css', 'href', node.href)) {
					continue;
				}
			}
			// else if (node instanceof HTMLIFrameElement) {
			// 	continue;
			// }
			this.div.nativeElement.appendChild(node);
			idx--;
		}
	}

	private ExecuteScripts() {
		try {
			window['eval'](this.scripts);
		}
		catch (error) {
			console.error(error);
		}
	}

	private resourceLoaded(tagName: string, type: string, propName: string, url: string): boolean {
		if (url.match(/site\.securejs/)) {
			return false;
		}
		const pattern = /\.(secure)?(js|css)/gi;
		const resources = document.querySelectorAll(tagName + '[' + propName + ']');
		url = this.getUrlPathname(url);
		for (let idx = 0; idx < resources.length; idx++) {
			const resource = resources.item(idx);
			const resourceUrl = this.getUrlPathname(resource[propName]);
			if (url.toLowerCase().replace(pattern, '') === resourceUrl.toLowerCase().replace(pattern, '')) {
				return true;
			}
		}
		return false;
	}

	/** 取得完整網址
	 * @param url {string} 網址
	 */
	private getUrlPathname(url: string): string {
		const anchor = document.createElement('a') as HTMLAnchorElement;
		anchor.href = url;
		return anchor.pathname;
	}
}
