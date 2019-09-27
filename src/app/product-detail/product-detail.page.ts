import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Place } from '../model/place.model';
import { Product } from '../model/product.model';
import { DBService } from '../services/db.service';
import { UiManagerService } from '../services/ui-manager.service';

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
        private dbService: DBService,
        private uiManager: UiManagerService
    ) { }
    

    ionViewWillEnter(){
        
        this.isLoading = true;
        this.dbService.fetchPlaces().subscribe(() => {
            this.isLoading = false;
            this.getUserScore();
            this.getProductData();
            this.toggleButton();
        });

    }


    ngOnInit() {
        this.paramPlace = this.route.snapshot.paramMap.get("place");
        this.paramProduct = this.route.snapshot.paramMap.get("product");

        this.placeSubscription = this.dbService.getPlaces.subscribe(response => {
            this.places = response;
        });

    }

     getUserScore() {
        for ( let place of this.places )  {
            if ( place.title === this.paramPlace ) {
                this.userScore = place.score;
            }
        }
    }


    getProductData() {
        let products = this.dbService.getProducts(this.paramPlace);

        for ( let product of products ) {
            if ( product.title === this.paramProduct ) {
                this.title = product.title;
                this.image = product.image;
                this.productScore = product.score;
            }
        }
    }


    toggleButton() {
        for ( let place of this.places ) {
            if ( place.title === this.paramPlace ) {
                if ( place.score < this.productScore ) {
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

            for ( let place of this.places ) {
                if ( place.title === this.paramPlace ) {
                    place.score = this.userScore
                }
            }

            this.toggleButton();

            this.uiManager.alert('Ok', 'Você acaba de resgatar seu brinde', '/')

        } else {
            this.disableButton = true;
        }

    }

}
