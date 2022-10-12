/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';

// new Place(
//   'p1',
//   'Manhattan Mansion',
//   'In the heart of New York City!',
//   'https://uncrate.com/p/2022/03/jonah-hill-loft-1.jpg',
//   149.99,
//   new Date('2019-01-01'),
//   new Date('2019-12-31'),
//   'abc'
// ),
// new Place(
//   'p2',
//   'L\'Amour Tojours',
//   'Romantic Parisian Getaway',
//   'https://d1dzqwexhp5ztx.cloudfront.net/imageRepo/4/0/81/939/245/5EssenceSuiteSite_O.jpg',
//   199.99,
//   new Date('2019-01-01'),
//   new Date('2019-12-31'),
//   'abc'
// ),
// new Place(
//   'p3',
//   'The Foggy Palace',
//   'Not your average city trip!',
//   'https://www.worldatlas.com/r/w1200/upload/c8/d7/68/shutterstock-121582312.jpg',
//   99.99,
//   new Date('2019-01-01'),
//   new Date('2019-12-31'),
//   'abc'
// )
interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  get places() {
    return this._places.asObservable();
  }

  fetchPlaces() {
    return this.http
      .get<{ [key: string]: PlaceData }>('https://ionic-angular-udemy-4e6dc-default-rtdb.firebaseio.com/offered-places.json')
      .pipe(map(resData => {
        const places = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            places.push(new Place(
              key,
              resData[key].title,
              resData[key].description,
              resData[key].imageUrl,
              resData[key].price,
              new Date(resData[key].availableFrom),
              new Date(resData[key].availableTo),
              resData[key].userId
            ));
          }
        }
        return places;
      }),
      tap(places => {
        this._places.next(places);
      })
      );
  }

  getPlace(id: string) {
    // return this.places.pipe(
    //   take(1),
    //   map(places => {
    //     return { ...places.find(p => p.id === id) };
    //   })
    // );
    return this.http
      .get<PlaceData>(
        `https://ionic-angular-udemy-4e6dc-default-rtdb.firebaseio.com/offered-places/${id}.json`
      )
      .pipe(
        map(placeData => {
          return new Place(
            id,
            placeData.title,
            placeData.description,
            placeData.imageUrl,
            placeData.price,
            new Date(placeData.availableFrom),
            new Date(placeData.availableTo),
            placeData.userId
          );
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
    let generatedId: string;
    return this.http
      .post<{name: string}>(
        'https://ionic-angular-udemy-4e6dc-default-rtdb.firebaseio.com/offered-places.json',
        {...newPlace, id: null }
    )
    .pipe(
      switchMap(resData => {
        generatedId = resData.name;
        return this.places;
      }),
      take(1),
      tap(places => {
        newPlace.id = generatedId;
        this._places.next(places.concat(newPlace));
      })
    );
    // return this.places.pipe(
    //   take(1), delay(1000), tap(places => {
    //     this._places.next(places.concat(newPlace));
    //   })
    // );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap(places => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id, title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );

        return this.http.put(
          `https://ionic-angular-udemy-4e6dc-default-rtdb.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }), tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}
