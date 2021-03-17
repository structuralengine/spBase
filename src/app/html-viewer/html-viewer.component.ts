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
  private page: number = 0;

  public count: number = 0;

  public name: number = 0;

  public PrintIndex;

  key: any;

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
    this.page = e;
  }

  loadPage(currentPage: number, row: number) {
    // for (let i = this.dataset.length + 1; i <= row; i++) {
    //   const fix_node = this.data.getElementColumns(currentPage, i);
    //   this.dataset.push(fix_node);
    // }
    // this.page = currentPage;
  }

  onSelectChange(value: string) {
    let v = parseInt(value);
    const data = this.printlist.PrintIndex[v - 1];

    // this.InputData.initModel(data.file);
    // this.get(item.file, item.name);

    //this.fileIndex.FEMlist = value;
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

  public changePage(currentPage: number) {
    this.page = currentPage;
  }

  // ページを飛んだあと左右＜＞に移動や隣ページへの移動周辺、5ページ送り
  public moveToNextPage(count: number): void {
    let Next: number;
    let additional: number;
    let minus: number;
    var plus: number;

    // 1、2ページ目だけイレギュラーな動きをする
    if (this.page === 1) {
      additional = 2;
      minus = -2;
      plus = -1;
    } else if (this.page === 2) {
      additional = 1;
      minus = -1;
      plus = 0;
    } else {
      additional = 0;
      minus = -1;
      plus = 1;
    }

    Next = this.page + count;
    if (Next < 1) {
      Next = 1;
      this.page = 1;
    }

    this.changePage(Next);
    this.myControl.value.number2 = Next;
    let number = document.getElementById('number');
    if (number !== null && this.myControl.value.number2 < 1) {
      this.myControl.value.number2 = 1;
      this.key = 1;
    } else if (number !== null && this.myControl.value.number2 > this.count) {
      this.page = this.count;
      this.myControl.value.number2 = this.count;
      this.key = this.count;
    } else if (number === null) {
      alert('da');
    } else {
      let value = this.helper.toNumber(this.myControl.value.number2);
      this.key = value;
    }
  } // 見えないところにボタンを配置してある。ボタンを押すのとEnterを押すのは同じとしているのでこれが発火点となる

  public click(id = null) {
    let value = this.helper.toNumber(this.myControl.value.number2);

    if (value !== null || value < 1 || value > this.count) {
      this.changePage(1);
      this.key = 1;
    } else if (value === null) {
      alert('alert');
    } else {
      this.changePage(value);
    }
  }

  // scrollEventt(childObj:){

  // }

  // @HostListener('window:scroll', ['$event']) // for window scroll events
  // onScroll2(event: any) {
  //   this.onScroll();
  //   this.onc();
  // }

  // @HostListener('scroll',['$event'])
  // onScroll3(event2:any){
  //   this.onScroll4();
  // }

  // public onScroll4() {
  //   var infoG = document.getElementById('scroll-amount');
  //   if (infoG !== null) {
  //     infoG.textContent = 'ScrollY:' + document.documentElement.scrollTop;
  //   }
  // }

  // public onc() {
  //   var infoH = document.getElementById('scroll-box');
  //   var infoI = document.getElementById('scroll-amount');
  //   if (infoH !== null) {
  //     infoH.addEventListener('scroll', () => {
  //       if (infoI !== null) {
  //         //  infoI.textContent = 'ScrollY:' + infoI.scrollTop();
  //       }
  //     });
  //   }
  // }

  // public gfg_Run() {
  //   const el_up = document.getElementById('GFG_UP');
  //   const el_down = document.getElementById('GFG_DOWN');

  //   const text = document.getElementById('t');
  //   if (text !== null) {
  //     text.scrollTop = text.scrollHeight;
  //   }
  //   if (el_down !== null) {
  //     el_down.innerHTML = 'Scroll bar is moved to bottom.';
  //   }
  // }

  // public scrollEvent(e:any){
  //   const i = e;
  //   console.log(i);
  // }

  // window.addEventListener('scroll', () => {
  //   // ここに関数
  //  });

  // $('#scroll-box').scroll(function() {
  //     $('#scroll-amount').text($(this).scrollTop() + 'px');
  // });
}
