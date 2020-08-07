import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  exam: ExamResponse;
  message: string;

  constructor(private http: HttpClient, private env: EnvService) {}

  getExam(sessionId: string) {
    return this.http
      .get<{ examRequest: ExamResponse[] }>(
        this.env.API_URL + '/examination/' + sessionId
      )
      .pipe(map(value => (this.exam = value.examRequest[0])));
  }

  sendExam(
    doctorId: number,
    patientId: number,
    exam: string,
    complaintId: number,
    sessionId: string
  ) {
    const body = {
      doctorId,
      patientId,
      exam,
      complaintId,
      sessionId
    };
    return this.http
      .post<{responseCode: string}>(this.env.API_URL + '/examination', body)
      .pipe(map(val => (this.message = val.responseCode)));
  }
}

export interface ExamResponse {
  examId: number;
  doctorId: number;
  patientId: number;
  sessionId: string;
  exam: string;
  complaintId: number;
}
