import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  constructor(private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
  }

  onBookPlace() {
    // this.router.navigateByUrl('/places/tabs/discover');
      // above doesn't always use the right animation
      // we want to use the "backward" animation, so we should use the navCtrl instead
    this.navCtrl.navigateBack('/places/tabs/discover');
    // this.navCtrl.pop();
      // .pop() removes current page from the top of the stack
      // won't work if you reload on this page since stack will be 1 page total
      // it's best for dynamic content that shouldn't be present on reload (like a modal)
  }
}
