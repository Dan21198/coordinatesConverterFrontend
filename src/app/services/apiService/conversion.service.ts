import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DDCoordinates, DMSCoordinates, DMCoordinates } from '../../model/model';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  private baseUrl = 'http://localhost:8080/api/v1/coordinates/convert';

  constructor(private http: HttpClient) { }

  convertDMSToDD(dmsCoordinates: DMSCoordinates): Observable<DDCoordinates> {
    return this.http.post<DDCoordinates>(`${this.baseUrl}/dms-to-dd`, dmsCoordinates);
  }

  convertDMSToDM(dmsCoordinates: DMSCoordinates): Observable<DMCoordinates> {
    return this.http.post<DMCoordinates>(`${this.baseUrl}/dms-to-dm`, dmsCoordinates);
  }

  convertDMToDD(dmCoordinates: DMCoordinates): Observable<DDCoordinates> {
    return this.http.post<DDCoordinates>(`${this.baseUrl}/dm-to-dd`, dmCoordinates);
  }

  convertDMToDMS(dmCoordinates: DMCoordinates): Observable<DMSCoordinates> {
    return this.http.post<DMSCoordinates>(`${this.baseUrl}/dm-to-dms`, dmCoordinates);
  }

  convertDDToDM(ddCoordinates: DDCoordinates): Observable<DMCoordinates> {
    return this.http.post<DMCoordinates>(`${this.baseUrl}/dd-to-dm`, ddCoordinates);
  }

  convertDDToDMS(ddCoordinates: DDCoordinates): Observable<DMSCoordinates> {
    return this.http.post<DMSCoordinates>(`${this.baseUrl}/dd-to-dms`, ddCoordinates);
  }

}
