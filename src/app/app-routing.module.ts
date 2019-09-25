import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'meus-pontos', pathMatch: 'full' },
    { path: 'meus-pontos', loadChildren: './user-score/user-score.module#UserScorePageModule' },

    { path: 'cadastrar-restaurante', loadChildren: './place-create/place-create.module#PlaceCreatePageModule' },
    { path: 'criar-promocao', loadChildren: './product-create/product-create.module#ProductCreatePageModule' },

    { path: 'produtos', loadChildren: './product-list/product-list.module#ProductListPageModule' },
    {
        path: 'promocoes',
        children: [
            {
                path: ':place',
                children: [
                    {
                        path: 'criar', 
                        loadChildren: './product-create/product-create.module#ProductCreatePageModule'
                    },
                    {
                        path: ':product', 
                        loadChildren: './product-detail/product-detail.module#ProductDetailPageModule'
                    },
                    {
                        path: '',
                        loadChildren: './place-detail/place-detail.module#PlaceDetailPageModule'
                    },
                ]
            },
            {
                path: '',
                loadChildren: './product-list/product-list.module#ProductListPageModule'
            },
        ]
    },

    {
        path: 'restaurante',
        children: [
            {
                path: ':place',
                children: [
                    {
                        path: 'criar', 
                        loadChildren: './product-create/product-create.module#ProductCreatePageModule'
                    },
                    {
                        path: ':product', 
                        loadChildren: './product-detail/product-detail.module#ProductDetailPageModule'
                    },
                    {
                        path: '',
                        loadChildren: './place-detail/place-detail.module#PlaceDetailPageModule'
                    },
                ]
            },
            {
                path: '',
                loadChildren: './product-list/product-list.module#ProductListPageModule'
            },
        ]
    },
  
    { path: 'product-create', loadChildren: './product-create/product-create.module#ProductCreatePageModule' },

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
