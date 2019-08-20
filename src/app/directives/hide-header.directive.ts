import { Directive, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]',
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class HideHeaderDirective {

  @Input('header') header: any
  private lastY: number = 0
  
  constructor(private rederer: Renderer2, private domCtrl: DomController) {}

  ngOnInit(){
    this.header = this.header.el
    this.domCtrl.write(() =>{
      this.rederer.setStyle(this.header, 'transition', 'margin-top  400ms')
    })
  }

  onContentScroll(event: any){
    if(event.detail.scrollTop > this.lastY){
      //Esconder Header
      this.domCtrl.write(() =>{
        this.rederer.setStyle(this.header, 'margin-top', `-${this.header.clientHeight}px`);
      })
    }else{
      //Mostra a Header
      this.domCtrl.write(() =>{
        this.rederer.setStyle(this.header, 'margin-top', '0px');
      })
    }
    this.lastY = event.detail.scrollTop
  }
}