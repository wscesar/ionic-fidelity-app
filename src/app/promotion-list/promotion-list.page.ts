import { Component, OnInit } from '@angular/core';
import { Promotion } from '../shared/promotion.model';
import { ActivatedRoute } from '@angular/router';
import { PromotionService } from '../shared/promotion.service';

@Component({
    selector: 'app-promotions',
    templateUrl: './promotion-list.page.html'
})
export class PromotionListPage implements OnInit {


  store: string;
  promotions: Promotion[];
  

  constructor(
    private route: ActivatedRoute,
    private promotionservice: PromotionService
  ) { }


  ngOnInit() {
    this.store = this.route.snapshot.paramMap.get("store");
    this.promotions = this.promotionservice.promotions;
  }


}
