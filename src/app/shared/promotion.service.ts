import { Injectable } from '@angular/core';
import { Promotion } from './promotion.model';
import { HttpClient } from 'selenium-webdriver/http';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


interface PromotionData {
    id: string;
    title: string;
    image: string;
    score: number;
}

@Injectable({
    providedIn: 'root'
})
export class PromotionService {
    
    private _promotions = new BehaviorSubject<Promotion[]>([]);

    get getPromotions() {
        return this._promotions.asObservable();
    }
    
    promotions: Promotion[] = [
        
        new Promotion(
            'Rocket',
            'Chopp',
            50,
            'http://tribunadacerveja.com.br/wp-content/uploads/2016/12/Chopp-Weiss-3.jpg'
        ),

        new Promotion(
            'Rocket',
            'Batata Frita',
            50,
            'https://comidinhasdochef.com/wp-content/uploads/2018/06/Batata-Frita-de-Lanchonete.jpg'
        ),
        
        new Promotion(
            'Brunholi',
            'Vinho',
            30,
            'http://www.territoriodovinho.com.br/files/01.jpg'
        ),

        new Promotion(
            'Tchilis',
            'Taco',
            15,
            'https://d1doqjmisr497k.cloudfront.net/-/media/mccormick-us/recipes/mccormick/f/800/fiesta_tacos_800x800.jpg'
        ),
    ]

    constructor() {}

    

}