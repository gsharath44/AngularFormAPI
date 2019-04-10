import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiConfigComponent } from './api-config/api-config.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: 'api-config', component: ApiConfigComponent },
  { path: 'review',      component: ReviewComponent },
  { path: '',
    redirectTo: '/api-config',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/api-config' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
