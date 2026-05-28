import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckInResponse } from '../models/check-in-response.model';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  // Endpoint del backend para validar accesos
  private readonly apiUrl = 'http://localhost:3000/api/check-in';

  constructor(private http: HttpClient) {}

  // Envía el código ingresado y recibe la respuesta del servidor
  checkIn(accessCode: string): Observable<CheckInResponse> {
    return this.http.post<CheckInResponse>(this.apiUrl, {
      access_code: accessCode
    });
  }
}