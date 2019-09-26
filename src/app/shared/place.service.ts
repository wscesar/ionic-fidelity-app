import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, of, Observable } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { Place } from './place.model';
import { NavController } from '@ionic/angular';
import { Product } from './product.model';

@Injectable({
    providedIn: 'root'
})
export class PlaceService {
    
    private baseUrl = 'https://my-dummy-database.firebaseio.com/restaurants.json';
    private _places = new BehaviorSubject<Place[]>([]);
    private places: Place[];

    productss: Product[];
    updatedProducts: Product[];
    
    get getPlaces(): Observable<Place[]> {
        return this._places.asObservable();
    }

    setPlaces(places: Place[]) {
        this.places = places;
    }

    // getProducts() {
    //     return this.products;
    // }

    // setProducts(products: Product[]) {
    //     this.products = products;
    // }
  
    constructor(private http: HttpClient, private navCtrl: NavController) {}

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
                this._places.next(places)
                // this.placeService.setRecipes(places);
            })
            
        )
    }

    getProducts(selectedPlace: string): Product[] {
        for ( let key in this.places ) {
            if ( this.places[key].title === selectedPlace ) {
                let place = this.places[key];
                let products = place.products ? place.products : [];
                return products;
            }
        }
        return [];
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
            .subscribe( response => {
                this.navCtrl.navigateBack('/')
                console.log(response)
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
                    this._places.next(places.concat(newPlace));
                })
            );
      }
}