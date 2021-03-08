import { Component, OnInit } from '@angular/core';
import { PrintListService } from '../print-list/print-list.service';

@Component({
  selector: 'app-test-html',
  templateUrl: './test-html.component.html',
  styleUrls: ['./test-html.component.scss'],
})
export class TestHtmlComponent implements OnInit {
  public dataset = <any>{};
  constructor(public printlist: PrintListService) {}

  ngOnInit(): void {
    const d = this.printlist.PrintIndex;
    const table = this.datad(d);
    this.dataset = table.body;
  }

  datad(d:any) {
    let body: any[] = new Array();
    const keys: string[] = Object.keys(d);
    for (const index of keys) {
      let i = parseInt(index);
      let item = d[i].id;
      body.push(item);
    }
    return {body};
  }


  keyValues = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3',
  };
}
