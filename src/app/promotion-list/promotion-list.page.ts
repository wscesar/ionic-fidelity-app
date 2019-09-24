import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Promotion } from '../shared/promotion.model';
import { PromotionService } from '../shared/promotion.service';

@Component({
    selector: 'app-promotions',
    templateUrl: './promotion-list.page.html'
})
export class PromotionListPage implements OnInit {

    private isLoading: boolean;
    private promotions: Promotion[];
    private promotionSubscription: Subscription;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private promotionService: PromotionService
    ) { }

    ionViewWillEnter() {
        this.isLoading = true;
        this.promotionService.fetchData().subscribe(() => {
            this.isLoading = false;
        });
    }

    ngOnInit() {
        this.promotionSubscription = this.promotionService.getPromotions.subscribe(response => {
            this.promotions = response;
        })
    }

}
