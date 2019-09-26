import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Place } from '../model/place.model';
import { Product } from '../model/product.model';
import { PlaceService } from '../shared/place.service';
import { AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.sass'],
})
export class ProductDetailPage implements OnInit {

    private placeSubscription: Subscription;
    private isLoading: boolean;
    private image: string;
    private title: string;
    private productScore: number;
    private userScore: number;
    private paramPlace: string;
    private paramProduct: string;
    
    private place: Place;
    private places: Place[];
    private product: Product;
    private products: Product[];

    private disableButton = false;

    constructor (
        private route: ActivatedRoute,
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private placeService: PlaceService,
    ) { }
    

    ionViewWillEnter(){
        
        this.isLoading = true;
        this.placeService.fetchPlaces().subscribe(() => {
            this.isLoading = false;
            this.getUserScore();
            this.getProductData();
            this.toggleButton();
        });

    }


    ngOnInit() {
        this.paramPlace = this.route.snapshot.paramMap.get("place");
        this.paramProduct = this.route.snapshot.paramMap.get("product");

        this.placeSubscription = this.placeService.getPlaces.subscribe(response => {
            this.places = response;
        });

    }

     getUserScore() {
        for ( let i in this.places )  {
            if ( this.places[i].title === this.paramPlace ) {
                this.userScore = this.places[i].score;
            }
        }
    }


    getProductData() {

        let products = this.placeService.getProducts(this.paramPlace);

        for ( let i in products ) {

            if ( products[i].title === this.paramProduct ) {
                // this.product = products[i];
                this.title = products[i].title;
                this.image = products[i].image;
                this.productScore = products[i].score;
            }
        }
    }


    toggleButton() {
        let places = this.places;
        
        for ( let i in places ) {

            if ( places[i].title === this.paramPlace ) {
                if ( this.places[i].score < this.productScore ) {
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

            let places = this.places;

            for ( let i in places ) {
                if ( places[i].title === this.paramPlace ) {
                    this.places[i].score = this.userScore
                    // this.placeService.setPlaces(this.places);
                    // this.placeService.updatePlaces();
                    // this.placeService.updateProducts(this.paramPlace, );
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
