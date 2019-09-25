import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoadingController, AlertController, NavController } from '@ionic/angular';

import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.page.html',
})
export class ProductCreatePage implements OnInit {
    baseUrl = 'https://my-dummy-database.firebaseio.com/products.json';
    form: FormGroup;
    products: Product[];
    product: Product;
    paramPlace: string;
    subscription: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpClient,
        private productService: ProductService,
        private loadingCtrl: LoadingController,
        private navCtrl: NavController,
        private alertCtrl: AlertController
    ) {}

    ionViewWillEnter() {
        this.productService.fetchData().subscribe(() => {
            console.log(this.products)
        });
    }

    ngOnInit() {
        this.paramPlace =  this.route.snapshot.paramMap.get('place');

        // this.products = this.productService.products; 
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

        const nroduct = new Product (
            this.paramPlace,
            this.form.value.product,
            +this.form.value.score,
            this.form.value.image,
        );
        
        this.products.push(nroduct);
        this.productService.setProducts(this.products);
        this.productService.updateProducts();

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
