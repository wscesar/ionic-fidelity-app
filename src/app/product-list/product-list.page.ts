import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Product } from '../model/product.model';
import { Place } from '../model/place.model';
import { DBService } from '../services/db.service';


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
        private dbService: DBService,
    ) { }

    ionViewWillEnter() {
        this.isLoading = true;
        this.dbService
                .fetchPlaces()
                .subscribe( () => this.isLoading = false );
    }

    ngOnInit() {
        this.placeSubscription = this.dbService.getPlaces.subscribe(places => {
            this.setPageProducts(places);
        });
    }

    private setPageProducts(places: Place[]): void {

        this.products = [];
        
        for ( let place of places ) {
            for ( let product of place.products ) {
                this.products.push( product );
            }
        }

    }

}
