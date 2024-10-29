import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from 'app/shared/shared.module';
import { ReturnType } from 'app/shared/decorators/return-type.decorator';
import { GetRewardProductsResult, ProductDetail, CartItem, RedemptionItem } from './redemption.models';

@Injectable()
export class RedemptionService {
	private URL = {
		GetRewardProducts: 'api/Bonus/Gifts',
		GetRewardProductDetail: 'api/Bonus/Gift',
		RedeemRewardProducts: 'api/Bonus/GiftExchange'
	};
	private readonly CartName = "RedemptionService.Cart";
	private Cart: CartItem[] = [];

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) {
		if (this.Cart.length === 0) {
			this.Cart = JSON.parse(sessionStorage.getItem(this.CartName) || '[]');
		}
	}

	async GetRewardProducts(): Promise<BaseResponse<GetRewardProductsResult>> {
		const request = new BaseRequest({}, new RequestHeader(this.storage));
		return await this.loader.run<GetRewardProductsResult>(
			() => this.webapi.post(this.URL.GetRewardProducts, request)
		);
	}

	async GetProductDetail(itemId: number, isPreview: string): Promise<BaseResponse<ProductDetail>> {
		const request = new BaseRequest({ GiftId: itemId, IsPreview: isPreview }, new RequestHeader(this.storage));
		return await this.loader.run<ProductDetail>(
			() => this.webapi.post(this.URL.GetRewardProductDetail, request)
		);
	}

	async RedeemRewardProducts(ID: string, Birthday: string, Captcha: string, Address: string): Promise<BaseResponse<any>> {
		const items: RedemptionItem[] = [];
		this.Cart.forEach(item => items.push({
			ProjCode: item.ProjectNo,
			ProdCode: item.ProductCode,
			Quantity: item.Count,
			EndTime: item.EndTime,
			Description: item.Description,
			TotalPoints: item.TotalPoints
		}));
		const request = new BaseRequest(
			{ ID: ID, Birthday: Birthday, Items: items, Address: Address}, new RequestHeader(this.storage)
		);
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.RedeemRewardProducts, request, { 'Captcha': Captcha })
		);
	}

	GetCartItems(): CartItem[] {
		return this.Cart.filter(item => item.Count > 0);
	}

	AddToCart(product: ProductDetail): CartItem[] {
		const found = this.Cart.find(item => item.ID === product.ID);
		if (found) {
			found.Count++;
			found.TotalPoints += product.Point;
		}
		else {
			this.Cart.push({
				ID: product.ID,
				ProjectNo: product.ProjectNo,
				ProductCode: product.GiftNo,
				EndTime: product.EndTime,
				Description: product.Name,
				UnitPoints: product.Point,
				TotalPoints: product.Point,
				Count: 1
			});
		}
		sessionStorage.setItem(this.CartName, JSON.stringify(this.Cart));
		return this.Cart;
	}

	RemoveFromCart(productId): CartItem[] {
		const index = this.Cart.findIndex(item => item.ID === productId);
		if (index >= 0) {
			this.Cart.splice(index, 1);
			sessionStorage.setItem(this.CartName, JSON.stringify(this.Cart));
		}
		return this.Cart;
	}

	ClearCart() {
		sessionStorage.removeItem(this.CartName);
		this.Cart = [];
	}
}
