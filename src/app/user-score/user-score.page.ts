import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Place } from '../shared/place.model';
import { PlaceService } from '../shared/place.service';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-user-score',
  templateUrl: './user-score.page.html'
})
export class UserScorePage implements OnInit {
    private places: Place[];
    private products: Product[];
    private isLoadingPlaces: boolean;
    private isLoadingProducts: boolean;
    private placeSubscription: Subscription;
    private productSubscription: Subscription;


    constructor(
        private placeService: PlaceService,
        private productService: ProductService
    ) { }


    ionViewDidEnter() {
        this.isLoadingPlaces = true;
        this.placeService.fetchPlaces().subscribe(response => {
            this.isLoadingPlaces = false;
        });
        
        this.isLoadingProducts = true;
        this.productService.fetchData().subscribe(() => {
            this.isLoadingProducts = false;
        });
    }


    ngOnInit() {
        this.placeSubscription = this.placeService.getPlaces.subscribe(response => {
            this.places = response;
        });

        this.productSubscription = this.productService.getProducts.subscribe(response => {
            this.products = response;
        });
    }
    

    hasProduct ( placeId: string ) {
        let products = this.products;

        for ( let key in products ) {
            if ( products[key].store === placeId ) {
                return true;
            }
        }

        return false;
    }

}
