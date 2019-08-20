import { Router } from '@angular/router';
import { Firebase } from '@ionic-native/firebase/ngx';
import { WordpressService } from './../../services/wordpress.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, Platform } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { tap, take } from 'rxjs/operators';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-santo',
  templateUrl: './santo.page.html',
  styleUrls: ['./santo.page.scss'],
})
export class SantoPage implements OnInit {

  santo: any = Object();
  verificaTemplate: boolean = false;
  subscription: Subscription

  constructor(private service: WordpressService,
              private loadingCtrl: LoadingController,
              private screenOrientation: ScreenOrientation,
              private _sanitizer: DomSanitizer,
              private firebase: Firebase,
              private statusBar: StatusBar,
              private toastController: ToastController,
              private route: Router,
              private platform: Platform
            ){
              this.firebase.setScreenName('Santo do dia')
              this.statusBar.isVisible
              this.statusBar.backgroundColorByHexString('#46CBCA');
            }

  ngOnInit(){
    this.orientacaoTela();
    this.loadPosts();
  }

  orientacaoTela(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  async loadPosts() {
    let loading = await this.loadingCtrl.create({
      message: 'Carregando informações do Santo(a)...',
      spinner: 'dots',
      duration: 2000
    });
    await loading.present();
 
    this.service.getSanto()
    .pipe(
      tap(valor => console.log(valor)),
      take(1)
    )
    .subscribe(response => {
      this.santo = response,
      loading.dismiss();
      this.verificaTemplate = true;
    }, erro => {
      this.verificaTemplate = false;
      let message = 'O santo não foi carregado. Verifique sua conexão com a internet e tente novamente mais tarde'
      var duration = 5000
      this.presentToast(message, duration);
    }
  )}

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

  ionViewDidEnter() {
    //Registrando a ação de pressionar o botão voltar
    this.subscription = this.platform.backButton.subscribe(() => {
      this.route.navigateByUrl('/menu/posts/lista/0');
    });
  }

  ionViewWillLeave() {
    //this.subscription.unsubscribe()
    this.toastController.dismiss()
    console.log('Componente santo foi destruído')
  }


  getDay(){
    return this.santo.dia > 9 ? this.santo.dia : "0" + this.santo.dia;
  }
  getMonth(){
    return this.santo.mes > 9 ? this.santo.mes : "0" + this.santo.mes;
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url('${image}')`);
  }

}
