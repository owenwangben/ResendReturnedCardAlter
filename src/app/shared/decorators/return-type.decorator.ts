import { Type } from './../type';

/**
 * 回傳內容轉型
 * @param type 欲轉換型別
 * ### Excample
 * ```TypeScript
 * class Foo {
 *   public Name: string;
 * }
 * @ReturnType(Foo)
 * function GetFoo(): Foo {
 *   return <any>{};
 * }
 * @ReturnType(Foo)
 * async function GetFooAsync(): Promise<Foo> {
 *   return await Promise.resolve({});
 * }
 * @ReturnType(Foo)
 * async function GetFooAsync(): Promise<Foo[]> {
 *   return await Promise.resolve([{}]);
 * }
 * ```
 */
export function ReturnType(type: { new(...args: any[]): any }) {
	return function (target: any, name: string, description: TypedPropertyDescriptor<(...args: any[]) => any>) {
		const old = description.value;
		description.value = function (...args: any[]) {
			const original = old.apply(this, args);
			if (original instanceof Promise) {
				return new Promise((resolve, reject) => {
					(<Promise<any>>original)
						.then(item => resolve(item && cast(item)))
						.catch(reason => reject(reason));
				});
			} else {
				return original && cast(original);
			}
		};
	};

	function cast(original: any) {
		if (Array.isArray(original) === true) {
			return original.map(item => cast(item));
		} else {
			return Type.cast(original, type);
		}
	}
}
