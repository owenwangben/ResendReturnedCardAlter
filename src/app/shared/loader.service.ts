import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseResponse } from './webapi.invoker';

@Injectable()
export class LoaderService {
	private status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	public get Status(): BehaviorSubject<boolean> {
		return this.status;
	}

	public display(value: boolean) {
		this.status.next(value);
	}

	public async run<T>(fn: () => Promise<BaseResponse<T>>): Promise<BaseResponse<T>> {
		try {
			this.display(true);
			return await fn();
		}
		finally {
			this.display(false);
		}
	}
}
