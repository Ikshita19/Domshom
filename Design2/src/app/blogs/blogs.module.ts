import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { ThreadsInNodeJsVsJavaComponent } from './threads-in-node-js-vs-java/threads-in-node-js-vs-java.component';
import { BlogsRoutingModule } from './blogs-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [BlogComponent, ThreadsInNodeJsVsJavaComponent],
  imports: [CommonModule, SharedModule, BlogsRoutingModule]
})
export class BlogsModule { }
