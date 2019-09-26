import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Place } from '../model/place.model';
import { Product } from '../model/product.model';
import { PlaceService } from '../shared/place.service';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
})
export class PlaceDetailPage implements OnInit {

    private paramPlace: string;
    private place: Place;
    private products: Product[];
    private isLoading: boolean;
    private placeSubscription: Subscription;

    constructor (
        private route: ActivatedRoute,
        private placeService: PlaceService,
    ) { }

    ngOnInit() {

        this.paramPlace = this.route.snapshot.paramMap.get("place");

        this.placeSubscription = this.placeService.getPlaces.subscribe(places => {
            places.forEach( place => {
                if ( place.title === this.paramPlace ) {
                    this.place = place;
                }
            });
        });

    }

    ionViewWillEnter() {
        
        this.isLoading = true;
        
        this.placeService.fetchPlaces().subscribe(() => {
            this.products = this.placeService.getProducts(this.paramPlace);
            this.isLoading = false;
        });

    }

}
