import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, of, Observable } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { Place } from '../model/place.model';
import { NavController, AlertController } from '@ionic/angular';
import { Product } from '../model/product.model';

@Injectable({
    providedIn: 'root'
})
export class PlaceService {
    
    private places: Place[];
    private updatedProducts: Product[];
    private placeSubject = new BehaviorSubject<Place[]>([]);
    private baseUrl = 'https://my-dummy-database.firebaseio.com/restaurants.json';

    constructor(
        private http: HttpClient,
        private navCtrl: NavController,
        private alertCtrl: AlertController ) { }
    
    get getPlaces(): Observable<Place[]> {
        return this.placeSubject.asObservable();
    }

    fetchPlaces() {
        return this.http
        .get<Place[]>(this.baseUrl)
        .pipe(
            map( _places => {

                const newPlaces = [];

                for ( const key in _places ) {
                    newPlaces.push (
                        new Place (
                            key,
                            _places[key].title,
                            _places[key].image,
                            _places[key].openingTime,
                            _places[key].closingTime,
                            _places[key].score,
                            _places[key].products
                        )
                    )
                }

                this.places = newPlaces;
                return this.places;
            }),
            
            tap( places => {
                this.placeSubject.next(places)
                // this.placeService.setRecipes(places);
            })
            
        )
    }

    getProducts(selectedPlace: string) {
        for ( let i in this.places ) {
            if ( this.places[i].title === selectedPlace ) {
                return this.places[i].products ? this.places[i].products : [];
            }
        }
    }

    updateProducts(paramPlace: string, product: Product) {

        for ( let key in this.places ) {

            if ( this.places[key].title === paramPlace ) {

                let place = this.places[key];
                this.updatedProducts = place.products ? place.products : [];
                this.updatedProducts.push(product);

                let updatedPlace = {
                    ...place,
                    products: this.updatedProducts
                }

                this.places[key] = updatedPlace;

                this.updatePlaces()

            }
        }

    }

    
    updatePlaces() {
        this.http
            .put( this.baseUrl, this.places )
            .subscribe( () => {
                this.alertCtrl
                        .create({
                            header: 'Ok',
                            message: 'Produto cadastrada com sucesso'
                        })
                        .then(alertEl => {
                            alertEl.present();
                            this.navCtrl.navigateBack('/');
                        });
            });
    }
    
   
    addPlace( newPlace: Place ) {
        
        let firebaseId: string;

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
                    this.placeSubject.next(places.concat(newPlace));
                })
            );
      }
}