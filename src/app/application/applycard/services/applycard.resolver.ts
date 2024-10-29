import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService, MemoryStorage } from 'app/shared/shared.module';
import { ApplyCardService } from './applycard.services';

@Injectable()
export class ApplyCardResolver implements Resolve<any> {
	constructor(
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const lang = route.params.lang;
		const source = +route.queryParams.source;
		const visible = +route.queryParams.visible;
		const isPreview = +route.queryParams.ispreview;
		const showHiddenCard = source === 1 || visible === 0 || lang;
		const showPreview = isNaN(isPreview) || isPreview === 0;
		const response = await this.applyCardService.getAllCardInfo(!showHiddenCard, !showPreview);
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

@Injectable()
export class ApplyCardResolverCardInfo implements Resolve<any> {
	constructor(
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const lang = route.params.lang;
		const source = +route.queryParams.source;
		const visible = +route.queryParams.visible;
		const showHiddenCard = source === 1 || visible === 0 || lang;
		const cardId = route.queryParams.id;
		if (cardId) {
			const response = await this.applyCardService.getSingleCardInfo(cardId, !showHiddenCard);
			if (this.errorPageService.validateResponse(response)) {
				return response.Result;
			}
		}
		this.errorPageService.display("很抱歉，系統查無您欲申辦的卡片資訊! [" + cardId + "]", true);
		return null;
	}
}

@Injectable()
export class ApplyCardResolverMMA implements Resolve<any> {
	constructor(
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.applyCardService.getCustomerInfo(1);
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

@Injectable()
export class ApplyCardResolverCard implements Resolve<any> {
	constructor(
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.applyCardService.getCustomerInfo(2);
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

@Injectable()
export class ApplyCardResolverAccount implements Resolve<any> {
	constructor(
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.applyCardService.getCustomerInfo(3);
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

@Injectable()
export class ApplyCardResolverCardOrAccount implements Resolve<any> {
	constructor(
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const source = +route.queryParams.source;
		const prodtype = +route.queryParams.prodtype;
		const response = await this.applyCardService.getCustomerInfo(3, source, prodtype);
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

@Injectable()
export class ApplyCardResolverDawho implements Resolve<any> {
	constructor(
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.applyCardService.getCustomerInfo(5);
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

@Injectable()
export class ApplyCardResolverQuickAccount implements Resolve<any> {
	constructor(
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService,
		private storage: MemoryStorage,
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const source = +route.queryParams.source;
		const prodtype = +route.queryParams.prodtype;
		const response = await this.applyCardService.getCustomerInfo(6, source, prodtype, +this.storage.CifType);
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

@Injectable()
export class ApplyCardResolverNew implements Resolve<any> {
	constructor(
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return null;
	}
}

@Injectable()
export class ApplyCardResolverOtherCard implements Resolve<any> {
	constructor(
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService,
		private storage: MemoryStorage
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return  { ID: this.storage.CustId, Mobile: this.storage.MobileNo};
	}
}

@Injectable()
export class ApplyCardResolverOtherBank implements Resolve<any> {
	constructor(
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService,
		private storage: MemoryStorage
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return  { ID: this.storage.CustId, Mobile: this.storage.MobileNo};
	}
}
