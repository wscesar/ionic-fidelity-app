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

    paramPlace: string;
    place: Place;
    promotions: Promotion[];
    lenght: number = 0;
    arr: [];

    constructor (
        private route: ActivatedRoute,
        private placeService: PlaceService,
        private promotionService: PromotionService
    ) { }

    ngOnInit() {

        this.paramPlace = this.route.snapshot.paramMap.get("place");
        
        this.promotions = this.promotionService.promotions;

        this.place = this.placeService.places.find(
            place => place.title === this.paramPlace
        );

    }

}
