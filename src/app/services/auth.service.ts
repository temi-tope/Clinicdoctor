import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { tap, map} from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';

import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token: any;
  loading: boolean;
  message: string;
  doctor: DoctorResponse;
  responseCode;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
    private alert: AlertService
  ) {}

  register(
    name: string,
    workplace: string,
    // tslint:disable-next-line: variable-name
    licenceNo: number,
    sex: string,
    address: string,
    specialization: string,
    username: string,
    password: string,
    dob: string
  ) {
    const body = {
      name,
      sex,
      address,
      workplace,
      licenceNo,
      specialization,
      username,
      password,
      dob
    };
    return this.http
      .post<{ responseCode: string }>(this.env.API_URL + '/registration/doctors', body)
      .pipe(map(val => (this.message = val.responseCode)));
  }

  login(username: string, password: string, role: number = 1) {
    const body = { username, password, role };
    return this.http
      .post<{ doctor: DoctorResponse[]; responseCode: DoctorResponse }>(
        this.env.API_URL + '/login/doctors',
        body
      )
      .pipe(map(val => {
        this.doctor = val.doctor[0];
        this.responseCode = val.responseCode;
      })
      );
  }

  logout() {
    const headers = new HttpHeaders({
      Authorization: this.token.token_type + ' ' + this.token.access_token
    });
    return this.http
      .get(this.env.API_URL + '/auth/logout.json', { headers })
      .pipe(
        tap(data => {
          this.storage.remove('token');
          this.isLoggedIn = false;
          delete this.token;
          return data;
        })
      );
  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }
}

export interface DoctorResponse {
  [x: string]: any;
  doctor: [{ id: number;
    name: string;
    workplace: string;
    licence_no: string;
    sex: string;
    address: string;
    avaliable: number;
    specialization: string;
    reg_date: string;
    username: string;
    dob: string;
  }];
  responseCode: string;
  responseMessage: string;
  }

