import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ErrorPageService, PageInfoService, MemoryStorage } from 'app/shared/shared.module';
import { MobileStatementService } from '../mobile-statement.service';
import { GetLanguage, LocaleMessages } from '../shared/LocaleMessages';

@Component({
	selector: 'app-message-content',
	templateUrl: './message-content.component.html',
	styles: []
})
export class MessageContentComponent implements OnInit, AfterViewInit {
	Title;
	Messages;
	MessageId;
	token: string;
	language;
	messages;

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private storage: MemoryStorage,
		private errorPageService: ErrorPageService,
		private dataService: MobileStatementService
	) {
		this.token = this.storage.Token;
	}

	async ngOnInit() {
		this.language = GetLanguage();
		this.messages = LocaleMessages[this.language].LastestMessage;

		const response = await this.dataService.GetData({ProjectDate: sessionStorage.getItem("MBILL.STMTDATE"), CustID: ""});
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
		}

		this.route.data.subscribe(data => {
			this.route.params.subscribe(params => {
				this.MessageId = params.id;
				switch (this.MessageId) {
					case "1":
						this.Title = this.messages.AccountingMessage;
						this.Messages = response.Result.BillMessage ? response.Result.BillMessage.Items.filter(msg => msg) : null;
						break;
					case "2":
						this.Title = this.messages.ExclusiveMessage;
						this.Messages = response.Result.MemberMessage ? response.Result.MemberMessage.Items : null;
						break;
					case "3":
						this.Title = this.messages.ActivitiesMessage;
						this.Messages = response.Result.CommonMessage ? response.Result.CommonMessage.Items : null;
						break;

					default:
						break;
				}
			});
		});
	}

	public ngAfterViewInit() {
		$("#Accordion1").accordion();
		$(".ui-accordion-content").css("font-size", "18px");
		$(".ui-accordion-content").css("height", "");
		$(".ui-accordion-header-icon").remove();
	}
}
