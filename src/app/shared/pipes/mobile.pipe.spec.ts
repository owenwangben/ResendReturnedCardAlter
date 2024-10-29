import { MobilePipe } from './mobile.pipe';

describe('MobilePipe', () => {
	let pipe: MobilePipe;

	beforeEach(() => {
		pipe = new MobilePipe();
	});

	it('0912345678 應該被遮罩成 0912-xxx-678', () => {
		// arrange
		const mobile = '0912345678';

		// act
		const masked = pipe.transform(mobile);

		// assert
		expect(masked).toBe('0912-xxx-678');
	});

	it('0912-345-678 應該被遮罩成 0912-xxx-678', () => {
		// arrange
		const mobile = '0912-345-678';

		// act
		const masked = pipe.transform(mobile);

		// assert
		expect(masked).toBe('0912-xxx-678');
	});

	it(`'請選擇電話號碼' 應不被遮罩, 並且顯示原文`, () => {
		const card = '請選擇電話號碼';

		const masked = pipe.transform(card);

		expect(masked).toBe(card);
	});
});
