import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';


import { Place } from './place.model';

interface PlaceData {
    id: string;
    title: string;
    image: string;
    score: number;
}

@Injectable({
    providedIn: 'root'
})
export class PlaceService {
    
    private _places = new BehaviorSubject<Place[]>([]);
    
    get getPlaces() {
        return this._places.asObservable();
    }
    
    places: Place[] = [
        new Place(
            '1',
            'Yellow',
            'https://pbs.twimg.com/profile_images/471051324214501376/NEQcE5pB.jpeg',
            80
        ),
        new Place(
            '2',
            'Rocket',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMuHkr3Oh4CxWWEacZZ6xREC2ACqtMjMgpxQqxIW1SOYI31eMjsw',
            50
        ),
        new Place(
            '3',
            'Brunholi',
            'https://static.thenounproject.com/png/340719-200.png',
            30
        ),

        new Place(
            '4',
            'Tchilis',
            'http://tchilis.com.br/wp-content/uploads/2017/02/logo.png',
            30
        )
    ]

    constructor(private http: HttpClient) {}

    fetchPlaces() {
        return this.http
        .get<{ [key: string]: PlaceData }> (
            'https://fidelity-database.firebaseio.com/places.json'
        )
        .pipe(

            map( response => {
                const places = [];
                for ( const key in response ) {
                    if ( response.hasOwnProperty(key) ) {
                        places.push (
                            new Place (
                                key,
                                response[key].title,
                                response[key].image,
                                response[key].score
                            )
                        )
                    }
                }
                return places;
            }),
            
            tap( places => {
                this._places.next(places)
            })

        )
    }

    
    addPlace( title: string, score: number) {
        let firebaseId: string;

        const newPlace = new Place (
          null, // Math.random().toString(),
          title,
          'https://static.thenounproject.com/png/1174579-200.png',
          score
        );

        return this.http
            .post<{ name: string }> (
                'https://fidelity-database.firebaseio.com/places.json',
                { ...newPlace }
            )
            .pipe (
                switchMap(response => {
                    firebaseId = response.name;
                    return this.getPlaces;
                }),
            
                take(1),
                
                tap ( places => {
                    newPlace.id = firebaseId;
                    this._places.next(places.concat(newPlace));
            })
          );
      }
}