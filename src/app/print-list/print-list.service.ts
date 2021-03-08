import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrintListService {
  public selectedIndex = '1'; // スペクトルの種類

  public PrintIndex: any[] = [
    { id: 1 , name: 'node', },
    { id: 2 , name: 'fixnode',  },
    { id: 3 , name: 'load', },
    { id: 4 , name: 'loadname',  },
    { id: 5 , name: 'joint',   },
  ];

  constructor() {}
}
