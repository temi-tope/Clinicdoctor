import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PrescribeService } from 'src/app/services/prescribe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  prescription;
  sessionId: string;
  constructor(
    private prescribeService: PrescribeService,
    private navCtrl: NavController,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(path => {
      if (path.has('id')) {
        this.sessionId = path.get('id');
      }
    });
    console.log(this.sessionId);
    this.prescribeService.getPresc(this.sessionId).subscribe(res => {
      this.prescription = this.prescribeService.prescription;
  });
  }

  dismissDetails() {
    this.navCtrl.navigateForward('/dashboard');
  }

}
