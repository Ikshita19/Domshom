import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule } from 'ngx-videogular';
import { SharedModule } from '../shared/shared.module';
import { VideolibRoutingModule } from './videolib-routing.module';

import { ViewAuthVideosComponent } from './components/view-auth-videos/view-auth-videos.component';
import { VjsPlayerAuthComponent } from './components/vjs-player-auth/vjs-player-auth.component';
import { VjsPlayerComponent } from './components/vjs-player/vjs-player.component';





@NgModule({
  declarations: [VjsPlayerComponent, ViewAuthVideosComponent, VjsPlayerAuthComponent],
  imports: [
    CommonModule, SharedModule, VideolibRoutingModule, VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule 
  ]
})
export class VideolibModule { }
