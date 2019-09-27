import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Place } from '../model/place.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product.model';


@Injectable({ providedIn: 'root' })

export class DBService {
    
    private places: Place[];
    private placeSubject = new BehaviorSubject<Place[]>([]);
    private baseUrl = 'https://my-dummy-database.firebaseio.com/restaurants.json';


    constructor( private http: HttpClient ) {}

        
    get getPlaces(): Observable<Place[]> {
        return this.placeSubject.asObservable();
    }


    getProducts(selectedPlace: string) {
        for ( let place of this.places ) {
            if ( place.title === selectedPlace ) {
                return place.products ? place.products : [];
            }
        }
    }


    insertPlace( newPlace: Place ) {
        return this.http.post( this.baseUrl, { ...newPlace } )
    }

    
    updatePlaces(places: Place[]) {
        return this.http.put( this.baseUrl, places )
    }


    updateProducts(paramPlace: string, product: Product) {

        let products: Product[];

        for ( let place of this.places ) {

            if ( place.title === paramPlace ) {

                products = place.products ? place.products : [];
                products.push(product);

                let updatedPlace = {
                    ...place,
                    products: products
                }

                place = updatedPlace;

                return this.http.put( this.baseUrl, this.places )

            }

        }

    }
    

    fetchPlaces() {
        return this.http
        .get<Place[]>(this.baseUrl)
        .pipe(
            map( places => {
                const fetchedPlaces = [];

                for ( const key in places ) {
                    fetchedPlaces.push( {...places[key]} );
                }

                this.places = fetchedPlaces;
                return this.places;
            }),
            tap( places => {
                this.placeSubject.next(places)
            })
        )
    }
}
