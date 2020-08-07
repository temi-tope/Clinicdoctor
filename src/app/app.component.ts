import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Platform, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'View Patient',
      url: '/home',
      icon: 'list'
    },
    {
      title: 'Examination Report',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Feedback',
      url: '/feedback',
      icon: 'list'
    },
  ];

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private authService: AuthService,
              private navCtrl: NavController,
              private alertService: AlertService) {
      // Use matchMedia to check the user preference
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // toggleDarkTheme(prefersDark.matches);

    //   // Listen for changes to the prefers-color-scheme media query
    // // tslint:disable-next-line: deprecation
    // prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

    //   // Add or remove the "dark" class based on if the media query matches
    // function toggleDarkTheme(shouldAdd) {
    //     // tslint:disable-next-line: deprecation
    //     document.body.classList.toggle('dark', shouldAdd);
    //   }
    this.initializeApp();

  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCSajRkWrxI4mhcpsq4cMXKLJe-ADulxmg',
    authDomain: 'https://chat-56405.firebaseio.com'
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // Commenting splashScreen Hide, so it won't hide splashScreen before auth check
      // this.splashScreen.hide();
      this.authService.getToken();
    });

  }

  logout() {
        this.navCtrl.navigateRoot('/landing');
      }

  ontoggle() {
    if (document.body.classList.toggle('light')) {
    // tslint:disable-next-line: only-arrow-functions
    document.getElementById('themeToggle').addEventListener('touchstart', function() {
      document.body.classList.toggle('dark');
    });
  } else {
    // tslint:disable-next-line: only-arrow-functions
    document.getElementById('themeToggle').addEventListener('touchstart', function() {
       document.body.classList.toggle('light');
    }
    );
  }

}
}
