import {Component} from '@angular/core';
import {ConversionHistoryEntry} from "../../model/model";
import {ConversionHistoryService} from "../../services/conversion-history.service";
import {CommonModule, JsonPipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {MaskDialogComponent} from "../mask-dialog/mask-dialog.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-conversion-history',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe,
    MatButton
  ],
  templateUrl: './conversion-history.component.html',
  styleUrl: './conversion-history.component.css'
})
export class ConversionHistoryComponent {
  history: ConversionHistoryEntry[] = [];
  mask: string = '{latitude}, {longitude}';

  constructor(private historyService: ConversionHistoryService, public dialog: MatDialog) {
    this.history = this.historyService.getHistory();
  }

  formatConversion(values: object): string {
    return Object.entries(values)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
  }

  formatWithMask(outputValues: object, mask?: string): string {
    let formatted = mask || this.mask;
    for (const [key, value] of Object.entries(outputValues)) {
      formatted = formatted.replace(`{${key}}`, value.toString());
    }
    return formatted;
  }

  openMaskDialog(): void {
    const dialogRef = this.dialog.open(MaskDialogComponent, {
      width: '500px',
      data: {mask: this.mask}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mask = result;
      }
    });
  }

}
