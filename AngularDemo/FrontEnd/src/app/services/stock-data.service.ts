import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export type StockDatum = {
  itemName: string,
  amount: number,
  itemId: string,
  location: string,
}

@Injectable({
  providedIn: "root",
})
export class StockDataService {
  private apiUrl = "https://localhost:44395/stockdata";

  constructor(private http: HttpClient) {}

  getStockData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
