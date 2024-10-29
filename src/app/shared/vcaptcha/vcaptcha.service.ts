import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable()
export class VcaptchaService {
	private captchaUrl = 'api/security/captcha';

	public constructor(
		private http: HttpClient,
		private sanitizer: DomSanitizer
	) {

	}

	public async getVcaptchaUrl(code = 0, key = ""): Promise<SafeUrl | string> {
		const response: Blob = await this.http.get(
			this.captchaUrl + "?t=" + Date.now().toString() + `&code=${code}&key=${encodeURIComponent(key)}`, { responseType: 'blob' }
		).toPromise();

		return this.sanitizer.bypassSecurityTrustUrl(
			window.URL.createObjectURL(response)
		);
	}

	public async getVcaptchaData(code = 0): Promise<any> {
		const response = await this.http.get(
			this.captchaUrl + "?t=" + Date.now().toString() + `&code=${code}`
		).toPromise();

		return response;
	}
}
