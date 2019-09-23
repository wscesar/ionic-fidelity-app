import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoadingController, AlertController, NavController } from '@ionic/angular';

import { PromotionService } from '../shared/promotion.service';
import { Promotion } from '../shared/promotion.model';

@Component({
  selector: 'app-promotion-create',
  templateUrl: './promotion-create.page.html',
})
export class PromotionCreatePage implements OnInit {
    form: FormGroup;
    promotionList: Promotion[];
    promotion: Promotion;
    paramPlace: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private promotionService: PromotionService,
        private loadingCtrl: LoadingController,
        private navCtrl: NavController,
        private alertCtrl: AlertController
    ) {}

    ngOnInit() {
        this.paramPlace =  this.route.snapshot.paramMap.get('place');

        this.promotionList = this.promotionService.promotions; 

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

    onFormSubmit() {

        const newPromotion = new Promotion (
            this.paramPlace,
            this.form.value.promotion,
            this.form.value.score,
            'https://static.thenounproject.com/png/1174579-200.png'
        );
        
        this.promotionService.promotions.push(newPromotion);

        this.alertCtrl
        .create({
            header: 'Ok',
            message: 'Promocao cadastrada com sucesso'
        })
        .then(alertEl => {
            alertEl.present();
            this.navCtrl.navigateBack(`/promocoes/${this.paramPlace}`);
        })

    }

}
