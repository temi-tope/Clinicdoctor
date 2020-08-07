import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AssignService } from 'src/app/services/assign.service';
import { ComplainService } from 'src/app/services/complain.service';
import { ExamService } from 'src/app/services/exam.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  patient = this.assignService.patient;
  complain = this.complainService.complain;
  doctorId = this.authService.doctor.id;
  exam;
  doctor: number;
  sessionId = this.assignService.sessionId;
  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private assignService: AssignService,
    private navCtrl: NavController,
    private complainService: ComplainService,
    private alertService: AlertService,
    private examService: ExamService
  ) {}

  ngOnInit() {
    this.assignService.getPatient(this.authService.doctor.id).subscribe(res => {
      if (this.assignService.responseCode === '00') {
      this.complainService.getComplain(this.sessionId).subscribe(complain => {
          this.complain = this.complainService.complain;
        });
      } else {
        console.log(this.assignService.responseCode);
      }
    });
    this.examService.getExam(this.sessionId).subscribe(() => {
      this.exam =  this.examService.exam;
      if (this.exam) {
        this.alertService.presentToast('You cannot send another');
        this.navCtrl.navigateForward('/list');
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
      this.sessionId
    ).subscribe(() => {
      if (this.examService.message === '00') {
        this.alertService.presentToast('Examination has been saved');
        this.navCtrl.navigateForward('/prescription');
      } else {
        this.alertService.presentToast('You cannot send another');
        this.navCtrl.navigateForward('/list');
    }
    });
  }
}
