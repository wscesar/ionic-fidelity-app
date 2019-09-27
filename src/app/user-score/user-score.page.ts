import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Place } from '../model/place.model';
import { DBService } from '../services/db.service';

@Component({
  selector: 'app-user-score',
  templateUrl: './user-score.page.html'
})
export class UserScorePage implements OnInit {
    private places: Place[];
    private isLoading: boolean;
    private placeSubscription: Subscription;

    constructor( private dbService: DBService ) { }

    ionViewDidEnter() {
        this.isLoading = true;
        this.dbService.fetchPlaces().subscribe(() => this.isLoading = false );
    }

    ngOnInit() {
        this.placeSubscription =
                this.dbService.getPlaces
                        .subscribe( places => this.places = places );
    }

}
