import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA,  MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
})
export class UpdateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  closeDialog() {
    this.dialogRef.close();
  }
}
