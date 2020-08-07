import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AssignService } from 'src/app/services/assign.service';
import { ComplainService } from 'src/app/services/complain.service';
import { ExamService } from 'src/app/services/exam.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';
import { PrescribeService } from 'src/app/services/prescribe.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.page.html',
  styleUrls: ['./prescription.page.scss'],
})
export class PrescriptionPage implements OnInit {
  patient = this.assignService.patient;
  complain = this.complainService.complain;
  doctorId = this.authService.doctor.id;
  constructor(
    private authService: AuthService,
    private assignService: AssignService,
    private complainService: ComplainService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private prescribeService: PrescribeService) { }

  ngOnInit() {}

  sendPresc(form: NgForm) {
    this.prescribeService.sendPresc(
      this.doctorId,
      this.patient.id,
      this.assignService.sessionId,
      form.value.name,
      form.value.dosage).subscribe(() => {
        if (this.prescribeService.message === '00') {
          this.alertService.presentToast('Prescription has been sent');
          this.navCtrl.navigateForward('/feedback');
        } else {
          this.alertService.presentToast('Prescription not sent');
      }
      });
  }

}
