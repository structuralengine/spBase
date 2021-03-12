"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HtmlViewerComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var printJS = require("print-js");
var HtmlViewerComponent = /** @class */ (function () {
    function HtmlViewerComponent(activeModal, helper, printlist) {
        this.activeModal = activeModal;
        this.helper = helper;
        this.printlist = printlist;
        this.liActive = [false, false, false, false, false];
        this.liNumber = [1, 2, 3, 4, 5];
        this.myControl = null;
        this.Editing = false;
        this.page = 0;
        this.count = 0;
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
    HtmlViewerComponent_1 = HtmlViewerComponent;
    HtmlViewerComponent.prototype.ngOnInit = function () {
        this.myControl = new forms_1.FormGroup({
            number2: new forms_1.FormControl()
        });
        this.onSelectChange(this.printlist.selectedIndex);
        this.count = this.printlist.dataDisplay(0).keysCount;
    };
    //　pager.component からの通知を受け取る
    HtmlViewerComponent.prototype.onReceiveEventFromChild = function (eventData) {
        // this.loadPage(eventData, this.ROWS_COUNT);
    };
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
    HtmlViewerComponent.prototype.loadPage = function (currentPage, row) {
        // for (let i = this.dataset.length + 1; i <= row; i++) {
        //   const fix_node = this.data.getElementColumns(currentPage, i);
        //   this.dataset.push(fix_node);
        // }
        // this.page = currentPage;
    };
    HtmlViewerComponent.prototype.onSelectChange = function (value) {
        var v = parseInt(value);
        var data = this.printlist.PrintIndex[v - 1];
        // this.InputData.initModel(data.file);
        // this.get(item.file, item.name);
        //this.fileIndex.FEMlist = value;
    };
    HtmlViewerComponent.prototype.dialogClose = function () {
        this.activeModal.close(HtmlViewerComponent_1);
    };
    HtmlViewerComponent.prototype.changePage = function (currentPage) {
        if (currentPage === this.page) {
            // 同じボタンを押した時
            this.Editing = true; // 編集ボックスを表示する
            return; // 何もしない
        }
        this.page = currentPage;
        // ページ番号性を設定する
        var n = Math.min(currentPage - 1, 2);
        for (var i = 0; i < this.liNumber.length; i++) {
            this.liNumber[i] = currentPage - n + i;
        }
        // active属性を設定する
        for (var i = 0; i < this.liActive.length; i++) {
            this.liActive[i] = false;
        }
        this.liActive[n] = true;
    };
    // ページを飛んだあと左右＜＞に移動や隣ページへの移動周辺、5ページ送り
    HtmlViewerComponent.prototype.moveToNextPage = function (count) {
        var Next;
        var additional;
        var minus;
        var plus;
        // 1、2ページ目だけイレギュラーな動きをする
        if (this.page === 1) {
            additional = 2;
            minus = -2;
            plus = -1;
        }
        else if (this.page === 2) {
            additional = 1;
            minus = -1;
            plus = 0;
        }
        else {
            additional = 0;
            minus = -1;
            plus = 1;
        }
        Next = this.page + count + additional;
        if (Next < 1) {
            Next = 1;
        }
        this.changePage(Next);
    }; // 見えないところにボタンを配置してある。ボタンを押すのとEnterを押すのは同じとしているのでこれが発火点となる
    HtmlViewerComponent.prototype.click = function (id) {
        if (id === void 0) { id = null; }
        var value;
        if (id === null) {
            value = this.helper.toNumber(this.myControl.value.number2);
        }
        else {
            value = this.helper.toNumber(id);
        }
        if (value !== null) {
            this.changePage(value);
            this.Editing = false;
        }
    };
    HtmlViewerComponent.prototype.close = function () {
        this.activeModal.close('Submit');
    };
    HtmlViewerComponent.prototype.print = function () {
        printJS({
            printable: 'print_section',
            type: 'html',
            style: this.PrintCss
        });
    };
    var HtmlViewerComponent_1;
    HtmlViewerComponent = HtmlViewerComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-html-viewer',
            templateUrl: './html-viewer.component.html',
            styleUrls: ['./html-viewer.component.scss', '../reset.scss']
        })
    ], HtmlViewerComponent);
    return HtmlViewerComponent;
}());
exports.HtmlViewerComponent = HtmlViewerComponent;
