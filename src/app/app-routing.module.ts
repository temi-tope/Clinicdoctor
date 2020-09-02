import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
   path: 'landing',
   loadChildren: './pages/landing/landing.module#LandingPageModule'
  },
  {
  path: 'login',
  loadChildren: './pages/auth/login/login.module#LoginPageModule'
  },
  {
    path: 'register',
  loadChildren: './pages/auth/register/register.module#RegisterPageModule'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/examination/list.module').then(m => m.ListPageModule)
     // canActivate: [AuthGuard]
  },

  {
    path: 'home',
    loadChildren: () => import("./pages/AssignedPatient/home.module").then(m => m.HomePageModule)
  // canActivate: [AuthGuard]
  },

  {
    path: 'prescription',
    loadChildren: () => import('./pages/prescription/prescription.module').then(m => m.PrescriptionPageModule)
     // canActivate: [AuthGuard]
  },
  {
    path: 'feedback',
    loadChildren: () => import('./pages/feedback/feedback.module').then(m => m.FeedbackPageModule)
     // canActivate: [AuthGuard]
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'reexam',
    loadChildren: () => import('./pages/reexam/reexam.module').then( m => m.ReexamPageModule)
  },

];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}