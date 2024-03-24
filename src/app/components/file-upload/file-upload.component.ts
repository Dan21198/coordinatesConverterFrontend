import { Component } from '@angular/core';
import {ConversionFileService} from "../../services/apiService/conversion-file.service";
import {ReactiveFormsModule} from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatOption} from "@angular/material/autocomplete";
import {MatLabel, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatOption,
    MatSelect,
    MatLabel,
    MatSelectModule,
    MatButtonToggleGroup,
    MatButtonToggle
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  conversionType: string = '';
  isDragging: boolean = false;

  constructor(private conversionFileService: ConversionFileService) {}

  setConversionType(type: string) {
    this.conversionType = type;
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File | null = target.files ? target.files[0] : null;
    if (file) {
      this.handleFile(file);
    }
  }

  dragOverHandler(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  dragLeaveHandler(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  private handleFile(file: File) {
    if (!this.conversionType) {
      alert('Please select a conversion type before uploading a file.');
      return;
    }
    const fileType = this.getFileType(file);
    if (!fileType) {
      alert('Unsupported file type');
      return;
    }
    this.conversionFileService.processFile(file, this.conversionType, fileType).subscribe(blob => {
      this.downloadFile(blob, this.generateDownloadFileName(file.name, this.conversionType));
    }, error => {
      console.error('Error processing file:', error);
      alert('Error processing file');
    });
  }

  private downloadFile(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  }

  private generateDownloadFileName(originalFileName: string, conversionType: string): string {
    const fileExtension = originalFileName.split('.').pop();
    return `${originalFileName.split('.').shift()}-${conversionType}.${fileExtension}`;
  }

  private getFileType(file: File): "excel" | "word" | "text" | "csv" | null {
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) return "excel";
    if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) return "word";
    if (fileName.endsWith('.txt')) return "text";
    if (fileName.endsWith('.csv')) return "csv";
    return null;
  }
}
