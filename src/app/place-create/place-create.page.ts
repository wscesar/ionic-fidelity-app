import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Place } from '../model/place.model';
import { DBService } from '../services/db.service';
import { UiManagerService } from '../services/ui-manager.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-place-create',
  templateUrl: './place-create.page.html',
})
export class PlaceCreatePage implements OnInit {
    form: FormGroup;
    action: string;
    placeTitle: string;
    places: Place[];

    constructor(
        private dbService: DBService,
        private route: ActivatedRoute,
        private uiManager: UiManagerService ) {}
  
    ngOnInit() {
        this.dbService.getRestaurants().subscribe(x => {
            console.log(x)
            // console.log(x.payload.doc)
            // console.log(x)
            // console.log(x)
        })
        
        this.form = new FormGroup({
            place: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),

            image: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),

            openingTime: new FormControl(null, {
                updateOn: 'blur',
                // validators: [Validators.required]
            }),

            closingTime: new FormControl(null, {
                updateOn: 'blur',
                // validators: [Validators.required]
            }),

            score: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),
        });
    }

    ionViewDidEnter() {
        this.form.reset();
        this.action = this.route.snapshot.paramMap.get("action");
       
        if (this.action === 'editar') {
            
            this.placeTitle = this.route.snapshot.paramMap.get("place");
            
            // this.dbService.getRestaurants.subscribe( places => this.places = places );

            // for ( let place of this.places ) {
            //     if ( place.title === this.placeTitle ) {
            //         this.form.patchValue({
            //             place: place.title,
            //             image: place.image,
            //             openingTime: place.openingTime,
            //             closingTime: place.closingTime,
            //             score: place.score,
            //         })
            //     }
            // }
            
        }
    }

    onSubmit() {
        if ( !this.form.valid )
            return;
        else
            this.uiManager.showLoading();
        
        // if (this.action === 'editar')
        //     this.onUpdate();
        // else
        //     this.onInsert();

        this.action === 'editar' ? this.onUpdate(): this.onInsert();
        
    }

    onUpdate() {
        for ( let i in this.places ) {
            if ( this.places[i].title === this.placeTitle ) {
                this.places[i] = this.getValues();
            }
        }

        // this.dbService
        //         .updateRestaurant(this.places)
        //         .subscribe( () => {
        //             this.uiManager.hideProgressBar()
        //             this.uiManager.navigateTo('/')
        //         } );;
    }

    getValues(): Place {
        return new Place (
            null,
            this.form.value.place,
            this.form.value.image,
            this.form.value.openingTime,
            this.form.value.closingTime,
            +this.form.value.score,
            null
        );
    }
  
    onInsert() {
        const newPlace = this.getValues();
        // this.db.collection('maoe').add({'title': 'Rocket'})

        this.dbService
                .addRestaurant({...newPlace})
                .then(res => (console.log(res)))
                .catch(err => (console.log(err)))

    }
  }
  