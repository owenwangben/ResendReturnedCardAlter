import { DefaultUrlSerializer, UrlTree } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { PageInfoService } from './page-info.service';

@Injectable()
export class CaseInsensitiveUrlSerializer extends DefaultUrlSerializer {
	constructor(private injector: Injector) {
		super();
	}

	parse(url: string): UrlTree {
		const pathinfo = this.injector.get(PageInfoService);
		return super.parse(pathinfo.translate(url));
	}
}
