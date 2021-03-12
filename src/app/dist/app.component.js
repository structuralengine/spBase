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
    AppComponent.prototype.onScroll = function () {
        var infoF = document.getElementById('infoFrame');
        if (infoF !== null) {
            infoF.innerHTML = 'ScrollY:' + document.documentElement.scrollTop;
        }
    };
    AppComponent.prototype.onScroll2 = function (event) {
        this.onScroll();
    };
    __decorate([
        core_1.HostListener('window:scroll', ['$event']) // for window scroll events
    ], AppComponent.prototype, "onScroll2");
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
