import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Place } from '../model/place.model';
import { Product } from '../model/product.model';
import { DBService } from '../services/db.service';

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
        private dbService: DBService
    ) {}

    ngOnInit() {

        this.paramPlace = this.route.snapshot.paramMap.get("place");

        this.placeSubscription = this.dbService.getPlaces.subscribe(places => {
            for ( let place of places ) {
                if ( place.title === this.paramPlace ) {
                    this.place = place;
                }
            }
        });

    }

    ionViewWillEnter() {
        this.isLoading = true;
        
        this.dbService.fetchPlaces().subscribe(() => {
            this.products = this.dbService.getProducts(this.paramPlace);
            this.isLoading = false;
        });
    }

}
