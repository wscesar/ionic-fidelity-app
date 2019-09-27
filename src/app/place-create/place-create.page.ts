import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Place } from '../model/place.model';
import { DBService } from '../services/db.service';
import { UiManagerService } from '../services/ui-manager.service';

@Component({
  selector: 'app-place-create',
  templateUrl: './place-create.page.html',
})
export class PlaceCreatePage implements OnInit {
    form: FormGroup;

    constructor(
        private dbService: DBService,
        private uiManager: UiManagerService ) {}
  
    ngOnInit() {
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
    }
  
    onInsertData() {
        if ( !this.form.valid ) {
            return;
        }

        this.uiManager.showLoading();

        const newPlace = new Place(
            null,
            this.form.value.place,
            this.form.value.image,
            this.form.value.openingTime,
            this.form.value.closingTime,
            +this.form.value.score,
            null
        );
    
        this.dbService
                .insertPlace(newPlace)
                .subscribe( () => {
                    this.uiManager.hideProgressBar()
                    this.uiManager.navigateTo('/')
                } );;
        
    }
  }
  