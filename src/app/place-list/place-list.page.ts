import { Component, OnInit } from '@angular/core';
import { Place } from '../model/place.model';
import { DBService } from '../services/db.service';
import { UiManagerService } from '../services/ui-manager.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.page.html'
})
export class PlaceListPage implements OnInit {
    private places: Place[];
    private isLoading: boolean = true;

    constructor( 
        private dbService: DBService,
        private uiManager: UiManagerService ) { }

    ngOnInit() {
        this.isLoading = true;
        this.dbService.getRestaurants().subscribe(places => {
            this.isLoading = false;
            this.places = places;
        });
        // this.authService
        //         .signUp('teste@bbi.com', 'comfoodbbi13')
        //         .subscribe(
        //             res =>{
        //                 console.log(res)
        //             },

        //             err =>{
        //                 console.log(err)
        //             },

        //         )
    }

    onEdit(placeTitle: string) {
        this.uiManager.navigateTo('/restaurante/'+placeTitle+'/editar');
    }

}
