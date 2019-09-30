import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Place } from '../model/place.model';
import { Product } from '../model/product.model';
import { DBService } from '../services/db.service';

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
    styleUrls: ['./place-detail.page.sass'],
})
export class PlaceDetailPage implements OnInit {

    restaurantTitle: string
    restaurantImage: string
    private paramPlace: string;

    private place: Place;
    private products: Product[];
    private isLoading: boolean;
    private placeSubscription: Subscription;

    constructor (
        private route: ActivatedRoute,
        private dbService: DBService
    ) {}
    
    id: string

    ngOnInit() {

        this.paramPlace = this.route.snapshot.paramMap.get("place");
        this.id = this.paramPlace

    }

    ionViewWillEnter() {
        this.isLoading = true;

        this.dbService.getProducts(this.paramPlace).subscribe(products => {
            this.products = products;
            this.isLoading = false;
        });

        this.dbService.getRestaurant(this.paramPlace).subscribe(restaurant => {
            this.place = restaurant
            this.restaurantTitle = restaurant.title
            this.restaurantImage = restaurant.image
            this.isLoading = false;
        });
    }

}
