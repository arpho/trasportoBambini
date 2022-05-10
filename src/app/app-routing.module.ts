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
  },
  {
    path: 'update-vehicle',
    loadChildren: () => import('./pages/Fleet/modificaVeicolo/update-vehicle/update-vehicle.module').then( m => m.UpdateVehiclePageModule)
  },
  {
    path: 'schools-list',
    loadChildren: () => import('./pages/schools/list/schools-list/schools-list.module').then( m => m.SchoolsListPageModule)
  },
  {
    path: 'update-school',
    loadChildren: () => import('./pages/schools/modificaScuola/update-school/update-school.module').then( m => m.UpdateSchoolPageModule)
  },
  {
    path: 'new-school',
    loadChildren: () => import('./pages/schools/inserisciScuola/new-school/new-school.module').then( m => m.NewSchoolPageModule)
  },
  {
    path: 'students',
    loadChildren: () => import('./pages/customers/students/list/students/students.module').then( m => m.StudentsPageModule)
  },
  {
    path: 'new-student',
    loadChildren: () => import('./pages/customers/students/create/new-student/new-student.module').then( m => m.NewStudentPageModule)
  },
  {
    path: 'update-student',
    loadChildren: () => import('./pages/customers/students/edit/update-student/update-student.module').then( m => m.UpdateStudentPageModule)
  },
  {
    path: 'collection-points-list',
    loadChildren: () => import('./pages/collectionPoints/list/collection-points-list/collection-points-list.module').then( m => m.CollectionPointsListPageModule)
  },
  {
    path: 'create-collection-point',
    loadChildren: () => import('./pages/collectionPoints/create/create-collection-point/create-collection-point.module').then( m => m.CreateCollectionPointPageModule)
  },
  {
    path: 'update-collection-point',
    loadChildren: () => import('./pages/collectionPoints/edit/update-collection-point/update-collection-point.module').then( m => m.UpdateCollectionPointPageModule)
  },
  {
    path: 'parents-list',
    loadChildren: () => import('./pages/customers/parents/list/parents-list/parents-list.module').then( m => m.ParentsListPageModule)
  },
  {
    path: 'new-parent',
    loadChildren: () => import('./pages/customers/parents/create/new-parent/new-parent.module').then( m => m.NewParentPageModule)
  },
  {
    path: 'update-parent',
    loadChildren: () => import('./pages/customers/parents/edit/update-parent/update-parent.module').then( m => m.UpdateParentPageModule)
  },
  {
    path: 'edit-customer',
    loadChildren: () => import('./pages/customers/edit/edit-customer/edit-customer.module').then( m => m.EditCustomerPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
