import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AssignService } from 'src/app/services/assign.service';
import { ComplainService } from 'src/app/services/complain.service';
import { AlertService } from 'src/app/services/alert.service';
import { ExamService } from 'src/app/services/exam.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reexam',
  templateUrl: './reexam.page.html',
  styleUrls: ['./reexam.page.scss'],
})
export class ReexamPage implements OnInit {

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private assignService: AssignService,
    private navCtrl: NavController,
    private complainService: ComplainService,
    private alertService: AlertService,
    private examService: ExamService,
    private feedbackService: FeedbackService
  ) { }
  patient = this.assignService.patient;
  complain;
  doctorId = this.authService.doctor.id;
  exam;
  doctor: number;
  sessionId = this.assignService.sessionId;
  session = this.assignService.sessionId + '002';

  ngOnInit() {
    this.assignService.getPatient(this.authService.doctor.id).subscribe(res => {
      if (this.assignService.responseCode === '00') {
      this.complainService.getComplain(this.sessionId + '002').subscribe(complain => {
          this.complain = this.complainService.complain;
          console.log(this.complain);
        });
      } else {
        console.log(this.assignService.responseCode);
      }
    });
  }

  sendExam(form: NgForm) {
    console.log(this.assignService.sessionId);
    this.examService.sendExam(
      this.doctorId,
      this.patient.id,
      form.value.exam,
      this.complain.complainId,
      this.sessionId + '200'
    ).subscribe(() => {
      if (this.examService.message === '00') {
        this.alertService.presentToast('Examination has been saved');
        this.navCtrl.navigateForward('/prescription');
      } else {
        this.alertService.presentToast('You cannot send another');
        this.navCtrl.navigateForward('/reexam');
    }
    });
  }

}
