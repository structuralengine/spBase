import { Component, HostListener, OnInit, Directive } from '@angular/core';
import { PrintListService } from '../print-list/print-list.service';

@Component({
  selector: 'app-test-html',
  templateUrl: './test-html.component.html',
  styleUrls: ['./test-html.component.scss'],
})
export class TestHtmlComponent implements OnInit {
  private ofset: number = 60;
  private startPos: number = 0;
  private headerPos: number = 0;

  @Directive({
    selector: '[scrollTracker]',
  })
  public dataset: any[] = new Array();

  ngOnInit(): void {
    this.dataset = this.printlist.dataDisplay(0).body;
    console.log(this.dataset); // 水平方向
  }

  // @HostListener('scroll', ['$event'])
  // onScroll(event: any) {
  //   // visible height + pixel scrolled >= total height
  //   if (
  //     event.target.offsetHeight + event.target.scrollTop >=
  //     event.target.scrollHeight
  //   ) {
  //     console.log('End');
  //   }
  // }

  constructor(public printlist: PrintListService) {}
}
