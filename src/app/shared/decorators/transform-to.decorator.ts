import { Type } from '../type';
/**
 * 轉型
 * @param type 欲轉換型別
 * ### Excample
 * ```TypeScript
 * class Foo {
 *   public Name: string;
 * }
 * class FooComponent {
 *   @TransformTo(Foo) foo: Foo;
 *   constructor() { this.foo = { Name: '123' }; }
 * }
 * ```
 */
export function TransformTo(type: { new (...args: any[]): any }) {
    return function (target: any, name: string): any {
        let val;
        return {
            set: function (value) {
                val = value && Type.cast(value, type);
            },
            get: function () {
                return val;
            }
        };
    };
}
