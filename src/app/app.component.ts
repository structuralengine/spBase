import { Component, HostListener } from '@angular/core';
import { HtmlViewerComponent } from './html-viewer/html-viewer.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private modalService: NgbModal) {
  }

  public htmlViewerOpen():void {

    this.modalService.open(HtmlViewerComponent).result.then((result) => {
    });

  }

  @HostListener('scroll') scrolling(){
    console.log('scrolling');
  }

}
