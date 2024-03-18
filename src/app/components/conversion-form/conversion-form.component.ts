import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { DDCoordinates, DMSCoordinates, DMCoordinates } from '../../model/model';
import {HttpClient} from "@angular/common/http";
import {ConversionService} from "../../services/apiService/conversion.service";

@Component({
  selector: 'app-conversion-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './conversion-form.component.html',
  styleUrl: './conversion-form.component.css'
})
export class ConversionFormComponent {
  // Initialize variables for DD conversion
  ddLatitude: number = 0;
  ddLongitude: number = 0;

  // Initialize variables for DM conversion
  dmLatDegrees: number = 0;
  dmLatMinutes: number = 0;
  dmLonDegrees: number = 0;
  dmLonMinutes: number = 0;

  // Initialize variables for DMS conversion
  dmsLatDegrees: number = 0;
  dmsLatMinutes: number = 0;
  dmsLatSeconds: number = 0;
  dmsLonDegrees: number = 0;
  dmsLonMinutes: number = 0;
  dmsLonSeconds: number = 0;

  constructor(private conversionService: ConversionService) { }

  convertDD() {
    const ddCoordinates: DDCoordinates = { latitude: this.ddLatitude, longitude: this.ddLongitude };
    this.conversionService.convertDDToDM(ddCoordinates).subscribe(response => {
      this.dmLatDegrees = response.latDegrees;
      this.dmLatMinutes = response.latMinutes;
      this.dmLonDegrees = response.lonDegrees;
      this.dmLonMinutes = response.lonMinutes;
    });
    this.conversionService.convertDDToDMS(ddCoordinates).subscribe(response => {
      this.dmsLatDegrees = response.latDegrees;
      this.dmsLatMinutes = response.latMinutes;
      this.dmsLatSeconds = response.latSeconds;
      this.dmsLonDegrees = response.lonDegrees;
      this.dmsLonMinutes = response.lonMinutes;
      this.dmsLonSeconds = response.lonSeconds;
    });
  }

  convertDM() {
    const dmCoordinates: DMCoordinates = {
      latDegrees: this.dmLatDegrees, latMinutes: this.dmLatMinutes,
      lonDegrees: this.dmLonDegrees, lonMinutes: this.dmLonMinutes
    };
    this.conversionService.convertDMToDD(dmCoordinates).subscribe(response => {
      this.ddLatitude = response.latitude;
      this.ddLongitude = response.longitude;
    });
    this.conversionService.convertDMToDMS(dmCoordinates).subscribe(response => {
      this.dmsLatDegrees = response.latDegrees;
      this.dmsLatMinutes = response.latMinutes;
      this.dmsLatSeconds = response.latSeconds;
      this.dmsLonDegrees = response.lonDegrees;
      this.dmsLonMinutes = response.lonMinutes;
      this.dmsLonSeconds = response.lonSeconds;
    });
  }

  convertDMS() {
    const dmsCoordinates: DMSCoordinates = {
      latDegrees: this.dmsLatDegrees, latMinutes: this.dmsLatMinutes, latSeconds: this.dmsLatSeconds,
      lonDegrees: this.dmsLonDegrees, lonMinutes: this.dmsLonMinutes, lonSeconds: this.dmsLonSeconds
    };
    this.conversionService.convertDMSToDD(dmsCoordinates).subscribe(response => {
      this.ddLatitude = response.latitude;
      this.ddLongitude = response.longitude;
    });
    this.conversionService.convertDMSToDM(dmsCoordinates).subscribe(response => {
      this.dmLatDegrees = response.latDegrees;
      this.dmLatMinutes = response.latMinutes;
      this.dmLonDegrees = response.lonDegrees;
      this.dmLonMinutes = response.lonMinutes;
    });
  }
}
