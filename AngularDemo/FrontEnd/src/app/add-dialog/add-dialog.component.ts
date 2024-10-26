import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA,  MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
})
export class AddDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  closeDialog() {
    this.dialogRef.close();
  }
}
