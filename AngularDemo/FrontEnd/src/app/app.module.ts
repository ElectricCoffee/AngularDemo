import {NgModule} from '@angular/core';
import {StockListComponent} from './stock-list/stock-list.component';
import {MatButtonModule} from '@angular/material/button'
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
  ],
  exports: [
    StockListComponent
  ],
  declarations: [
    StockListComponent
  ]
})
export class AppModule {}
