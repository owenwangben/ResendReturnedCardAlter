import { NgModule } from '@angular/core';
import { BillModule } from './bill/bill.module';
import { BillDetailModule } from './bill-detail/bill-detail.module';
import { MessageModule } from './message/message.module';
import { MobileStatementService } from './mobile-statement.service';
import { MessageContentModule } from './message-content/message-content.module';
import { BonusModule } from './bonus/bonus.module';
import { ApplyModule } from './apply/apply.module';
import { CustomerServiceModule } from './customer-service/customer-service.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentBarcodeModule } from './payment-barcode/payment-barcode.module';
import { PaymentQrcodeModule } from './payment-qrcode/payment-qrcode.module';

@NgModule({
	imports: [
		BillModule,
		BillDetailModule,
		MessageModule,
		MessageContentModule,
		BonusModule,
		ApplyModule,
		CustomerServiceModule,
		PaymentModule,
		PaymentBarcodeModule,
		PaymentQrcodeModule
	],
	providers: [MobileStatementService]
})
export class MobileStatementModule { }
