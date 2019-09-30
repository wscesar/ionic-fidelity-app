import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import * as firebase from 'firebase';

import { Place } from '../model/place.model';
import { BehaviorSubject, Observable, Subscriber, Subscribable } from 'rxjs';
import { Product } from '../model/product.model';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';


// interface productModel {
//     title: string,
//     score: number,
//     image: string
// }
export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class DBService {
    restaurants: Observable<any[]>;

    private places: Place[];
    private product: Product;
    // private baseUrl = 'https://my-dummy-database.firebaseio.com/restaurants.json';
    private signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCP3Zn7rkATaRdv_oIan2JHcS8YtDfJecc'
    private signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCP3Zn7rkATaRdv_oIan2JHcS8YtDfJecc'
    private token: string = null;

    constructor (
        private db: AngularFirestore,
        private http: HttpClient ) {}

    signIn( email: string, password: string ) {
        // return this.http.post( this.signInUrl, { email, password } )
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorMessage)
            
        });
    }
    
    signUp( email: string, password: string ) {
        return this.http.post( this.signUpUrl, { email, password } )
    }

    setToken(token: string) {
        this.token = token;
    }

    getRestaurants() {
        return this.db
                    .collection<Place[]>('Restaurants')
                    .snapshotChanges()
                    .pipe (
                        map ( ( docArray: DocumentChangeAction<any>[] ) => {
                            return docArray.map((doc: DocumentChangeAction<any>) => {
                                const data: Place = doc.payload.doc.data();
                                const id = doc.payload.doc.id;
                                return { ...data, id };
                            });
                        }),
                    );
    }

    getRestaurant(restaurantId: string) {
        return this.db
                    .doc<Place>('Restaurants/'+restaurantId)
                    .snapshotChanges()
                    .pipe (
                        map ( doc => {
                            const data = doc.payload.data()
                            const id = doc.payload.id;
                            const products = null
                            return { ...data, id, products };
                        })
                    );
    }

    getProducts(restaurantId: string) {
        return this.db
                    .collection('Restaurants/' + restaurantId + '/products')
                    .snapshotChanges()
                    .pipe (
                        map ( ( docArray: DocumentChangeAction<any>[] ) => {
                            return docArray.map( ( doc: DocumentChangeAction<any> ) => {
                                // const data: productModel= doc.payload.doc.data();
                                const data: Product = doc.payload.doc.data();
                                const id = doc.payload.doc.id;
                                return {...data, id};
                            });
                        }),
                    );
    }

    getProduct(restaurantId: string, productId: string) {
        return this.db
                    .doc<Product>('Restaurants/'+restaurantId+'/products/'+productId)
                    .snapshotChanges()
                    .pipe (
                        map ( doc => {
                            const data = doc.payload.data()
                            const id = doc.payload.id;
                            return { ...data, id };
                        })
                    );
    } 

    addRestaurant(place: Place) {
        return this.db.collection('Restaurants').add(place)
    }

    updateRestaurant(id: string, place: Place) {
        return this.db.collection('Restaurants').doc(id).update(place)
    }

    deletePlace(id: string) {
        return this.db.collection('Restaurants').doc(id).delete()
    }

    addProduct(restaurantId: string, product: Product) {
        return this.db
                    .collection(`Restaurants/${restaurantId}/products/`)
                    .add(product)
    }

    updateProduct(restaurantId: string, productId: string, place: Place) {
        return this.db
                    .doc(`Restaurants/${restaurantId}/products/${productId}`)
                    .update(place)
    }

    deleteProduct(restaurantId: string, productId: string) {
        return this.db
                    .doc(`Restaurants/${restaurantId}/products/${productId}`)
                    .delete()
    }

}
