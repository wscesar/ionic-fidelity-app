import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Place } from '../model/place.model';
import { DBService } from '../services/db.service';
import { UiManagerService } from '../services/ui-manager.service';

@Component({
  selector: 'app-user-score',
  templateUrl: './user-score.page.html'
})
export class UserScorePage implements OnInit {
    private places: Place[];
    private isLoading: boolean;
    private placeSubscription: Subscription;

    constructor( 
        private dbService: DBService,
        private uiManager: UiManagerService ) { }

    ionViewDidEnter() {
        this.isLoading = true;
        // this.dbService.fetchPlaces().subscribe(() => this.isLoading = false );
        this.dbService.getRestaurants().subscribe(places => {
            this.isLoading = false;
            this.places = places;
        });
    }

    ngOnInit() {
        // this.placeSubscription =
        //         this.dbService.getPlaces
        //                 .subscribe( places => this.places = places );
    }

    onEdit(placeTitle: string) {
        this.uiManager.navigateTo('/restaurante/'+placeTitle+'/editar');
    }

}
