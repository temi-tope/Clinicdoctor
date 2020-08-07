import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComplainService {
  complain: ComplainResponse;
  constructor(private http: HttpClient, private env: EnvService) { }

  getComplain(sessionId: string) {
    return this.http
      .get<{ complainRequest: ComplainResponse[] }>(
        this.env.API_URL + '/complain/' + sessionId
      )
      .pipe(map(value => {
        console.log(value);
        this.complain = value.complainRequest[0];
      }));
  }
}

export interface ComplainResponse {
  [x: string]: any;
  complainRequest: [{
  patientId: number;
  complain: string;
  complainId: number;
  sessionId: string;
  date: string;
  additionalInfo: string;
}];
responseCode: string;
responseMessage: string;
}
