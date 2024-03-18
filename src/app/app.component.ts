import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ConversionFormComponent } from "./components/conversion-form/conversion-form.component";
import {FileUploadComponent} from "./components/file-upload/file-upload.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ConversionFormComponent,
    HttpClientModule,
    FileUploadComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coordinatesConverter';
}
