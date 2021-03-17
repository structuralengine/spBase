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
        this.count = 0;
        this.name = 0;
        this.key = 1;
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
        this.key = 1;
    };
    //　pager.component からの通知を受け取る
    HtmlViewerComponent.prototype.onReceiveEventFromChild = function (eventData) {
        // this.loadPage(eventData, this.ROWS_COUNT);
    };
    HtmlViewerComponent.prototype.onReceiveEventFromChildScroll = function (e) {
        console.log(e);
        this.key = e;
    };
    HtmlViewerComponent.prototype.loadPage = function (currentPage, row) {
    };
    HtmlViewerComponent.prototype.onSelectChange = function (value) {
        var v = parseInt(value);
        var data = this.printlist.PrintIndex[v - 1];
    };
    HtmlViewerComponent.prototype.dialogClose = function () {
        this.activeModal.close(HtmlViewerComponent_1);
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
    HtmlViewerComponent.prototype.onScroll = function () {
        var infoF = document.getElementById('infoFrame');
        if (infoF !== null) {
            infoF.innerHTML = 'ScrollY:' + document.documentElement.scrollTop;
        }
    };
    // public changePage(currentPage: number) {
    //   this.page = currentPage;
    // }
    HtmlViewerComponent.prototype.myFunct = function (keyEvent) {
        if (keyEvent.which === 13)
            alert('I am an alert');
    };
    // ページを飛んだあと左右＜＞に移動や隣ページへの移動周辺、5ページ送り
    HtmlViewerComponent.prototype.moveToNextPage = function (count) {
        var Next;
        Next = this.key + count;
        if (Next < 1) {
            Next = 1;
            this.key = 1;
        }
        this.myControl.value.number2 = Next;
        var number = document.getElementById('number');
        if (this.myControl.value.number2 < 1) {
            this.myControl.value.number2 = 1;
            this.key = 1;
        }
        else if (this.myControl.value.number2 > this.count) {
            this.myControl.value.number2 = this.count;
            this.key = this.count;
        }
        else if (number === null) {
            alert('da');
        }
        else {
            var value = this.helper.toNumber(this.myControl.value.number2);
            this.key = value;
        }
    };
    HtmlViewerComponent.prototype.onKeydown = function (event) {
        if (event.key === 'Enter') {
            console.log(event.key);
            var value = this.helper.toNumber(this.myControl.value.number2);
            if (value < 1 || value > this.count) {
                // this.changePage(1);
                this.key = 1;
            }
            else if (value === null) {
                alert('alert');
            }
            else {
                this.key = value;
            }
            console.log(this.key);
            document.getElementById('link').click();
        }
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
