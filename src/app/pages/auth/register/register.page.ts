import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  error: string;
  constructor(private modalController: ModalController,
              private authService: AuthService,
              private navCtrl: NavController,
              private alertService: AlertService
  ) { }
  ngOnInit() {
  }
  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }
  // On Login button tap, dismiss Register modal and open login Modal
  async loginModal() {
    this.dismissRegister();
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }
  register(form: NgForm) {
    let name: string;
    name = form.value.fName + ' ' + form.value.lName;
    let date: string;
    date = form.value.dob.substring(0, 10);
    this.authService.register(
      name,
      form.value.workplace,
      form.value.licence_no,
      form.value.sex,
      form.value.address,
      form.value.specialization,
      form.value.username,
      form.value.password,
      date)
      .subscribe(
        () => {
        this.alertService.presentToast('Account Registered');
        this.dismissRegister();
        this.loginModal();
      },
      error => {
        this.alertService.presentToast('Invaild Username');
      });
    // this.navCtrl.navigateRoot('/login');
  }
  }
