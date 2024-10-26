import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA,  MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
})
export class UpdateDialogComponent {
  form: FormGroup
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      itemName: [data.itemName, [Validators.required]],
      amount: [data.amount, [Validators.required, Validators.min(0)]],
      location: [data.location, [Validators.required]],
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
