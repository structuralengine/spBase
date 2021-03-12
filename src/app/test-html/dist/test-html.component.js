"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TestHtmlComponent = void 0;
var core_1 = require("@angular/core");
var TestHtmlComponent = /** @class */ (function () {
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
    function TestHtmlComponent(printlist) {
        this.printlist = printlist;
        this.ofset = 60;
        this.startPos = 0;
        this.headerPos = 0;
        this.dataset = new Array();
    }
    TestHtmlComponent.prototype.ngOnInit = function () {
        this.dataset = this.printlist.dataDisplay(0).body;
        console.log(this.dataset); // 水平方向
    };
    __decorate([
        core_1.Directive({
            selector: '[scrollTracker]'
        })
    ], TestHtmlComponent.prototype, "dataset");
    TestHtmlComponent = __decorate([
        core_1.Component({
            selector: 'app-test-html',
            templateUrl: './test-html.component.html',
            styleUrls: ['./test-html.component.scss']
        })
    ], TestHtmlComponent);
    return TestHtmlComponent;
}());
exports.TestHtmlComponent = TestHtmlComponent;
