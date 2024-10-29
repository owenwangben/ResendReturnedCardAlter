export class Type {
	static cast<T>(o: any, type: { new(): T; }): T {
		if (o) {
			// (<any>o).__proto__ = type.prototype;
			// return o;
			return Object.setPrototypeOf(o, type.prototype);
		}
		return o;
	}

	static create<T>(type: { new(): T; }, o: any): T {
		return Object.assign(new type(), o);
	}
}
