import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

import { PromotionService } from '../shared/promotion.service';

@Component({
  selector: 'app-promotion-create',
  templateUrl: './promotion-create.page.html',
})
export class PromotionCreatePage implements OnInit {
    form: FormGroup;

    constructor(
        private router: Router,
        private promotionService: PromotionService,
        private loadingCtrl: LoadingController
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            
            promotion: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),

            score: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),

        });
    }

    

}
