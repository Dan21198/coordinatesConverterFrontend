import { Injectable } from '@angular/core';
import {ConversionHistoryEntry} from "../model/model";

@Injectable({
  providedIn: 'root'
})
export class ConversionHistoryService {
  private history: ConversionHistoryEntry[] = [];

  constructor() { }

  addHistoryEntry(entry: ConversionHistoryEntry): void {
    this.history.unshift(entry);
  }

  getHistory(): ConversionHistoryEntry[] {
    return this.history;
  }

  clearHistory(): void {
    this.history = [];
  }
}
