import {Component, OnInit} from '@angular/core';

type TableDatum = {
  amount: number;
  itemId: string;
  location: string;
}

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styles: [``],
})

export class StockListComponent implements OnInit {
  tableData: TableDatum[] = []

  ngOnInit(): void {
    // TODO: fetch list from server
    console.log('initialised')
  }

  createItem(amount: number, itemId: string, location: string) {
    this.tableData.push({amount, itemId, location});
    // TODO: send request to server that the item is being created
  }

  deleteItem(id: string) {
    const i = this.tableData.findIndex(i => i.itemId === id);
    delete this.tableData[i];
    // TODO: tell server about the deletion
  }

}
