import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'posts',
        loadChildren: 'src/app/pages/posts/posts.module#PostsPageModule'
      },
      {
        path: 'posts/:id',
        loadChildren: 'src/app/pages/post/post.module#PostPageModule'
      },
      {
        path: 'post/:id',
        loadChildren: 'src/app/pages/post/post.module#PostPageModule'
      },
      {
        path: 'posts/lista/:id',
        loadChildren: 'src/app/pages/posts/posts.module#PostsPageModule'
      },
      {
        path: 'santo',
        loadChildren: 'src/app/pages/santo/santo.module#SantoPageModule'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/menu/posts'
  },

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
