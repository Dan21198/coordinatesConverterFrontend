import {Component} from '@angular/core';
import {ConversionHistoryEntry, DDCoordinates, DMCoordinates, DMSCoordinates} from "../../model/model";
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

  formatWithMask(outputValues: DDCoordinates | DMCoordinates | DMSCoordinates, mask?: string): string {
    console.log('Mask before formatting:', mask);
    console.log('Output values:', outputValues);

    let formatted = mask || this.mask;

    type CoordinateValues = DDCoordinates | DMCoordinates | DMSCoordinates;

    const formatLatLon = (values: CoordinateValues, format: 'DD' | 'DM' | 'DMS') => {
      switch (format) {
        case 'DM':
          const dmValues = values as DMCoordinates;
          return {
            latitude: `${dmValues.latDegrees}°${dmValues.latMinutes}'`,
            longitude: `${dmValues.lonDegrees}°${dmValues.lonMinutes}'`
          };
        case 'DMS':
          const dmsValues = values as DMSCoordinates;
          return {
            latitude: `${dmsValues.latDegrees}°${dmsValues.latMinutes}'${dmsValues.latSeconds}"`,
            longitude: `${dmsValues.lonDegrees}°${dmsValues.lonMinutes}'${dmsValues.lonSeconds}"`
          };
        default:
          const ddValues = values as DDCoordinates;
          return {
            latitude: ddValues.latitude?.toString(),
            longitude: ddValues.longitude?.toString()
          };
      }
    };

    const formatType = 'latDegrees' in outputValues ? ('latSeconds' in outputValues ? 'DMS' : 'DM') : 'DD';
    const formattedValues = formatLatLon(outputValues, formatType);

    for (const [key, value] of Object.entries(formattedValues)) {
      formatted = formatted.replace(new RegExp(`{${key}}`, 'g'), value);
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
