import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { RedemptionService } from '../../services/redemption.services';
import { ProductDetail } from '../../services/redemption.models';

@Component({
	selector: 'app-reward-redemption-detail',
	templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
	product: ProductDetail;
	description: string[];
	cart: ProductDetail[];
	isPreview: string = null;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private redemptionService: RedemptionService,
		private errorPageService: ErrorPageService
	) {
		this.route.params.subscribe(params => {
			this.route.queryParams.subscribe(queryParams => {
				this.isPreview = queryParams.isPreview && queryParams.isPreview.toLowerCase() === "true" ? "true" : null;
				this.queryDetail(params.id);
			});
		});
	}

	ngOnInit() {
	}

	addToCart() {
		this.redemptionService.AddToCart(this.product);
		this.router.navigate(["/Reward/Redemption/Redeem"], { queryParams: { isPreview: this.isPreview } });
	}

	async queryDetail(id) {
		const response = await this.redemptionService.GetProductDetail(id, this.isPreview);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.product = response.Result;
			this.description = this.product.Description.split('\n');
		}
	}
}
