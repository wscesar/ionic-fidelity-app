import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Product } from '../model/product.model';
import { DBService } from '../services/db.service';
import { UiManagerService } from '../services/ui-manager.service';


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
        private http: HttpClient,
        private dbService: DBService,
        private uiManager: UiManagerService,
        private route: ActivatedRoute
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

        this.uiManager.showLoading();

        const newProduct = new Product (
            this.form.value.product,
            +this.form.value.score,
            this.form.value.image,
        );

        this.dbService
                .updateProducts(this.paramPlace, newProduct)
                .subscribe( () => {
                    this.uiManager.hideProgressBar();
                    this.uiManager.navigateTo('/promocoes/'+this.paramPlace);
                });

    }

}
