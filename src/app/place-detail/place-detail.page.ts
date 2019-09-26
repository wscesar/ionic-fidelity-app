import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Place } from '../shared/place.model';
import { Product } from '../shared/product.model';
import { PlaceService } from '../shared/place.service';
import { ProductService } from '../shared/product.service';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
})
export class PlaceDetailPage implements OnInit {

    private paramPlace: string;
    private place: Place;
    private places: Place[];
    private products: Product[];
    private isLoading: boolean;
    private placeSubscription: Subscription;
    private productLength: number;

    constructor (
        private route: ActivatedRoute,
        private placeService: PlaceService,
    ) { }

    ngOnInit() {

        this.paramPlace = this.route.snapshot.paramMap.get("place");

        this.placeSubscription = this.placeService.getPlaces.subscribe(places => {

            this.places = places;

            this.places.find( place => {
                if ( place.title === this.paramPlace ) {
                    this.place = place;
                    return false;
                }
            });

        });

    }

    ionViewWillEnter() {

        this.isLoading = true;

        this.placeService.fetchPlaces().subscribe(() => {
            
            this.productLength = 0;

            this.products = this.placeService.getProducts(this.paramPlace);

            for ( let key in this.products ) {
                this.productLength++;
            }

            this.isLoading = false;

        });
        
    }

}
