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
    styleUrls: ['./place-detail.page.sass'],
})
export class PlaceDetailPage implements OnInit {

    private subscription: Subscription;
    private paramPlace: string;
    private place: Place;
    private places: Place[];
    private products: Product[];
    private isLoadingPlaces: boolean;
    private isLoadingProducts: boolean;
    private placeSubscription: Subscription;
    private productSubscription: Subscription;

    constructor (
        private route: ActivatedRoute,
        private placeService: PlaceService,
        private productService: ProductService
    ) { }

    ionViewWillEnter() {
        this.isLoadingPlaces = true;
        this.placeService.fetchPlaces().subscribe(() => {
            this.isLoadingPlaces = false;
        });
        
        this.isLoadingProducts = true;
        this.productService.fetchData().subscribe(() => {
            this.isLoadingProducts = false;
        });
    }

    ngOnInit() {

        this.paramPlace = this.route.snapshot.paramMap.get("place");

        this.placeSubscription = this.placeService.getPlaces.subscribe(response => {
            this.places = response;
            response.find( place => {
                if ( place.title === this.paramPlace ) {
                    this.place = place;
                    return false;
                }
            });
        });

        this.productSubscription = this.productService.getProducts.subscribe(response => {
            this.products = response;
        });

    }

}
