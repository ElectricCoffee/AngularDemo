import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA,  MatDialogRef} from '@angular/material/dialog';
import {StockDatum} from '../types/stock-datum';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
})
export class AddDialogComponent {
  form: FormGroup;

  constructor(
    private fb : FormBuilder,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      itemId: ['', [Validators.required]],
      itemName: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]],
      location: ['', [Validators.required]],
    })
  }
  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const formData = this.form.value;
    console.log(formData);
    this.dialogRef.close(formData);
  }
}
