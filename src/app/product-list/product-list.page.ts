import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { Product } from '../model/product.model';
import { PlaceService } from '../shared/place.service';
import { Place } from '../model/place.model';


@Component({
    selector: 'app-products',
    templateUrl: './product-list.page.html'
})
export class ProductListPage implements OnInit {

    private isLoading: boolean;
    private places: Place[];
    private products: Product[];
    private placeSubscription: Subscription;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private placeService: PlaceService
    ) { }

    ionViewWillEnter() {
        this.isLoading = true;
        this.placeService
                .fetchPlaces()
                .subscribe( () => this.isLoading = false );
    }

    ngOnInit() {
        this.placeSubscription = this.placeService.getPlaces.subscribe(places => {
            this.setPageProducts(places);
        });
    }

    private setPageProducts(places: Place[]): void {

        this.products = [];

        places.forEach( place => {
            place.products.forEach( product =>{
                this.products.push( product );
            })
        })

    }

}
