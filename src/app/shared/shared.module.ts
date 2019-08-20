import { NgModule } from '@angular/core';
import { HideHeaderDirective } from '../directives/hide-header.directive';

@NgModule({
  declarations: [
    HideHeaderDirective
  ],
  imports: [
  ],
  exports: [
    HideHeaderDirective
  ]
})
export class SharedModule { }
