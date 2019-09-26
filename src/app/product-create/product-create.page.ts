import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoadingController, AlertController, NavController } from '@ionic/angular';

import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PlaceService } from '../shared/place.service';


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
        private productService: ProductService,
        private loadingCtrl: LoadingController,
        private navCtrl: NavController,
        private alertCtrl: AlertController
    ) {}

    ionViewWillEnter() {
        this.productService.fetchData().subscribe();
    }

    ngOnInit() {
        this.paramPlace =  this.route.snapshot.paramMap.get('place');

        this.subscription = this.productService.getProducts.subscribe(response => {
            this.products = response;
        });

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
            null, //this.paramPlace,
            this.form.value.product,
            +this.form.value.score,
            this.form.value.image,
        );

        this.placeService.updateProducts(this.paramPlace, newProduct);

        // let uProducts = this.placeService.getProducts();

        // for(let i in uProducts){

        // }
        
        // this.products.push(newProduct);

        // console.log(this.product)
        // this.productService.setProducts(this.products);
        // this.productService.updateProducts();

        // this.alertCtrl
        //     .create({
        //         header: 'Ok',
        //         message: 'Promocao cadastrada com sucesso'
        //     })
        //     .then(alertEl => {
        //         alertEl.present();
        //         this.navCtrl.navigateBack('/');
        //     })

    }

    

}
