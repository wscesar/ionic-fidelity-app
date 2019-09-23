import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Place } from '../shared/place.model';
import { Promotion } from '../shared/promotion.model';
import { PlaceService } from '../shared/place.service';
import { PromotionService } from '../shared/promotion.service';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
    styleUrls: ['./place-detail.page.sass'],
})
export class PlaceDetailPage implements OnInit {

    private subscription: Subscription;
    paramPlace: string;
    places: Place[];
    promotions: Promotion[];
    lenght: number = 0;
    arr: [];

    constructor (
        private route: ActivatedRoute,
        private placeService: PlaceService,
        private promotionService: PromotionService
    ) { }

    ionViewWillEnter() {
        this.placeService.fetchPlaces().subscribe(() => {
        //   this.isLoading = false;
        });
    }

    ngOnInit() {

        // this.subscription = this.placeService.getPlaces.subscribe(places => {
        //     console.log(places)
        // });

        this.paramPlace = this.route.snapshot.paramMap.get("store");
        this.promotions = this.promotionService.promotions;
        this.places = this.placeService.places;
    }

    calcLenght() {
        let n = 0;
        for ( let i = 0 ; i < this.promotions.length ; i++ ) {
            if ( this.promotions[i].store === this.paramPlace ) {
                n++;
            }
        }
        return n;
    }

}
