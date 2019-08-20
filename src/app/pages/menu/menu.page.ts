import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'ENSS',
      url: '/menu/posts/lista/0'
    },
    {
      title: 'Formação',
      url: '/menu/posts/lista/1'
    },
    {
      title: 'Santo do dia',
      url: '/menu/santo'
    },
  ];
  selectedPath = '';
  
  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {}

}
