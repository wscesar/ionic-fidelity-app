import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { Product } from './product.model';

interface DataModel {
    store: string,
    title: string,
    score: number,
    image: string
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    
    private baseUrl = 'https://my-dummy-database.firebaseio.com/promotions.json';
    private _products = new BehaviorSubject<Product[]>([]);
    
    get getProducts() {
        return this._products.asObservable();
    }

    private products: Product[];
    // products: Product[] = [
        
    //     new Product(
    //         'Rocket',
    //         'Chopp',
    //         50,
    //         'http://tribunadacerveja.com.br/wp-content/uploads/2016/12/Chopp-Weiss-3.jpg'
    //     ),

    //     new Product(
    //         'Rocket',
    //         'Batata Frita',
    //         50,
    //         'https://comidinhasdochef.com/wp-content/uploads/2018/06/Batata-Frita-de-Lanchonete.jpg'
    //     ),
        
    //     new Product(
    //         'Brunholi',
    //         'Vinho',
    //         30,
    //         'http://www.territoriodovinho.com.br/files/01.jpg'
    //     ),

    //     new Product(
    //         'Tchilis',
    //         'Taco',
    //         15,
    //         'https://d1doqjmisr497k.cloudfront.net/-/media/mccormick-us/recipes/mccormick/f/800/fiesta_tacos_800x800.jpg'
    //     ),
    // ]
    
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
        .get<{ [key: string]: DataModel }> (
            this.baseUrl
        )
        .pipe(

            map( response => {

                const products = [];
                
                for ( const key in response ) {
                    if ( response.hasOwnProperty(key) ) {
                        products.push (
                            new Product (
                                // key,
                                response[key].store,
                                response[key].title,
                                response[key].score,
                                response[key].image,
                            )
                        )
                    }
                }

                return products;
            }),
            
            tap( response => {
                this._products.next(response)
            })

        )
    }

    

}