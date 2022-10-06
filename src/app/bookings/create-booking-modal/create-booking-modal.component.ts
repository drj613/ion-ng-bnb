import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-create-booking-modal',
  templateUrl: './create-booking-modal.component.html',
  styleUrls: ['./create-booking-modal.component.scss'],
})
export class CreateBookingModalComponent implements OnInit {
  @Input() selectedPlace: Place;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
    // you could pass in a modal ID as a third param if you have multiple modals open
  }

  onBookPlace() {
    this.modalCtrl.dismiss({message: 'Dummy message'}, 'confirm');
  }
}
