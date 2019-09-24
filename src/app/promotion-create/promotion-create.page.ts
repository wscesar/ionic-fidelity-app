import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoadingController, AlertController, NavController } from '@ionic/angular';

import { PromotionService } from '../shared/promotion.service';
import { Promotion } from '../shared/promotion.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-promotion-create',
  templateUrl: './promotion-create.page.html',
})
export class PromotionCreatePage implements OnInit {
    baseUrl = 'https://my-dummy-database.firebaseio.com/promotions.json';
    form: FormGroup;
    promotions: Promotion[];
    promotion: Promotion;
    paramPlace: string;
    subscription: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpClient,
        private promotionService: PromotionService,
        private loadingCtrl: LoadingController,
        private navCtrl: NavController,
        private alertCtrl: AlertController
    ) {}

    ionViewWillEnter() {
        this.promotionService.fetchData().subscribe(() => {
            console.log(this.promotions)
        });
    }

    ngOnInit() {
        this.paramPlace =  this.route.snapshot.paramMap.get('place');

        // this.promotions = this.promotionService.promotions; 
        this.subscription = this.promotionService.getPromotions.subscribe(response => {
            this.promotions = response;
        });


        this.form = new FormGroup({
            
            promotion: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),

            image: new FormControl(null, {
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
            +this.form.value.score,
            this.form.value.image,
        );
        
        this.promotions.push(newPromotion);
        this.promotionService.setPromotions(this.promotions);
        this.promotionService.updatePromotions();

        this.alertCtrl
            .create({
                header: 'Ok',
                message: 'Promocao cadastrada com sucesso'
            })
            .then(alertEl => {
                alertEl.present();
                this.navCtrl.navigateBack('/');
                // this.navCtrl.navigateBack(`/promocoes/${this.paramPlace}`);
            })

    }

    

}
