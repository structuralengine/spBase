import { Component, HostListener } from '@angular/core';
import { HtmlViewerComponent } from './html-viewer/html-viewer.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private modalService: NgbModal) {}

  public htmlViewerOpen(): void {
    this.modalService.open(HtmlViewerComponent).result.then((result) => {});
  }

  // @HostListener('scroll') scrolling(){
  //   console.log('scrolling');
  // }

  // @HostListener('window:scroll', ['$event']) // for window scroll events
  // onScroll2(event: any) {

  // }

  @HostListener('scroll') scrolling(){
    console.log('scrolling');
  }


  
  public onc() {
    var infoH = document.getElementById('scroll-box1');
    var infoI = document.getElementById('scroll-amount1');
    if (infoH !== null) {
      infoH.addEventListener('scroll', function() {
        if(infoI !== null){
        infoI.textContent = 'ScrollY:' + infoI.scrollTop;
      }});
    }
  }

}
