import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/user/services/authguard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {path:'home',
redirectTo:'folder/Inbox',
pathMatch:'full'},

  {path:"users",
  
  loadChildren:()=>import('./modules/user/user.module').then(m=>m.UserModule)
},
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./pages/customers/customers/customers.module').then( m => m.CustomersPageModule)
  },
  {
    path: 'flotta',
    loadChildren: () => import('./pages/Fleet/flotta/flotta.module').then( m => m.FlottaPageModule)
  },
  {
    path: 'nuovo-veicolo',
    loadChildren: () => import('./pages/Fleet/nuovo-veicolo/nuovo-veicolo.module').then( m => m.NuovoVeicoloPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
