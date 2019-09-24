import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Place } from '../shared/place.model';
import { PlaceService } from '../shared/place.service';
import { PromotionService } from '../shared/promotion.service';
import { Promotion } from '../shared/promotion.model';

@Component({
  selector: 'app-user-score',
  templateUrl: './user-score.page.html'
})
export class UserScorePage implements OnInit {
    private places: Place[];
    private promotions: Promotion[];
    private isLoadingPlaces: boolean;
    private isLoadingPromotions: boolean;
    private placeSubscription: Subscription;
    private promotionSubscription: Subscription;


    constructor(
        private placeService: PlaceService,
        private promotionService: PromotionService
    ) { }


    ionViewDidEnter() {
        this.isLoadingPlaces = true;
        this.placeService.fetchPlaces().subscribe(response => {
            this.isLoadingPlaces = false;
            console.log(response)
        });
        
        this.isLoadingPromotions = true;
        this.promotionService.fetchData().subscribe(() => {
            this.isLoadingPromotions = false;
        });
    }


    ngOnInit() {
        this.placeSubscription = this.placeService.getPlaces.subscribe(response => {
            this.places = response;
        });

        this.promotionSubscription = this.promotionService.getPromotions.subscribe(response => {
            this.promotions = response;
        });
    }
    

    hasPromotion ( placeId: string ) {
        let promotions = this.promotions;

        for ( let key in promotions ) {
            if ( promotions[key].store === placeId ) {
                return true;
            }
        }

        return false;
    }

}
