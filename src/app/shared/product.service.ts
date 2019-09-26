import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { Product } from './product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    
    private baseUrl = 'https://my-dummy-database.firebaseio.com/promotions.json';
    private _products = new BehaviorSubject<Product[]>([]);
    private products: Product[];
    
    get getProducts(): Observable<Product[]> {
        return this._products.asObservable();
    }
    
    constructor(private http: HttpClient) {}


    setProducts(products: Product[]) {
        this.products = products;
    }

    updateProducts() {
        this.http
                .put( 
                    this.baseUrl,
                    this.products
                )
                .subscribe(
                    response => { console.log(response) }
                );
    }

    fetchData() {
        return this.http
        .get<Product[]>(this.baseUrl)
        .pipe(
            map( _products => {

                const products = [];
                
                for ( const key in _products ) {
                    products.push (
                        new Product (
                            _products[key].store,
                            _products[key].title,
                            _products[key].score,
                            _products[key].image,
                        )
                    )
                }

                return products;
            }),
            
            tap( response => {
                this._products.next(response)
            })

        )
    }

    

}