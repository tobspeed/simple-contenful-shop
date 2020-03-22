import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentfulService } from './contentful.service';
import {MatIconModule} from '@angular/material/icon';


import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/de';
registerLocaleData(locale, 'de');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, // Bootstrap
    MatIconModule
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
