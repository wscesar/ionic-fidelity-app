import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlaceService } from '../shared/place.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-place-create',
  templateUrl: './place-create.page.html',
})
export class PlaceCreatePage implements OnInit {
    form: FormGroup;

    constructor(
        private router: Router,
        private placesService: PlaceService,
        private loadingCtrl: LoadingController
    ) {}
  
    ngOnInit() {
        this.form = new FormGroup({
            place: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),
            score: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),
        });
    }
  
    onInsertData() {
        if (!this.form.valid) {
            return;
        }

        this.loadingCtrl.create({ message: 'Salvando...' }).then( loadingEl => {
            
            loadingEl.present();
        
            this.placesService.addPlace (
                
                this.form.value.place,
                +this.form.value.score

            ) .subscribe( () => {

                loadingEl.dismiss();
                this.form.reset();
                this.router.navigate(['/meus-pontos']);

            });
        });
    }
  }
  