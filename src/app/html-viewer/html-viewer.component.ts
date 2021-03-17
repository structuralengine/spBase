import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as printJS from 'print-js';
import { DataHelperModule } from '../providers/data-helper.module';
import { PrintListService } from '../print-list/print-list.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-html-viewer',
  templateUrl: './html-viewer.component.html',
  styleUrls: ['./html-viewer.component.scss', '../reset.scss'],
})
export class HtmlViewerComponent implements OnInit {
  //@ViewChild('print_section', { static: true }) print_section: ElementRef;

  private PrintCss: string;
  public liActive = [false, false, false, false, false];
  public liNumber = [1, 2, 3, 4, 5];
  public myControl: any = null;
  public Editing: boolean = false;
  public count: number = 0;
  public name: number = 0;
  public PrintIndex;
  public key: number = 1;
 
  constructor(
    public activeModal: NgbActiveModal,
    private helper: DataHelperModule,
    public printlist: PrintListService
  ) {
    this.PrintCss = '@page {';
    this.PrintCss += 'size: A4;';
    this.PrintCss += 'margin: 0;';
    this.PrintCss += '}';

    this.PrintCss += 'h3 {';
    this.PrintCss += '  font-size: 11pt;';
    this.PrintCss += ' }';

    this.PrintCss += '* {';
    this.PrintCss +=
      'font-family:"ＭＳ 明朝", "HG明朝E", "游明朝", YuMincho, "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "ＭＳ Ｐ明朝", serif;';
    this.PrintCss += 'margin: 0;';
    this.PrintCss += 'padding: 0;';
    this.PrintCss += '}';

    this.PrintCss += '.sheet {';
    this.PrintCss += 'overflow: hidden;';
    this.PrintCss += 'position: relative;';
    this.PrintCss += 'box-sizing: border-box;';
    this.PrintCss += 'page-break-after: always;';
    this.PrintCss += 'padding-top: 30mm;';
    this.PrintCss += 'padding-left: 30mm;';
    this.PrintCss += 'padding-right: 30mm;';
    this.PrintCss += '}';

    this.PrintIndex = this.printlist.PrintIndex;
  }

  ngOnInit(): void {
    this.myControl = new FormGroup({
      number2: new FormControl(),
    });
    this.onSelectChange(this.printlist.selectedIndex);
    this.count = this.printlist.dataDisplay(0).keysCount;

    this.key = 1;
  }

  //　pager.component からの通知を受け取る
  
  onReceiveEventFromChild(eventData: number) {
    // this.loadPage(eventData, this.ROWS_COUNT);
  }

  onReceiveEventFromChildScroll(e: any) {
    console.log(e);
    this.key = e;
  }

  loadPage(currentPage: number, row: number) {
  }

  onSelectChange(value: string) {
    let v = parseInt(value);
    const data = this.printlist.PrintIndex[v - 1];
  }

  public dialogClose(): void {
    this.activeModal.close(HtmlViewerComponent);
  }

  public close(): void {
    this.activeModal.close('Submit');
  }

  public print() {
    printJS({
      printable: 'print_section',
      type: 'html',
      style: this.PrintCss,
    });
  }

  public onScroll() {
    var infoF = document.getElementById('infoFrame');
    if (infoF !== null) {
      infoF.innerHTML = 'ScrollY:' + document.documentElement.scrollTop;
    }
  }

  // public changePage(currentPage: number) {
  //   this.page = currentPage;
  // }

  public myFunct(keyEvent: { which: number }) {
    if (keyEvent.which === 13) alert('I am an alert');
  }

  // ページを飛んだあと左右＜＞に移動や隣ページへの移動周辺、5ページ送り
  public moveToNextPage(count: number): void {
    let Next: number;

    Next = this.key + count;
    if (Next < 1) {
      Next = 1;
      this.key = 1;
    }

    this.myControl.value.number2 = Next;
    let number = document.getElementById('number');
    if ( this.myControl.value.number2 < 1) {
      this.myControl.value.number2 = 1;
      this.key = 1;
    } else if ( this.myControl.value.number2 > this.count) {
      this.myControl.value.number2 = this.count;
      this.key = this.count;
    } else if (number === null) {
      alert('da');
    } else {
      let value = this.helper.toNumber(this.myControl.value.number2);
      this.key = value;
    }
  } 

  onKeydown(event: any) {
    if (event.key === 'Enter') {
      console.log(event.key);
      let value = this.helper.toNumber(this.myControl.value.number2);

      if (value < 1 || value > this.count) {
        // this.changePage(1);
        this.key = 1;
      } else if (value === null) {
        alert('alert');
      } else {
        this.key = value;
      }
      console.log(this.key);
       document.getElementById('link')!.click();
    }
  }
}
