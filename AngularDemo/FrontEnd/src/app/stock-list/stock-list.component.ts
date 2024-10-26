import {Component, OnInit} from '@angular/core';
import {StockDataService, StockDatum} from '../services/stock-data.service';

// Note to the reviewer:
// this entire component runs off of the idea of "eventual consistency"
// in other words, we don't wait for the server to respond before updating the UI,
// we just update the UI and assume everything went well on the back-end.
// The only way to verify that all went according to plan would be to reload the page,
// then see that it fetches the server's version of reality.

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styles: [``],
})
export class StockListComponent implements OnInit {
  tableData: StockDatum[] = [];

  constructor(private stockData: StockDataService) {}

  ngOnInit(): void {
    this.getItems();
    console.log('initialised')
  }

  getItems() {
    const response = this.stockData.getStockData()
    response.subscribe({
      next: data => {
        this.tableData = data;
      },
      error: error => console.log(error)
    })
  }

  findIndex(id: string): number {
    return this.tableData.findIndex(e => e.itemId === id);
  }

  createItem(itemName: string, amount: number, itemId: string, location: string) {
    const item = {itemName, amount, itemId, location};
    const i = this.findIndex(itemId);

    if (i !== -1) {
      this.tableData[i] = item;
    } else {
      this.tableData.push(item);
    }

    this.stockData.createItem(item);
  }

  deleteItem(id: string) {
    const i = this.findIndex(id);
    delete this.tableData[i];
    this.stockData.deleteItem(id);
  }
}
