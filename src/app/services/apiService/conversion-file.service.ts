import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversionFileService {

  private fileProcessUrl = 'http://localhost:8080/api/v1/coordinates/process-file';

  constructor(private http: HttpClient) { }

  processFile(file: File, conversionType: string, fileType: 'excel' | 'word' | 'text' | 'csv'): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const headers = new HttpHeaders({'Conversion-Type': conversionType});
    return this.http.post(`${this.fileProcessUrl}/${fileType}`, formData,
      {headers: headers, responseType: 'blob'});
  }

}
