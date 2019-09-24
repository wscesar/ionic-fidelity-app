import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { Promotion } from './promotion.model';

interface DataModel {
    store: string,
    title: string,
    score: number,
    image: string
}

@Injectable({
    providedIn: 'root'
})
export class PromotionService {
    
    private baseUrl = 'https://my-dummy-database.firebaseio.com/promotions.json';
    private _promotions = new BehaviorSubject<Promotion[]>([]);
    
    get getPromotions() {
        return this._promotions.asObservable();
    }

    private promotions: Promotion[];
    // promotions: Promotion[] = [
        
    //     new Promotion(
    //         'Rocket',
    //         'Chopp',
    //         50,
    //         'http://tribunadacerveja.com.br/wp-content/uploads/2016/12/Chopp-Weiss-3.jpg'
    //     ),

    //     new Promotion(
    //         'Rocket',
    //         'Batata Frita',
    //         50,
    //         'https://comidinhasdochef.com/wp-content/uploads/2018/06/Batata-Frita-de-Lanchonete.jpg'
    //     ),
        
    //     new Promotion(
    //         'Brunholi',
    //         'Vinho',
    //         30,
    //         'http://www.territoriodovinho.com.br/files/01.jpg'
    //     ),

    //     new Promotion(
    //         'Tchilis',
    //         'Taco',
    //         15,
    //         'https://d1doqjmisr497k.cloudfront.net/-/media/mccormick-us/recipes/mccormick/f/800/fiesta_tacos_800x800.jpg'
    //     ),
    // ]
    
    constructor(private http: HttpClient) {}


    setPromotions(promotions: Promotion[]) {
        this.promotions = promotions;
    }

    updatePromotions() {
        this.http
                .put( 
                    this.baseUrl,
                    this.promotions
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

                const promotions = [];
                
                for ( const key in response ) {
                    if ( response.hasOwnProperty(key) ) {
                        promotions.push (
                            new Promotion (
                                // key,
                                response[key].store,
                                response[key].title,
                                response[key].score,
                                response[key].image,
                            )
                        )
                    }
                }

                return promotions;
            }),
            
            tap( response => {
                this._promotions.next(response)
            })

        )
    }

    

}