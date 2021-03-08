import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrintListService {
  public selectedIndex = '1'; // スペクトルの種類

  public PrintIndex: any[] = [
    { id: 1 , name: '片持ち梁', file:'1'},
    { id: 2 , name: '曲がり梁', file:'1' },
    { id: 3 , name: '地盤もどき(mesh分割数多め)', file:'1'  },
    { id: 4 , name: '地盤もどき(mesh分割数少なめ)', file:'1'  },
    { id: 5 , name: '地盤もどき(mesh分割数少なめ)', file:'1'  },
  ];

  constructor() {}
}
