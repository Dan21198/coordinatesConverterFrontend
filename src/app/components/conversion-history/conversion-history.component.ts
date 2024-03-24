import {Component, OnInit} from '@angular/core';
import {ConversionHistoryEntry} from "../../model/model";
import {ConversionHistoryService} from "../../services/conversion-history.service";
import {CommonModule, JsonPipe} from "@angular/common";

@Component({
  selector: 'app-conversion-history',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe
  ],
  templateUrl: './conversion-history.component.html',
  styleUrl: './conversion-history.component.css'
})
export class ConversionHistoryComponent {
  history: ConversionHistoryEntry[] = [];

  constructor(private historyService: ConversionHistoryService) {
    this.history = this.historyService.getHistory();
  }

  formatConversion(values: object): string {
    return Object.entries(values)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
  }
}
