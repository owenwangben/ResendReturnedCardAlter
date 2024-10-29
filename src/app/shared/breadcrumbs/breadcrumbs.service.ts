import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { PageInfoService } from '../page-info.service';
import { BreadcrumbsModel } from './breadcrumbs.models';

@Injectable()
export class BreadcrumbsService {
	private static lastUrl = "/";
	private apiUrl = '/ws/shared/menu/ws_breadcrumbs.ashx';
	public BreadcrumbResponse: Observable<BreadcrumbsModel>;

	public constructor(
		private http: HttpClient,
		private sanitizer: DomSanitizer,
		private pageinfo: PageInfoService
	) {
		this.BreadcrumbResponse = this.ws_breadcrumbs(this.pageinfo.breadcrumbs).pipe(
			map(response => {
				response.Breadcrumbs = this.htmldecode(response.Breadcrumbs || '');
				response.CommonFunction = this.htmldecode(response.CommonFunction || '');
				return response;
			})
		);
	}

	private ws_breadcrumbs(url: string): Observable<BreadcrumbsModel> {
		const headers = new HttpHeaders({ "content-type": 'application/x-www-form-urlencoded' });
		return this.http.post(this.apiUrl, 'URL=' + url, { headers: headers, responseType: 'json' }).pipe(
			map(response => {
				const result = response[0];
				if (result.Header !== 'SUCCESS') {
					return null;
				}
				return result;
			})
		);
	}

	private htmldecode(s: string): string {
		const div = document.createElement('div');
		div.innerHTML = s;
		return div.innerText || div.textContent;
	}

	// public setUrl(url?: string) {
	// 	if (url) {
	// 		BreadcrumbsService.lastUrl = url;
	// 		this.funcUrl.next(url);
	// 	}
	// 	else {
	// 		this.funcUrl.next(BreadcrumbsService.lastUrl);
	// 	}
	// }

	// private getNode(): any {
	// 	const nodes = $("ul li a:last", $(".breadcrumbs"));
	// 	return nodes && nodes[0];
	// }

	// public getUrl(): string {
	// 	// const node = this.getNode();
	// 	// return node && node.pathname;
	// 	return BreadcrumbsService.funcUrl.getValue();
	// }

	// public getFuncName(): string {
	// 	const node = this.getNode();
	// 	return node && node.innerText;
	// }
}
