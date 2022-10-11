/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City!',
      'https://uncrate.com/p/2022/03/jonah-hill-loft-1.jpg',
      149.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      'p2',
      'L\'Amour Tojours',
      'Romantic Parisian Getaway',
      'https://d1dzqwexhp5ztx.cloudfront.net/imageRepo/4/0/81/939/245/5EssenceSuiteSite_O.jpg',
      199.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      'https://www.worldatlas.com/r/w1200/upload/c8/d7/68/shutterstock-121582312.jpg',
      99.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    )
  ]);

  constructor(private authService: AuthService) { }

  get places() {
    return this._places.asObservable();
  }

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map(places => {
        return { ...places.find(p => p.id === id) };
      })
    );
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://uncrate.com/p/2022/03/jonah-hill-loft-1.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    this.places.pipe(take(1)).subscribe((places) => {
      this._places.next(places.concat(newPlace));
    });
  }
}
