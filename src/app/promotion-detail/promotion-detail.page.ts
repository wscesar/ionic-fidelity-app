import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Place } from '../shared/place.model';
import { Promotion } from '../shared/promotion.model';
import { PlaceService } from '../shared/place.service';
import { PromotionService } from '../shared/promotion.service';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.page.html',
  styleUrls: ['./promotion-detail.page.sass'],
})
export class PromotionDetailPage implements OnInit {

    private subscription: Subscription;
    title: string;
    image: string;
    productScore: number;
    userScore: number;
    paramStore: string;
    paramPromotion: string;
    placeList: Place[];
    promotionList: Promotion[];
    lenght: number = 0 ;

    disableButton = false;

    constructor (
        private route: ActivatedRoute,
        private placeService: PlaceService,
        private promotionService: PromotionService,
        private alertCtrl: AlertController,
    ) { }

    ionViewDidEnter(){
        this.toggleButton();
    }

    ngOnInit() {
        this.paramStore = this.route.snapshot.paramMap.get("store");
        this.paramPromotion = this.route.snapshot.paramMap.get("promotion");
        this.promotionList = this.promotionService.promotions;
        
        this.placeList = this.placeService.places;
        // this.subscription = this.placeService.getPlaces.subscribe(places => {
        //     this.placeList = places;
        // });
        
        this.getStoreData();
        this.getData();
    }

     getStoreData() {

        let places = this.placeList;

        for ( let i = 0 ; i < places.length ; i++ )  {
            if ( places[i].title === this.paramStore ) {
                this.userScore = places[i].score;
                return i;
            }
        }

    }

  getData() {
    let promo = this.promotionList;

    for ( let i = 0 ; i < promo.length ; i++ )  {
        if (
            promo[i].title === this.paramPromotion &&
            promo[i].store === this.paramStore
           ) {
            this.title = promo[i].title;
            this.image = promo[i].image;
            this.productScore = promo[i].score;
        }
    }
  }

    toggleButton() {
        let places = this.placeList;
        for ( let i = 0 ; i < places.length ; i++ )  {
            if ( places[i].title === this.paramStore ) {
                if (this.placeList[i].score < this.productScore){
                    this.disableButton = true;
                }
            }
        }
    }

    useVoucher() {
        let uScore =  this.userScore
        let pScore =  this.productScore

        if ( uScore >= pScore ) {
            this.userScore = uScore - pScore;
            let places = this.placeList;
            
            for ( let i = 0 ; i < places.length ; i++ )  {
                if ( places[i].title === this.paramStore ) {
                    this.placeList[i].score = this.userScore 
                }
            }

            if (this.userScore < this.productScore)
                this.disableButton = true;

            this.alertCtrl
                .create({
                    header: 'Ok',
                    message: 'Você acaba de resgatar seu brinde'
                })
                .then(alertEl => {
                    alertEl.present();
                }) ;
        } else {
            this.disableButton = true;
            // this.alertCtrl
            //     .create({
            //         header: 'Ops',
            //         message: 'Você não tem pontos suficientes para resgatar essa promoção'
            //     })
            //     .then(alertEl => {
            //         alertEl.present();
            //     });
        }

    }

}
