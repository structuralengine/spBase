import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { HtmlViewerComponent } from './html-viewer/html-viewer.component';
import { DataHelperModule } from './providers/data-helper.module';
import { TestHtmlComponent } from './test-html/test-html.component';

@NgModule({
  declarations: [AppComponent, HtmlViewerComponent, TestHtmlComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    DataHelperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
