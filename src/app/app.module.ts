import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HtmlViewerComponent } from './html-viewer/html-viewer.component';
import { DataHelperModule } from './providers/data-helper.module';
import { TestHtmlComponent } from './test-html/test-html.component';

@NgModule({
  declarations: [
    AppComponent,
    HtmlViewerComponent,
    TestHtmlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DataHelperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
