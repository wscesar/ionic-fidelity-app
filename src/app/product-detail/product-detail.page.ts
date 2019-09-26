import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Place } from '../shared/place.model';
import { Product } from '../shared/product.model';
import { PlaceService } from '../shared/place.service';
import { ProductService } from '../shared/product.service';
import { AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.sass'],
})
export class ProductDetailPage implements OnInit {

    private placeSubscription: Subscription;
    private productSubscription: Subscription;
    private isLoadingPlaces: boolean;
    private isLoadingProducts: boolean;
    title: string;
    image: string;
    productScore: number;
    userScore: number;
    paramPlace: string;
    paramProduct: string;
    
    placeList: Place[];
    productList: Product[];
    lenght: number = 0 ;

    place: Place;

    disableButton = false;

    constructor (
        private route: ActivatedRoute,
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private placeService: PlaceService,
        private productService: ProductService,
    ) { }
    

    ionViewWillEnter(){
        
        this.isLoadingPlaces = true;
        this.placeService.fetchPlaces().subscribe(() => {
            this.isLoadingPlaces = false;
            this.getUserScore();
            this.toggleButton();
        });

        this.isLoadingProducts = true;
        this.productService.fetchData().subscribe(() => {
            this.isLoadingProducts = false;
            this.getProductData();
            this.toggleButton();
        });
    }


    ngOnInit() {
        this.paramPlace = this.route.snapshot.paramMap.get("place");
        this.paramProduct = this.route.snapshot.paramMap.get("product");
        
        // this.productList = this.productService.products;
        this.productSubscription = this.productService.getProducts.subscribe(response => {
            this.productList = response;
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


    getProductData() {

        let promo = this.productList;

        for ( let i in promo )  {
            if (
                promo[i].title === this.paramProduct &&
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
