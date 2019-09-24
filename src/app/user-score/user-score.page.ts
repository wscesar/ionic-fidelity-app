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
  private subscription: Subscription;

  places: Place[];
  promotions: Promotion[];

  constructor(
    private placeService: PlaceService,
    private promotionService: PromotionService
  ) { }

    // ionViewWillEnter() {
    //     this.placeService.fetchPlaces().subscribe(() => {
    //     });
    // }

    ngOnInit() {
        this.places = this. placeService.places;
        // this.subscription =  this.placeService.getPlaces.subscribe(places => {
        //     this.places = places;
        // })

        this.promotions = this.promotionService.promotions;
    }

    hasPromotion ( placeId: string ) {
        let promotions = this.promotions;

        for ( let key in promotions ) {
            if (promotions[key].store === placeId) {
                return true;
            }
        }

        return false;
    }

}
