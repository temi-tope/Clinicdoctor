import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrescribeService {
  prescription: PresResponse;
  message: string;

  constructor(private http: HttpClient, private env: EnvService) {}

  getPresc(sessionId: string) {
    return this.http
      .get<{ prescribeRequest: PresResponse[] }>(
        this.env.API_URL + '/prescription/' + sessionId
      )
      .pipe(map(value => {
        console.log(value.prescribeRequest[0]);
        this.prescription = value.prescribeRequest[0];

      }));
  }

  sendPresc(
    doctorId: number,
    patientId: number,
    sessionId: string,
    name: string,
    dosage: number,
  ) {
    const body = {
      doctorId,
      patientId,
      sessionId,
      name,
      dosage
    };
    return this.http
      .post<{ responseCode: string }>(this.env.API_URL + '/prescription', body)
      .pipe(map(val => (this.message = val.responseCode)));
  }
}

export interface PresResponse {
  examId: number;
  doctorId: number;
  patientId: number;
  sessionId: string;
  exam: string;
  complaintId: number;
}
