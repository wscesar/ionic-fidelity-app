import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Place } from '../shared/place.model';
import { Promotion } from '../shared/promotion.model';
import { PlaceService } from '../shared/place.service';
import { PromotionService } from '../shared/promotion.service';
import { AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.page.html',
  styleUrls: ['./promotion-detail.page.sass'],
})
export class PromotionDetailPage implements OnInit {

    private placeSubscription: Subscription;
    private promotionSubscription: Subscription;
    private isLoadingPlaces: boolean;
    private isLoadingPromotions: boolean;
    title: string;
    image: string;
    productScore: number;
    userScore: number;
    paramPlace: string;
    paramPromotion: string;
    
    placeList: Place[];
    promotionList: Promotion[];
    lenght: number = 0 ;

    place: Place;

    disableButton = false;

    constructor (
        private route: ActivatedRoute,
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private placeService: PlaceService,
        private promotionService: PromotionService,
    ) { }
    

    ionViewWillEnter(){
        
        this.isLoadingPlaces = true;
        this.placeService.fetchPlaces().subscribe(() => {
            this.isLoadingPlaces = false;
            this.getUserScore();
            this.toggleButton();
        });

        this.isLoadingPromotions = true;
        this.promotionService.fetchData().subscribe(() => {
            this.isLoadingPromotions = false;
            this.getPromotionData();
            this.toggleButton();
        });
    }


    ngOnInit() {
        this.paramPlace = this.route.snapshot.paramMap.get("place");
        this.paramPromotion = this.route.snapshot.paramMap.get("promotion");
        
        // this.promotionList = this.promotionService.promotions;
        this.promotionSubscription = this.promotionService.getPromotions.subscribe(response => {
            this.promotionList = response;
        });
        
        // this.placeList = this.placeService.places;
        this.placeSubscription = this.placeService.getPlaces.subscribe(response => {
            this.placeList = response;
        });

    }


     getUserScore() {
        for ( let i in this.placeList )  {
            if ( this.placeList[i].title === this.paramPlace ) {
                this.userScore = this.placeList[i].score;
            }
        }
    }


    getPromotionData() {

        let promo = this.promotionList;

        for ( let i in promo )  {
            if (
                promo[i].title === this.paramPromotion &&
                promo[i].store === this.paramPlace
            ) {
                this.title = promo[i].title;
                this.image = promo[i].image;
                this.productScore = promo[i].score;
            }
        }
    }


    toggleButton() {
        let places = this.placeList;
        
        for ( let i in places ) {
            if ( places[i].title === this.paramPlace ) {
                console.log(places[i])
                console.log(this.productScore)
                if ( this.placeList[i].score < this.productScore ) {
                    this.disableButton = true;
                }
            }
        }
    }

    useVoucher() {
        let uScore =  this.userScore
        let pScore =  this.productScore

        if ( uScore >= pScore ) {

            this.userScore = uScore - pScore; //set new score

            let places = this.placeList;

            for ( let i in places ) {
                if ( places[i].title === this.paramPlace ) {
                    this.placeList[i].score = this.userScore
                    this.placeService.setPlaces(this.placeList);
                    this.placeService.updatePlaces();
                }
            }

            this.toggleButton();
            // if ( this.userScore < this.productScore )
            //     this.disableButton = true;

            this.alertCtrl
                .create({
                    header: 'Ok',
                    message: 'Você acaba de resgatar seu brinde'
                })
                .then(alertEl => {
                    alertEl.present();
                    // this.navCtrl.navigateBack('/');
                })
                
        } else {
            this.disableButton = true;
        }

    }

}
