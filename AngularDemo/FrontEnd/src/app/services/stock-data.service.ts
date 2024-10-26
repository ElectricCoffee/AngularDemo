import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StockDatum} from '../types/stock-datum';

@Injectable({
  providedIn: "root",
})
export class StockDataService {
  private apiUrl = "https://localhost:44395/stockdata";

  constructor(private http: HttpClient) {}

  getStockData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createItem(body: StockDatum): Observable<any> {
    console.log('creating item', body)
    return this.http.post(this.apiUrl, body).pipe();
  }

  updateItem(body: StockDatum): Observable<any> {
    return this.http.put(`${this.apiUrl}/${body.itemId}`, body);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
