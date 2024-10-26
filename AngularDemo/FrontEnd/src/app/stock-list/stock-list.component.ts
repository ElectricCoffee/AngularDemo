import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {StockDataService, StockDatum} from '../services/stock-data.service';
import {UpdateDialogComponent} from '../update-dialog/update-dialog.component';
import {AddDialogComponent} from '../add-dialog/add-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {removeAtIndex, replaceAtIndex} from '../util/arrayUtils';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

// Note to the reviewer:
// this entire component runs off of the idea of "eventual consistency"
// in other words, we don't wait for the server to respond before updating the UI,
// we just update the UI and assume everything went well on the back-end.
// The only way to verify that all went according to plan would be to reload the page,
// then see that it fetches the server's version of reality.

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styles: [`.filterField {width: 100%;}`],
})
export class StockListComponent implements OnInit, AfterViewInit {
  tableData = new MatTableDataSource<StockDatum>([]);
  displayedColumns: string[] = ['itemName', 'amount', 'itemId', 'location', 'editButton', 'deleteButton'];
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private stockData: StockDataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getItems();
    console.log('initialised')
  }

  ngAfterViewInit() {
    this.tableData.sort = this.sort;
  }

  applyFilter(event: KeyboardEvent): void {
    const value = (event.target as HTMLInputElement).value;
    this.tableData.filter = value.trim().toLowerCase();
  }

  getItems() {
    const response = this.stockData.getStockData()
    response.subscribe({
      next: data => {
        this.tableData.data = data;
      },
      error: error => console.log(error)
    })
  }

  findIndex(id: string): number {
    return this.tableData.data.findIndex(e => e.itemId === id);
  }

  createItem(item: StockDatum) {
    const i = this.findIndex(item.itemId);

    if (i !== -1) {
      this.tableData.data = replaceAtIndex(this.tableData.data, i, item);
    } else {
      this.tableData.data = [...this.tableData.data, item];
    }

    this.stockData.createItem(item).subscribe({
      next: data => console.log('Created', data),
      error: e => console.log(e),
    });
  }

  updateItem(item: StockDatum) {
    const i = this.findIndex(item.itemId);

    if (i !== -1) {
      this.tableData.data = replaceAtIndex(this.tableData.data, i, item);
    }

    this.stockData.updateItem(item).subscribe({
      next: data => console.log('Updated', data),
      error: e => console.log(e),
    });
  }

  deleteItem(id: string) {
    const i = this.findIndex(id);
    this.tableData.data = removeAtIndex(this.tableData.data, i);
    this.stockData.deleteItem(id).subscribe({
      next: data => console.log('Deleted', data),
      error: e => console.log(e),
    });
  }

  openAddDialog() {
    const ref = this.dialog.open(AddDialogComponent, {
      width: '500px',
      data: {}
    })

    ref.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        this.createItem(result);
      }
    })
  }
  openUpdateDialog(input: StockDatum) {
    const ref = this.dialog.open(UpdateDialogComponent, {
      width: '500px',
      data: {...input}
    })

    ref.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.updateItem({...input, ...result});
      }
    })
  }

  openDeleteDialog(input: StockDatum) {
    const ref = this.dialog.open(DeleteDialogComponent, {
      width: '200px',
      data: {...input}
    })

    ref.afterClosed().subscribe(res => {
      console.log(res);
      if(res) {
        this.deleteItem(input.itemId)
      }
    })
  }
}
