import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Place } from '../model/place.model';
import { PlaceService } from '../shared/place.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-user-score',
  templateUrl: './user-score.page.html'
})
export class UserScorePage implements OnInit {
    private places: Place[];
    private isLoading: boolean;
    private placeSubscription: Subscription;

    constructor( private placeService: PlaceService ) { }

    ionViewDidEnter() {
        this.isLoading = true;
        this.placeService.fetchPlaces().subscribe(() => this.isLoading = false );
    }

    ngOnInit() {
        this.placeSubscription =
                this.placeService.getPlaces
                        .subscribe( places => this.places = places );
    }

}
