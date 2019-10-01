import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../model/product.model';
import { DBService } from '../services/db.service';
import { UiManagerService } from '../services/ui-manager.service';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.page.html',
})
export class ProductCreatePage implements OnInit {
    form: FormGroup;
    product: Product;
    products: Product[];
    restaurantId: string;

    constructor(
        private dbService: DBService,
        private uiManager: UiManagerService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.restaurantId =  this.route.snapshot.paramMap.get('place');

        this.dbService.getRestaurant(this.restaurantId).subscribe(res => {
            console.log(res)
            // this.product = res
        })

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

    
    onSubmit() {

        this.uiManager.showLoading();

        const newProduct = new Product (
            this.form.value.product,
            +this.form.value.score,
            this.form.value.image,
        );

        this.dbService
                .addProduct(this.restaurantId, newProduct)
                .then( () => {
                    this.uiManager.hideProgressBar();
                    this.uiManager.navigateTo('/');
                });

    }

}
