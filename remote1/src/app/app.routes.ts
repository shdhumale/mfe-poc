import { Routes } from '@angular/router';
import { PurchaseComponent } from "./purchase/purchase.component";

export const routes: Routes = [
  {
    path:'', component:PurchaseComponent
    //path:'', loadChildren:()=>import('../app/purchase/purchase.module').then(m=>m.PurchaseModule)
  }
];
