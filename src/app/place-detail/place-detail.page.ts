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
    private paramPlace: string;
    private place: Place;
    private places: Place[];
    private promotions: Promotion[];
    private isLoadingPlaces: boolean;
    private isLoadingPromotions: boolean;
    private placeSubscription: Subscription;
    private promotionSubscription: Subscription;

    constructor (
        private route: ActivatedRoute,
        private placeService: PlaceService,
        private promotionService: PromotionService
    ) { }

    ionViewWillEnter() {
        this.isLoadingPlaces = true;
        this.placeService.fetchPlaces().subscribe(() => {
            this.isLoadingPlaces = false;
        });
        
        this.isLoadingPromotions = true;
        this.promotionService.fetchData().subscribe(() => {
            this.isLoadingPromotions = false;
        });
    }

    foo() {
        this.places.find( place => {
            if ( place.title === this.paramPlace ) {
                this.place = place;
                return false;
            }
        });
    }

    ngOnInit() {

        this.paramPlace = this.route.snapshot.paramMap.get("place");

        this.placeSubscription = this.placeService.getPlaces.subscribe(response => {
            this.places = response;
            this.foo()
            // response.find( place => {
            //     if ( place.title === this.paramPlace ) {
            //         this.place = place;
            //     }
            // });
        });



        // this.promotions = this.promotionService.promotions;
        this.promotionSubscription = this.promotionService.getPromotions.subscribe(response => {
            this.promotions = response;
        });

    }

}
