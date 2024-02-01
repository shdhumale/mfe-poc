import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './purchase.component';

const routes: Routes = [

  {
    path:'', component:PurchaseComponent
    //path:'', loadChildren:()=>import('../app/purchase/purchase.module').then(m=>m.PurchaseModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
