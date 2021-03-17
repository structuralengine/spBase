"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PrintListService = void 0;
var core_1 = require("@angular/core");
// import { PagerComponent } from '../pager/pager.component';
var PrintListService = /** @class */ (function () {
    function PrintListService() {
        this.dataset = {};
        this.selectedIndex = '1'; // スペクトルの種類
        this.pageScroll_service = 0;
        this.PrintIndex = [
            { id: '1', name: 'node' },
            { id: '2', name: 'fixnode' },
            { id: '3', name: 'load' },
            { id: '4', name: 'loadname' },
            { id: '5', name: 'joint' },
            { id: '6', name: 'joint' },
        ];
    }
    // ngOnInit(): void {
    //   const d = this.PrintIndex;
    //   this.table = this.dataDisplay(d);
    // }
    PrintListService.prototype.dataDisplay = function (d) {
        d = this.PrintIndex;
        var body = new Array();
        var keys = Object.keys(d);
        var keysCount = Object.keys(d).length;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var index = keys_1[_i];
            var i = parseInt(index);
            var item = d[i].id;
            body.push(item);
        }
        return { keysCount: keysCount, body: body };
    };
    PrintListService.prototype.pageScroll = function (o) {
        // const d = this.pager.changePage(o);
        // console.log(d);
        // return d;
    };
    PrintListService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PrintListService);
    return PrintListService;
}());
exports.PrintListService = PrintListService;
