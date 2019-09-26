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
    private isLoading: boolean;
    title: string;
    image: string;
    productScore: number;
    userScore: number;
    paramPlace: string;
    paramProduct: string;
    
    places: Place[];
    products: Product[];
    // lenght: number = 0 ;

    private place: Place;
    private product: Product;

    private disableButton = false;

    constructor (
        private route: ActivatedRoute,
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private placeService: PlaceService,
        private productService: ProductService,
    ) { }
    

    ionViewWillEnter(){
        
        this.isLoading = true;
        this.placeService.fetchPlaces().subscribe(() => {
            this.isLoading = false;
            this.getUserScore();
            this.getProductData();
            this.toggleButton();
            console.log(this.product)
            console.log(this.product.image)
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

        for ( let i in products )  {

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
                    this.placeService.setPlaces(this.places);
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
