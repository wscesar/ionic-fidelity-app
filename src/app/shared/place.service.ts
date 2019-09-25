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

    constructor(private http: HttpClient, private navCtrl: NavController) {}

    fetchPlaces() {
        return this.http
        .get<{ [key: string]: Place }> (
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
                                response[key].openingTime,
                                response[key].closingTime,
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

    
    addPlace( title: string, image: string,
                openingTime: string, closingTime: string, score: number) {
        
        let firebaseId: string;

        const newPlace = new Place (
            null,
            title,
            image,
            openingTime,
            closingTime,
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