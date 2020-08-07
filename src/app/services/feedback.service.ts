import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  message: string;
  feedback: FeedbackResponse;

  constructor(private http: HttpClient, private env: EnvService) {}

  getFeedback(sessionId: string) {
    return this.http
      .get<{ feedbackRequest: FeedbackResponse[] }>(
        this.env.API_URL + '/feedback/' + sessionId
      )
      .pipe(map(value => (this.feedback = value.feedbackRequest[0])));
  }
}

export interface FeedbackResponse {
  feedId: number;
  sessionId: string;
  feedType: number;
  feedDetails: string;
  date: number;
}
