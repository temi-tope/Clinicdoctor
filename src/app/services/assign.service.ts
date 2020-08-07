import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssignService {
  patient: AssignedPat;
  patients: any;
  sessionId: string;
  responseCode: string;
  message: string;

  constructor(private http: HttpClient, private env: EnvService) { }
   getPatient(doctorId: number) {
    return this.http
      .get<{ patient: AssignedPat[]; responseCode: string }>(
        this.env.API_URL + '/doctor/patient/' + doctorId
      )
      .pipe(map(value => {
        if (value.responseCode === '00') {
          this.patient = value.patient[0];
          this.responseCode = value.responseCode;
        } else {
          this.responseCode = value.responseCode;
        }
      }
      ));
  }

  getSessionId(patientId: number) {
    return this.http
    .get<{ sessionId: string; responseCode: string; }>(
      this.env.API_URL + '/assign/' + patientId,
    )
    .pipe(map(val => {
      this.sessionId = val.sessionId;
      this.responseCode = val.responseCode;
    } ));
}

  getHistory(doctorId: number) {
    return this.http
      .get<{patient: History[]}>(
        this.env.API_URL + '/history/doctors/' + doctorId,
      )
      .pipe(map(val => (
        this.patients = val
        )
        ));
  }

  // tslint:disable-next-line: variable-name
  updateStatus(sessionId: string) {
    const body = {
      sessionId,
    };
    return this.http
      .post<{responseCode: string}>(this.env.API_URL + '/assign/status', body)
      .pipe(map(val => (this.message = val.responseCode)));
  }

}

export interface AssignedPat {
  id: number;
  name: string;
  address: string;
  religion: string;
  sex: string;
  occupation: string;
  regDate: string;
  username: string;
  dob: string;
}

export interface History {
  name: string;
  complaint: string;
  complaintDate: string;
  sessionId: string;
  additonalInfo: string;
 }
