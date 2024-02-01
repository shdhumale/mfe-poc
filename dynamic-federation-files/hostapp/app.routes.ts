import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';

export const routes: Routes = [
  {
    path:'', redirectTo:'home', pathMatch:'full'
  },
  {
    path:'home', component:HomeComponent
  },
  {
    path:'remote1',
     // loadChildren: () => import('remote1/PurchaseModule')
     // then(m => m.PurchaseModule)
     loadChildren: () =>
            loadRemoteModule({
               type: 'module',
               remoteEntry: 'http://localhost:4001/remoteEntry.js',
               exposedModule: './PurchaseModule'
           })
           .then(m => m.PurchaseModule)
  },
  {
    path: 'react',
    component: WebComponentWrapper,
    data: {
      type: 'script',
      remoteEntry:
        'https://witty-wave-0a695f710.azurestaticapps.net/remoteEntry.js',
      remoteName: 'react',
      exposedModule: './web-components',
      elementName: 'react-element',
    } as WebComponentWrapperOptions,
  }


];
