import { CreditcardPipe } from './creditcard.pipe';

describe('CreditcardPipe', () => {
	let pipe: CreditcardPipe;

	beforeEach(() => {
		pipe = new CreditcardPipe();
	});

	it('1234567812345678 應該被遮罩成 1234 5678 xxxx 5678', () => {
		// arrange
		const card = '1234567812345678';

		// act
		const masked = pipe.transform(card);

		// assert
		expect(masked).toBe('1234 xxxx xxxx 5678');
	});

	it('1234 5678 1234 5678 應該被遮罩成 1234 5678 xxxx 5678', () => {
		// arrange
		const card = '1234 5678 1234 5678';

		// act
		const masked = pipe.transform(card);

		// assert
		expect(masked).toBe('1234 xxxx xxxx 5678');
	});

	it(`'請選擇信用卡' 應不被遮罩, 並且顯示原文`, () => {
		const card = '請選擇信用卡';

		const masked = pipe.transform(card);

		expect(masked).toBe(card);
	});
});
