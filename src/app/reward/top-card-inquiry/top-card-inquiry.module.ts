import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { TopCardInquiryComponent } from './top-card-inquiry.component';
import { TopCardInquiryResolver } from './top-card-inquiry.resolver';
import { TopCardInquiryService } from './top-card-inquiry.service';

const routes: Routes = [
	{
		path: 'TopCardInquiry',
		component: TopCardInquiryComponent,
		canActivate: [AuthGuard],
		resolve: { data: TopCardInquiryResolver }
	}
];

@NgModule({
  imports: [
	SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TopCardInquiryComponent],
  providers: [
	TopCardInquiryResolver,
	TopCardInquiryService
]
})
export class TopCardInquiryModule { }
