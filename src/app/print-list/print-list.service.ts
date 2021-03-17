import { Injectable } from '@angular/core';
// import { PagerComponent } from '../pager/pager.component';

@Injectable({
  providedIn: 'root',
})
export class PrintListService {
  public dataset = <any>{};
  public table: any;
  public selectedIndex = '1'; // スペクトルの種類
  public pageScroll_service:number = 0;
  public PrintIndex: any[] = [
    { id: '1', name: 'node' },
    { id: '2', name: 'fixnode' },
    { id: '3', name: 'load' },
    { id: '4', name: 'loadname' },
    { id: '5', name: 'joint' },
    { id: '6', name: 'joint' },
  ];

  constructor() {}

  // ngOnInit(): void {
  //   const d = this.PrintIndex;
  //   this.table = this.dataDisplay(d);
  // }

  dataDisplay(d: any) {
    d = this.PrintIndex;
    let body: any[] = new Array();
    const keys: string[] = Object.keys(d);
    const keysCount: number = Object.keys(d).length;
    for (const index of keys) {
      let i = parseInt(index);
      let item = d[i].id;
      body.push(item);
    }
    return { keysCount, body };
  }

  pageScroll(o:number){
    // const d = this.pager.changePage(o);
    // console.log(d);
    // return d;
  }
}
