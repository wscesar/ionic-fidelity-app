import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'restaurantes', pathMatch: 'full' },
    { path: 'restaurantes', loadChildren: './place-list/place-list.module#PlaceListPageModule' },

    { path: 'cadastrar-restaurante', loadChildren: './place-create/place-create.module#PlaceCreatePageModule' },
    { path: 'criar-promocao', loadChildren: './product-create/product-create.module#ProductCreatePageModule' },

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
                        path: ':productId', 
                        loadChildren: './product-detail/product-detail.module#ProductDetailPageModule'
                    },
                    {
                        path: ':product', 
                        loadChildren: './product-detail/product-detail.module#ProductDetailPageModule'
                    },
                ]
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
                        path: ':action', 
                        loadChildren: './place-create/place-create.module#PlaceCreatePageModule'
                    },
                    // {
                    //     path: ':product', 
                    //     loadChildren: './product-detail/product-detail.module#ProductDetailPageModule'
                    // },
                    {
                        path: '',
                        loadChildren: './place-detail/place-detail.module#PlaceDetailPageModule'
                    },
                ]
            },
        ]
    },
  
    { path: 'product-create', loadChildren: './product-create/product-create.module#ProductCreatePageModule' },
  { path: 'login', loadChildren: './auth/auth.module#AuthPageModule' },

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
