import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Place } from '../model/place.model';
import { BehaviorSubject, Observable, Subscriber, Subscribable } from 'rxjs';
import { Product } from '../model/product.model';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';


@Injectable({ providedIn: 'root' })

export class DBService {
    restaurants: Observable<any[]>;

    private places: Place[];
    private placeSubject = new BehaviorSubject<Place[]>([]);
    private baseUrl = 'https://my-dummy-database.firebaseio.com/restaurants.json';


    constructor (
        private db: AngularFirestore,
        private http: HttpClient ) {
        }

        
    get getPlaces(): Observable<Place[]> {
        return this.placeSubject.asObservable();
    }

    getRestaurants() {
        return this.db
                    .collection('Restaurants')
                    .snapshotChanges()
                    .pipe (
                        map ( ( places: DocumentChangeAction<any>[] ) => {
                            return places.map((a: DocumentChangeAction<any>) => {
                                // const data: Object = a.payload.doc.data() as any;
                                const data = a.payload.doc.data();
                                const id = a.payload.doc.id;
                                return { ...data, id };
                            });
                        }),
                    );
    }

    getRestaurant(x: string) {
        return this.db
                    .doc('Restaurants/'+x)
                    .valueChanges()
                    // .pipe (
                    //     map ( ( places: DocumentChangeAction<any>[] ) => {
                    //         return places.map((a: DocumentChangeAction<any>) => {
                    //             const data = a.payload.doc.data();
                    //             const id = a.payload.doc.id;
                    //             return { ...data, id };
                    //         });
                    //     }),
                    // );
    }

    getProducts2(x: string) {
        return this.db
                    .collection('Restaurants/'+x+'/products')
                    .snapshotChanges()
                    .pipe (
                        map ( ( places: DocumentChangeAction<any>[] ) => {
                            return places.map((a: DocumentChangeAction<any>) => {
                                const data = a.payload.doc.data();
                                const id = a.payload.doc.id;
                                return { ...data, id };
                            });
                        }),
                    );
    }

    addRestaurant(place: Place) {
        return this.db.collection('Restaurants').add(place)
    }

    updateRestaurant(id: string, place: Place) {
        return this.db.collection('Restaurants').doc(id).update(place)
    }


    getProducts(selectedPlace: string) {
        for ( let place of this.places ) {
            if ( place.title === selectedPlace ) {
                return place.products ? place.products : [];
            }
        }
    }


    deletePlace(  ) {
        return this.http.delete( this.baseUrl )
    }


    
    insertPlace( newPlace: Place ) {
        let x: Subscribable<any>;
        
        
        for ( let i in this.places ) {
            let place = this.places[i]
            
            if ( place.title === newPlace.title ) {
                return x
            }
        }
        
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
