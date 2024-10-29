import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { SharedModule } from 'app/shared/shared.module';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SharedModule
	],
	declarations: [
		HeaderComponent,
		FooterComponent
	],
	exports: [
		HeaderComponent,
		FooterComponent
	]
})
export class CoreModule { }
