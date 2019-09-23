import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'meus-pontos', pathMatch: 'full' },
    { path: 'meus-pontos', loadChildren: './user-score/user-score.module#UserScorePageModule' },

    { path: 'criar-loja', loadChildren: './place-create/place-create.module#PlaceCreatePageModule' },

    {
        path: 'promocoes',
        children: [
            {
                path: ':store',
                children: [
                    {
                        path: ':promotion', 
                        loadChildren: './promotion-detail/promotion-detail.module#PromotionDetailPageModule'
                    },
                    {
                        path: '',
                        loadChildren: './place-detail/place-detail.module#PlaceDetailPageModule'
                    },
                ]
            },
            {
                path: '',
                loadChildren: './promotion-list/promotion-list.module#PromotionListPageModule'
            },
        ]
        
    },
  { path: 'promotion-create', loadChildren: './promotion-create/promotion-create.module#PromotionCreatePageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
