import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { NavController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';


declare const MAPS_API_TOKEN: string;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }

  onLogout() {
    this.authService.logout();
    this.navCtrl.navigateBack('/auth');
  }
}
