import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentfulService } from './contentful.service';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';


import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/de';
import { ContactComponent } from './components/contact/contact.component';
import { ProductsComponent } from './components/products/products.component';
import {LegalNoticeComponent} from "./components/legal-notice/legal-notice.component";
registerLocaleData(locale, 'de');

const appRoutes: Routes = [
  { path: '/', component: AppComponent },
  { path: '/legalNotice', component: LegalNoticeComponent },
  { path: '/contact',      component: ContactComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LegalNoticeComponent,
    ContactComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, // Bootstrap,
    FormsModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    ContentfulService,
    {
      provide: LOCALE_ID,
      useValue: 'de' // 'de' for Germany, 'fr' for France ...
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
