import { Component, HostListener, OnInit, Directive, Output, EventEmitter } from '@angular/core';
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

  public dataset: any[] = new Array();

  public page_scroll: number = 0;

  @Output() event = new EventEmitter<number>();

  ngOnInit(): void {
    this.dataset = this.printlist.dataDisplay(0).body;
    console.log(this.dataset); // 水平方向
  }

  public scrollEvent(e: any) {
    let scroll_top = e.target.scrollTop;
    if (scroll_top === 0) {
      scroll_top = 1;
    }
    this.page_scroll = Math.ceil(scroll_top / 975);
    // 親コンポーネントに通知する
    this.event.emit(this.page_scroll);
  //  console.log(this.page_scroll);
  }

  constructor(public printlist: PrintListService) {}
}
