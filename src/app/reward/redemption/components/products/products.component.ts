import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product, MainCategory } from '../../services/redemption.models';

@Component({
	selector: 'app-reward-redemption-products',
	templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
	Categories: MainCategory[];
	AllProducts: Product[];
	Products: Product[];
	CategoryId = 0;
	page = 1;
	private pageSize = 12;
	isPreview: string = null;

	constructor(
		private route: ActivatedRoute
	) {
		this.route.parent.data.subscribe(data => {
			const reulst = data.data;
			this.Categories = reulst.MainCategories;
			this.AllProducts = reulst.Gifts;
		});

		this.route.params.subscribe(params => {
			this.route.queryParams.subscribe(queryParams => {
				this.isPreview = queryParams.isPreview && queryParams.isPreview.toLowerCase() === "true" ? "true" : null;
				this.changeCategory(+params.category);
			});
		});
	}

	ngOnInit() {
	}

	get categoryName() {
		const category = this.Categories.find(item => item.ID === this.CategoryId);
		return category && category.Name || "商品一覽";
	}

	private changeCategory(categoryId: number) {
		categoryId = categoryId || 0;
		if (categoryId !== 0) {
			this.CategoryId = categoryId;
			this.Products = this.AllProducts.filter(item =>
				item.MainCategoryId === categoryId
			);
		}
		else {
			this.CategoryId = 0;
			this.Products = this.AllProducts;
		}
	}

	get CategoryProducts(): Product[] {
		const result = this.Products
			.filter(item =>
				isNaN(this.CategoryId) ||
				item.MainCategoryId === this.CategoryId
			);
		return result;
	}

	get PageCategoryProducts(): Product[] {
		return this.CategoryProducts
			.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
	}

	get PageCount(): number {
		return Math.ceil(this.CategoryProducts.length / this.pageSize);
	}
}
