import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MemoryStorage } from '../../shared/shared.module';
import { GetLanguage, LocaleMessages } from '../shared/LocaleMessages';

@Component({
	selector: 'app-message',
	templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {
	token: string;
	cards: Array<{aHref, imgSrc}> = [];
	width = 0;
	bannerUrl = "https://bank.sinopac.com/";
	language;
	messages;

	constructor(
		private router: Router,
		private storage: MemoryStorage,
		private http: HttpClient
	) {
		this.token = this.storage.Token;
	}

	async ngOnInit() {
		this.language = GetLanguage();
		this.messages = LocaleMessages[this.language].LastestMessage;

		this.onResize(window.innerWidth);
		const response = await this.http.get('api/getHtml?uri=' + this.bannerUrl +
			'sinopacBT/personal/credit-card.html', { responseType: 'text' }).toPromise();
		const virtualDOM = document.implementation.createHTMLDocument('virtual');
		const element = $.parseHTML(response, virtualDOM);
		$(element).find('.mobile.swiper-container > .swiper-wrapper > .swiper-slide').each((_, item) => {
			const aHref = $(item).find('a').attr('href');
			const imgSrc = item.style.backgroundImage.replace(/url\("\.\.\/\.\.([^"]*)"\)/, this.bannerUrl + "$1");
			this.cards.push({ aHref, imgSrc });
		});
	}

	onShowActMsg(id) {
		this.router.navigateByUrl(`/MobileStatement/MessageContent/${id}/${this.token}`);
	}

	@HostListener('window:resize', ['$event.target.innerWidth'])
	private onResize(width: number) {
		this.width = width;
		// console.log(this.width);
	}
}
