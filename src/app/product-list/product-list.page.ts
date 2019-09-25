import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';

@Component({
    selector: 'app-products',
    templateUrl: './product-list.page.html'
})
export class ProductListPage implements OnInit {

    private isLoading: boolean;
    private products: Product[];
    private productSubscription: Subscription;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private productService: ProductService
    ) { }

    ionViewWillEnter() {
        this.isLoading = true;
        this.productService.fetchData().subscribe(res => {
            this.isLoading = false;
            console.log(res)
        });
    }

    ngOnInit() {
        this.productSubscription = this.productService.getProducts.subscribe(response => {
            this.products = response;
        });
    }

}
