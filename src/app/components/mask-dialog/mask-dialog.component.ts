import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-mask-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButton,
  ],
  templateUrl: './mask-dialog.component.html',
  styleUrl: './mask-dialog.component.css'
})
export class MaskDialogComponent {
  mask: string;

  constructor(
    public dialogRef: MatDialogRef<MaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.mask = data.mask;
  }
}
