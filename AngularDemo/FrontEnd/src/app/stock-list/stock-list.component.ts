import {Component, OnInit} from '@angular/core';
import {StockDataService, StockDatum} from '../services/stock-data.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styles: [``],
})

export class StockListComponent implements OnInit {
  tableData: StockDatum[] = []

  constructor(private stockData: StockDataService) {
  }

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

  createItem(itemName: string, amount: number, itemId: string, location: string) {
    this.tableData.push({itemName, amount, itemId, location});
    // TODO: send request to server that the item is being created
  }

  deleteItem(id: string) {
    const i = this.tableData.findIndex(i => i.itemId === id);
    delete this.tableData[i];
    // TODO: tell server about the deletion
  }

}
