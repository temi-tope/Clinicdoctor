import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AssignService } from 'src/app/services/assign.service';
import { ComplainService } from 'src/app/services/complain.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  doctorId = this.authService.doctor.id;
  patient;
  sessionId;
  complain;
  history;

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private assignService: AssignService,
    private navCtrl: NavController,
    private complainService: ComplainService
  ) {
    this.menu.enable(true);
  }
  ngOnInit() {
    this.assignService.getHistory(this.doctorId).subscribe(hist => {
      this.history = hist.patient;
    });
    this.assignService.getPatient(this.doctorId).subscribe(res => {
      if (this.assignService.responseCode === '00') {
        this.patient = this.assignService.patient;
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

  getComplain() {
    this.navCtrl.navigateForward('/home');
  }

  getPresription(sessionId) {
    console.log('sessionId : ' , sessionId);
    this.navCtrl.navigateForward(['/details', sessionId]);
  }
}
