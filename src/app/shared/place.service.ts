import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { Place } from './place.model';
import { NavController } from '@ionic/angular';

interface DataModel {
    id: string;
    title: string;
    image: string;
    score: number;
}

@Injectable({
    providedIn: 'root'
})
export class PlaceService {
    
    private baseUrl = 'https://my-dummy-database.firebaseio.com/places.json';
    private _places = new BehaviorSubject<Place[]>([]);
    
    get getPlaces() {
        return this._places.asObservable();
    }
    
    private places: Place[];
    // places: Place[] = [
    //     new Place(
    //         '1',
    //         'Yellow',
    //         'https://pbs.twimg.com/profile_images/471051324214501376/NEQcE5pB.jpeg',
    //         80
    //     ),
    //     new Place(
    //         '2',
    //         'Rocket',
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMuHkr3Oh4CxWWEacZZ6xREC2ACqtMjMgpxQqxIW1SOYI31eMjsw',
    //         50
    //     ),
    //     new Place(
    //         '3',
    //         'Brunholi',
    //         'https://static.thenounproject.com/png/340719-200.png',
    //         30
    //     ),
    //     new Place(
    //         '4',
    //         'Tchilis',
    //         'http://tchilis.com.br/wp-content/uploads/2017/02/logo.png',
    //         30
    //     )
    // ]

    constructor(private http: HttpClient, private navCtrl: NavController) {}

    fetchPlaces() {
        return this.http
        .get<{ [key: string]: DataModel }> (
            this.baseUrl
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

                this.places = places;
                return places;
            }),
            
            tap( places => {
                this._places.next(places)
            })
            
        )
    }


    updatePlaces() {
        this.http
            .put( this.baseUrl, this.places )
            .subscribe( response => {
                this.navCtrl.navigateBack('/')
                console.log(response)
            });
    }


    setPlaces(places: Place[]) {
        this.places = places;
    }

    
    addPlace( title: string, image: string, score: number) {
        let firebaseId: string;

        const newPlace = new Place (
            null,
            title,
            image,
            score
        );

        return this.http
            .post<{ name: string }> (
                this.baseUrl,
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