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

  public PrintIndex;

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
  }

  //　pager.component からの通知を受け取る
  onReceiveEventFromChild(eventData: number) {
    // this.loadPage(eventData, this.ROWS_COUNT);
  }
  // window.addEventListener('load', (event) => {

  //   // (1)ページ読み込み時に一度だけスクロール量を出力
  //   var scroll_y = window.scrollY;
  //   console.log(scroll_y);

  //   // (2)スクロールするたびにスクロール量を出力
  //   window.addEventListener('scroll', (event) => {
  //     var scroll_y = window.scrollY;
  //     console.log(scroll_y);
  //   });
  // });

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

  public changePage(currentPage: number): void {
    if (currentPage === this.page) {
      // 同じボタンを押した時
      this.Editing = true; // 編集ボックスを表示する
      return; // 何もしない
    }
    this.page = currentPage;

    // ページ番号性を設定する
    const n = Math.min(currentPage - 1, 2);
    for (let i = 0; i < this.liNumber.length; i++) {
      this.liNumber[i] = currentPage - n + i;
    }

    // active属性を設定する
    for (let i = 0; i < this.liActive.length; i++) {
      this.liActive[i] = false;
    }
    this.liActive[n] = true;
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

    Next = this.page + count + additional;
    if (Next < 1) {
      Next = 1;
    }

    this.changePage(Next);
  } // 見えないところにボタンを配置してある。ボタンを押すのとEnterを押すのは同じとしているのでこれが発火点となる

  public click(id = null) {
    let value: number;

    if (id === null) {
      value = this.helper.toNumber(this.myControl.value.number2);
    } else {
      value = this.helper.toNumber(id);
    }

    if (value !== null) {
      this.changePage(value);
      this.Editing = false;
    }
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
}
