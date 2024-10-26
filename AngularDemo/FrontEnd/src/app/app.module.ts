import {NgModule} from '@angular/core';
import {StockListComponent} from './stock-list/stock-list.component';
import {MatButtonModule} from '@angular/material/button'
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    StockListComponent
  ],
  declarations: [
    StockListComponent
  ]
})
export class AppModule {}
