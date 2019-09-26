import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoadingController, AlertController, NavController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { PlaceService } from '../shared/place.service';
import { Product } from '../model/product.model';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.page.html',
})
export class ProductCreatePage implements OnInit {
    baseUrl = 'https://my-dummy-database.firebaseio.com/products.json';
    form: FormGroup;
    product: Product;
    products: Product[];
    subscription: Subscription;
    paramPlace: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpClient,
        private placeService: PlaceService,
        private loadingCtrl: LoadingController,
        private navCtrl: NavController,
        private alertCtrl: AlertController
    ) {}

    ngOnInit() {
        this.paramPlace =  this.route.snapshot.paramMap.get('place');

        this.form = new FormGroup({
            
            product: new FormControl(null, {
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

        const newProduct = new Product (
            this.form.value.product,
            +this.form.value.score,
            this.form.value.image,
        );

        this.placeService.updateProducts(this.paramPlace, newProduct);

    }

    

}
