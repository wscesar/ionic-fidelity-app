import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';

import { Place } from '../model/place.model';
import { Product } from '../model/product.model';

@Injectable({ providedIn: 'root' })
export class DBService {

    constructor (private db: AngularFirestore ) {}

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
