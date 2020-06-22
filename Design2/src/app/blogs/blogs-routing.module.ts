import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { Routes, RouterModule } from '@angular/router';
import { ThreadsInNodeJsVsJavaComponent } from './threads-in-node-js-vs-java/threads-in-node-js-vs-java.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      { path: 'threads-in-nodejs-vs-java', component: ThreadsInNodeJsVsJavaComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
