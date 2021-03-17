"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PagerComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var PagerComponent = /** @class */ (function () {
    function PagerComponent(helper, printlist) {
        this.helper = helper;
        this.printlist = printlist;
        //  親コンポーネントに対してイベントを発火するためのプロパティ
        this.event = new core_1.EventEmitter();
        this.liActive = [false, false, false, false, false];
        this.liNumber = [1, 2, 3, 4, 5];
        this.myControl = null;
        this.Editing = false;
        this.page = 0;
        this.count = 0;
        this.changePage(1);
    }
    PagerComponent.prototype.ngOnInit = function () {
        this.myControl = new forms_1.FormGroup({
            number2: new forms_1.FormControl()
        });
        this.count = this.printlist.dataDisplay(0).keysCount;
        this.key = 1;
    };
    PagerComponent.prototype.changePage = function (currentPage) {
        // if (currentPage === this.page) {
        //   // 同じボタンを押した時
        //   this.Editing = true; // 編集ボックスを表示する
        //   return; // 何もしない
        // }
        this.page = currentPage;
        // // 親コンポーネントに通知する
        // this.event.emit(this.page);
        // // ページ番号性を設定する
        // const n = Math.min(currentPage - 1, 2);
        // for (let i = 0; i < this.liNumber.length; i++) {
        //   this.liNumber[i] = currentPage - n + i;
        // }
        // // active属性を設定する
        // for (let i = 0; i < this.liActive.length; i++) {
        //   this.liActive[i] = false;
        // }
        // this.liActive[n] = true;
    };
    // ページを飛んだあと左右＜＞に移動や隣ページへの移動周辺、5ページ送り
    PagerComponent.prototype.moveToNextPage = function (count) {
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
        Next = this.page + count;
        if (Next < 1) {
            Next = 1;
            this.page = 1;
        }
        this.changePage(Next);
        this.myControl.value.number2 = Next;
        var number = document.getElementById('number');
        if (number !== null && this.myControl.value.number2 < 1) {
            this.myControl.value.number2 = 1;
            this.key = 1;
        }
        else if (number !== null && this.myControl.value.number2 > this.count) {
            this.page = this.count;
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
    }; // 見えないところにボタンを配置してある。ボタンを押すのとEnterを押すのは同じとしているのでこれが発火点となる
    PagerComponent.prototype.click = function (id) {
        if (id === void 0) { id = null; }
        var value = this.helper.toNumber(this.myControl.value.number2);
        if (value !== null || value < 1 || value > this.count) {
            this.changePage(1);
            this.key = 1;
        }
        else if (value === null) {
            alert('alert');
        }
        else {
            this.changePage(value);
        }
    };
    __decorate([
        core_1.Output()
    ], PagerComponent.prototype, "event");
    PagerComponent = __decorate([
        core_1.Component({
            selector: 'app-pager',
            templateUrl: './pager.component.html',
            styleUrls: ['./pager.component.scss']
        })
    ], PagerComponent);
    return PagerComponent;
}());
exports.PagerComponent = PagerComponent;
