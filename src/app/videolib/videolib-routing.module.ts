import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAuthVideosComponent } from './components/view-auth-videos/view-auth-videos.component';
import {VjsPlayerAuthComponent} from './components/vjs-player-auth/vjs-player-auth.component'
import { VjsPlayerComponent } from './components/vjs-player/vjs-player.component';


const routes: Routes = [
  {
    path: '',
    component: ViewAuthVideosComponent
  },
  {
    path: 'watch/:title',
    component: VjsPlayerComponent
  },
  {
    path: 'watchauth/:title',
    component: VjsPlayerAuthComponent
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideolibRoutingModule { }
