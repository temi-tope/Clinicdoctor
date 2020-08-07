import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AssignService } from 'src/app/services/assign.service';
import { ComplainService } from 'src/app/services/complain.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
patient = this.assignService.patient;
sessionId;
doctor = this.authService.doctor.id;
complain;
  constructor(
    private authService: AuthService,
    private assignService: AssignService,
    private navCtrl: NavController,
    private complainService: ComplainService
  ) {}

  ngOnInit() {
    this.assignService.getPatient(this.doctor).subscribe(res => {
      if (this.assignService.responseCode === '00') {
      this.assignService.getSessionId(this.patient.id).subscribe(id => {
        this.complainService.getComplain(this.assignService.sessionId).subscribe(complain => {
          this.complain = this.complainService.complain;
        });
      });
    } else {
      console.log(this.assignService.responseCode);
    }
    });
  }

  examin() {
    this.navCtrl.navigateForward('/list');
  }
}
