"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var html_viewer_component_1 = require("./html-viewer/html-viewer.component");
var AppComponent = /** @class */ (function () {
    function AppComponent(modalService) {
        this.modalService = modalService;
    }
    AppComponent.prototype.htmlViewerOpen = function () {
        this.modalService.open(html_viewer_component_1.HtmlViewerComponent).result.then(function (result) { });
    };
    // @HostListener('scroll') scrolling(){
    //   console.log('scrolling');
    // }
    // @HostListener('window:scroll', ['$event']) // for window scroll events
    // onScroll2(event: any) {
    // }
    AppComponent.prototype.scrolling = function () {
        console.log('scrolling');
    };
    AppComponent.prototype.onc = function () {
        var infoH = document.getElementById('scroll-box1');
        var infoI = document.getElementById('scroll-amount1');
        if (infoH !== null) {
            infoH.addEventListener('scroll', function () {
                if (infoI !== null) {
                    infoI.textContent = 'ScrollY:' + infoI.scrollTop;
                }
            });
        }
    };
    __decorate([
        core_1.HostListener('scroll')
    ], AppComponent.prototype, "scrolling");
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
