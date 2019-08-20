import { StatusBar } from '@ionic-native/status-bar/ngx';
import { tap, take } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { WordpressService } from './../../services/wordpress.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit, OnDestroy {
  post: any;
  verificaTemplate: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: WordpressService,
    private loadingCtrl: LoadingController,
    private firebase: Firebase,
    private statusBar: StatusBar
  ) {
    this.statusBar.isVisible
    this.statusBar.backgroundColorByHexString('#46CBCA');
  }
 
  ngOnInit() {
    this.loadPost()
  }

  ngOnDestroy() {
    console.log('Componente post foi destruído')
  }
 
  async loadPost() {
    let loading = await this.loadingCtrl.create({
      message: 'Carregando informações...',
      spinner: 'dots',
      duration: 10000
    });
    await loading.present();

    let id = this.route.snapshot.paramMap.get('id');
    this.service.getPostContent(id)
    .pipe(
      tap(valor => console.log(valor)),
      take(1)
    )
    .subscribe(response => {
      this.post = response;
      this.firebase.setScreenName(this.service.nomePost);
      this.verificaTemplate = true;
    }, erro => {
      this.verificaTemplate = false;
    });
  }

  getBackground() {
    var img = ''
    if(!this.verificaTemplate){
      img = "url('../../../assets/soledade.jpg')"
    }
    else{
      img = '#ffffff';
    }
    return img
  }
 
  openOriginal() {
    // Add InAppBrowser for app if want
    window.open(this.post.link, '_blank');
  }
}