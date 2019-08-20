import { tap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { WordpressService } from './../../services/wordpress.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform, ToastController } from '@ionic/angular';

import { Firebase } from '@ionic-native/firebase/ngx';
import { Subscription } from 'rxjs';

 
@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit{

  posts = [];
  page = 1;
  count = null;
  categoria: string = '';
  verificaTemplate: boolean = false;
  nomePagina: string
  subscription: Subscription
 
  constructor(
    private service: WordpressService,
    private loadingCtrl: LoadingController,
    private route: Router,
    private firebase: Firebase,
    private platform: Platform,
    private toastController: ToastController
  ) {
      switch(this.route.url) {
        //Id para requisição dos post ENSS
        case '/menu/posts/lista/0': {
          this.categoria = '16,17'
          this.nomePagina = 'ENSS'
          this.firebase.setScreenName('Lista posts ENSS')
          break;
        }
        //Id para requisição dos post Formação
        case '/menu/posts/lista/1': {
          this.categoria = '03,04,35'
          this.nomePagina = 'Formação'
          this.firebase.setScreenName('Lista posts Formação')
          break;
       }
      }
    }
 
  ngOnInit() {
    this.loadPosts();
  }

  ionViewDidEnter() {
    let ultimoClick = 0;
    let tempoParaSair = 2000;
    //Registrando a ação de pressionar o botão voltar
    this.subscription = this.platform.backButton.subscribe(() => {
      if (new Date().getTime() - ultimoClick < tempoParaSair) {
        navigator['app'].exitApp(); //função para sair do app
      } else {
        let message = 'Pressione novamente para sair do app.'
        let duration = 2000
        this.presentToast(message, duration);
        ultimoClick = new Date().getTime();
      }
    });
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe()
    this.toastController.dismiss()
    console.log('Componente posts foi destruído')
  }

  async presentToast(message, duration) {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'bottom',
      color: 'dark',
      animated: true
    });
    toast.present();
  }

 
  async loadPosts() {
    let loading = await this.loadingCtrl.create({
      message: 'Carregando informações...',
      spinner: 'dots',
      duration: 5000
    });
    await loading.present();
 
    this.service.getPosts(this.categoria, this.page)
    .pipe(
      tap(),
      take(1)
    )
    .subscribe(response => {
      this.count = this.service.totalPosts;
      this.posts = response;
      loading.dismiss();
      this.verificaTemplate = true;
    }, erro => {
      this.verificaTemplate = false;
      let message = 'Nenhuma postagem foi carregada. Verifique sua conexão com a internet e tente novamente mais tarde'
      var duration = 5000
      this.presentToast(message, duration);
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
 
  loadMore(event) {
    this.page++;
    console.log("Pages: "+this.page);

    this.service.getPosts(this.categoria, this.page).subscribe(response => {
      this.posts = [...this.posts, ...response];
      event.target.complete();
      
      // Disable infinite loading when maximum reached
      if (this.page == this.service.pages) {
        event.target.disabled = true;
      }
    });
  }
 
}