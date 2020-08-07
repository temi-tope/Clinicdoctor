import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AssignService } from 'src/app/services/assign.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  sessionId = this.assignService.sessionId;
  patient = this.assignService.patient;
  doctor = this.authService.doctor.id;
  feedback;
  feedbacktype;
  constructor(
    private feedbackService: FeedbackService,
    private assignService: AssignService,
    private navCtrl: NavController,
    private authService: AuthService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.assignService.getPatient(this.doctor).subscribe(res => {
      if (this.assignService.responseCode === '00') {
      this.assignService.getSessionId(this.patient.id).subscribe(id => {
        this.feedbackService.getFeedback(this.sessionId).subscribe(() => {
          this.feedback = this.feedbackService.feedback;
          if (this.feedbackService.feedback.feedType === 1) {
            this.feedbacktype = 'Satisfied';
          } else {
            this.feedbacktype = 'Not Satisfied';
          }
        });
      });
    } else {
      console.log(this.assignService.responseCode);
    }
    });
  }

  updateStatus() {
    this.assignService.updateStatus(this.sessionId).subscribe(() => {
      if (this.assignService.message === '00') {
        this.alertService.presentToast('Service ended. Thank you');
        this.navCtrl.navigateForward('/dashboard');
      } else {
        this.alertService.presentToast('Error ending service');
        this.navCtrl.navigateForward('/feedback');
      }

    });
  }
  reExamin() {
      this.navCtrl.navigateForward('/reexam');
  }
}
