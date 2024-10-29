export class MainCategory {
	public ID: number;
	public Name: string;
}

export class Product {
	public ID: number;
	public Name: string;
	public SmallImagePath: string;
	public Point: number;
	public SelfPayment: number;
	public MainCategoryId: number;
	public MainCategoryName: string;
	public SubCategoryId: number;
	public SubCategoryName: string;
	public GiftNo: string;
	public ProjectNo: string;
}

export class GetRewardProductsResult {
	public MainCategories: MainCategory[];
	public Gifts: Product[];
}

export class ProductDetail {
	/** 商品代碼 */
	public ID: number;
	/** 商品名稱 */
	public Name: string;
	/** 商品圖檔 URL */
	public SmallImagePath: string;
	/** 點數 */
	public Point: number;
	/** 自付金額 */
	public SelfPayment: number;
	/** 兌換期限 */
	public EndTime: Date;
	/** 產品描述 */
	public Description: string;
	/** 主類別名稱 */
	public MainCategoryName: string;
	public GiftNo: string;
	public ProjectNo: string;
}

export class CartItem {
	public ID: number;
	public ProjectNo: string;
	public ProductCode: string;
	public EndTime: Date;
	public Description: string;
	public UnitPoints: number;
	public TotalPoints: number;
	public Count: number;
}

export class RedemptionItem {
	public ProjCode: string; 	// (專案代碼)
	public ProdCode: string; 	// (商品編號，請帶入 `GiftNo`)
	public Quantity: number;	// (數量)
	public EndTime: Date;
	public Description: string;
	public TotalPoints: number;
}

export class RedemptionResult {
	public Success: boolean;
	public Items: RedemptionItemResult[];
  public IsApplyElectronicBill:number;
}

export class RedemptionItemResult {
	public Item: RedemptionItem;
	public IsExchangeSuccess: boolean;	// (兌換是否成功)
	public IsExchangeable: boolean;		// (是否可兌換)
	public ErrorMessage: string;		// (錯誤訊息)
}
