import {NgModule} from '@angular/core';
import {StockListComponent} from './stock-list/stock-list.component';
import {MatButtonModule} from '@angular/material/button'
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {AddDialogComponent} from './add-dialog/add-dialog.component';
import {UpdateDialogComponent} from './update-dialog/update-dialog.component';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  exports: [
    StockListComponent
  ],
  declarations: [
    StockListComponent,
    AddDialogComponent,
    UpdateDialogComponent,
    DeleteDialogComponent,
  ]
})
export class AppModule {}
