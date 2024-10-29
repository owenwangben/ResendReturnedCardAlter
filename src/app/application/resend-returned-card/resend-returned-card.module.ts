import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResendReturnedCardComponent } from './resend-returned-card.component';
import { FilloutTableComponent } from './components/fillout-table/fillout-table.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { CompleteComponent } from './components/complete/complete.component';
import { RouterModule, Routes } from '@angular/router';
import { ResendReturnedCardResolver } from './services/resend-returned-card-resolver';
import { ResendReturnedCardService } from './services/resend-returned-card.service';
import { AuthGuard, SharedModule } from 'app/shared/shared.module';

const routes : Routes = [
  { path:'ResendReturnedCard',
    canActivate:[AuthGuard],
    component:ResendReturnedCardComponent,
    resolve:{ data:ResendReturnedCardResolver }
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CommonModule,
  ],
  declarations: [ 
    ResendReturnedCardComponent,
    FilloutTableComponent,
    ConfirmComponent,
    CompleteComponent
  ],
    providers:[
      ResendReturnedCardService,
      ResendReturnedCardResolver
    ],
    entryComponents: [
      FilloutTableComponent,
      ConfirmComponent,
      CompleteComponent
    ],
    
})
export class ResendReturnedCardModule { }
