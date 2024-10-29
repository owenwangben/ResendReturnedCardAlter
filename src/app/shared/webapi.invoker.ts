import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MemoryStorage } from './memory.storage';

@Injectable()
export class WebApiInvoker {
	constructor(private http: HttpClient, private location: Location) { }

	public async post(apiURL: string, model: any, headers?: { [key: string]: string }): Promise<any> {
		const new_headers = new HttpHeaders(headers);
		let url = apiURL;
		if (url.startsWith('/api/')) { url = this.location.prepareExternalUrl(apiURL); }
		return await this.http.post(url, model, { headers: new_headers, responseType: 'json' }).toPromise();
	}
}

export class BaseRequest {
	public constructor(
		public Content: any,
		public Header: RequestHeader
	) { }
}

export class RequestHeader {
	public SessionID: string;
	public ApplicationName: string;
	public ReferenceNo: string;
	public UserID: string;
	public RequestTime;
	public TxCode: string;
	public RemoteAddr: string;
	public PageName: string;
	public SsaToken: string;
	public ClientRefNo: string;
	public ClientTimestamp: Date;

	constructor(
		storage: MemoryStorage
	) {
		if (storage) {
			this.ApplicationName = storage.ApplicationName;
			this.UserID = storage.CustId;
		}
		this.ClientRefNo = this.uuidv4();
		this.ClientTimestamp = this.getClientTimestamp();
	}

	public uuidv4(): string {
		return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
			// tslint:disable-next-line: no-bitwise
			const r = Math.random() * 16 | 0;
			// tslint:disable-next-line: no-bitwise
			const v = c === 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	public getClientTimestamp() {
		try {
			const date = new Date();
			const isoString = date.toISOString();
			const parsedDate = new Date(isoString);

			return parsedDate;
		} catch (error) {
			return null;
		}
	}
}

export class BaseResponse<T> {
	public Original: any;
	public Header: ResponseHeader;
	public ResultCode: string;
	public ResultMessage: string;
	public Result: T;
}

export class ResponseHeader {
	public SessionID: string;
	public ApplicationName: string;
	public ReferenceNo: string;
	public UserID: string;
	public RequestTime: Date;
	public TxCode: string;
	public RemoteAddr: string;
	public PageName: string;
	public SsaToken: string;
}
